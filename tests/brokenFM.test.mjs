import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Reuse the installed TS compiler; no test runner or DOM dependency is needed.
async function importTypeScript(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { BrokenFMController } = await importTypeScript('../src/services/brokenFM.ts');
const { tracks } = await importTypeScript('../src/data/tracks.ts');

function setup(playlist = tracks) {
  const radio = new BrokenFMController(playlist);
  const calls = [];
  let id = '';
  let volume = 45;
  let muted = false;
  const player = {
    cueVideoById(video) { id = video; calls.push(['cue', video]); },
    loadVideoById(video) { id = video; calls.push(['load', video]); },
    playVideo() { calls.push(['play']); },
    pauseVideo() { calls.push(['pause']); },
    setVolume(value) { volume = value; },
    getVolume() { return volume; },
    isMuted() { return muted; },
    unMute() { muted = false; },
    getVideoData() { return { video_id: id }; },
  };
  radio.connect(player);
  return { radio, player, calls, emit: (state) => radio.onStateChange(player, state), mute: () => { muted = true; } };
}

test('the playlist contains exactly the three supplied YouTube IDs', () => {
  assert.deepEqual(tracks.map((track) => track.youtubeVideoId), ['ygTZZpVkmKg', 'qj43MfnUw3o', '7j6C9METNm0']);
  assert.ok(tracks.every((track) => track.title && track.artist && !('src' in track)));
});

test('mount and track navigation never autoplay before play', () => {
  const { radio, calls } = setup();
  radio.next(); radio.previous();
  assert.ok(calls.every(([name]) => name === 'cue'));
  assert.equal(radio.getSnapshot().status, 'ready');
});

test('play and pause buttons follow the real player events', () => {
  const { radio, calls, emit } = setup();
  radio.toggle();
  assert.deepEqual(calls.at(-1), ['play']);
  assert.equal(radio.getSnapshot().status, 'buffering');
  emit(1);
  assert.equal(radio.getSnapshot().status, 'playing');
  radio.toggle();
  assert.deepEqual(calls.at(-1), ['pause']);
  emit(2);
  assert.equal(radio.getSnapshot().status, 'paused');
});

test('native player controls synchronize navigation intent', () => {
  const { radio, emit, calls } = setup();
  emit(1); radio.next();
  assert.deepEqual(calls.at(-1), ['load', tracks[1].youtubeVideoId]);
  emit(2); radio.next();
  assert.deepEqual(calls.at(-1), ['cue', tracks[2].youtubeVideoId]);
});

test('end of track advances and wraps, without duplicate ENDED skipping a track', () => {
  const { radio, emit, calls } = setup();
  for (let i = 0; i < tracks.length; i++) {
    emit(1); emit(0); emit(0);
    const expected = (i + 1) % tracks.length;
    assert.equal(radio.getSnapshot().trackIndex, expected);
    assert.deepEqual(calls.at(-1), ['load', tracks[expected].youtubeVideoId]);
  }
});

test('previous wraps to the last track and rapid navigation uses current index', () => {
  const { radio } = setup();
  radio.previous();
  assert.equal(radio.getSnapshot().trackIndex, 2);
  radio.next(); radio.next(); radio.next(); radio.next();
  assert.equal(radio.getSnapshot().trackIndex, 0);
});

test('blocked playback and embedding errors leave manual recovery available', () => {
  const { radio, emit, calls } = setup();
  radio.toggle(); radio.onBlocked();
  assert.equal(radio.getSnapshot().status, 'blocked');
  radio.toggle();
  assert.deepEqual(calls.at(-1), ['play']);
  emit(1); radio.onError(150);
  assert.equal(radio.getSnapshot().status, 'error');
  assert.match(radio.getSnapshot().message, /cannot play here/);
  radio.next();
  assert.deepEqual(calls.at(-1), ['cue', tracks[1].youtubeVideoId]);
});

test('volume follows native player volume and mute; slider can unmute', () => {
  const { radio, player, mute } = setup();
  radio.setVolume(70);
  assert.equal(player.getVolume(), 70);
  player.setVolume(23); radio.syncVolume();
  assert.equal(radio.getSnapshot().volume, 23);
  mute(); radio.syncVolume();
  assert.equal(radio.getSnapshot().volume, 0);
  radio.setVolume(60);
  assert.equal(player.isMuted(), false);
});

test('disconnect ignores late events and reconnect does not autoplay', () => {
  const { radio, player, emit, calls } = setup();
  emit(1); radio.disconnect(); emit(0);
  assert.equal(radio.getSnapshot().trackIndex, 0);
  radio.connect(player);
  assert.deepEqual(calls.at(-1), ['cue', tracks[0].youtubeVideoId]);
});

test('empty playlist safely disables playback and navigation', () => {
  const { radio, calls } = setup([]);
  radio.toggle(); radio.next(); radio.previous();
  assert.equal(radio.getSnapshot().ready, false);
  assert.deepEqual(calls, []);
});
