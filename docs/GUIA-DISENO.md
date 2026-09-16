# Guía para personalizar Broken City

## Dónde cambiar cada cosa

| Elemento | Archivo | Qué modificar |
| --- | --- | --- |
| Edificios | `src/game/worldDesign.ts` | Lista `BUILDINGS`: posición, ancho, alto, estilo y neón |
| Cielo | `src/game/scenes/CrossroadsScene.ts` | `drawSky()`: colores, estrellas, luna y nubes |
| Detalles de fachadas | Mismo archivo | `drawCity()`: ventanas, terrazas, antenas y locales |
| Carretera | Mismo archivo | `drawRoads()`: polígonos, bordillos, líneas, reflejos y farolas |
| Cuadros de letreros | Mismo archivo | `drawSigns()`: posición y tamaño de cada `pixelSign()` |
| Interior del coche | Mismo archivo | `drawCarInterior()` |
| Lluvia | Mismo archivo | `drawRain()`: cantidad y opacidad |
| Letras de los letreros | `src/components/GameCanvas.tsx` | Texto de los elementos `world-label` |
| Tamaños de interfaz y letras | `src/styles.css` | Selectores explicados más abajo |
| Texto de bienvenida | `src/components/StartScreen.tsx` | Título, subtítulo y botón |

## Coordenadas y medidas

La escena usa **640 × 360 unidades**. La esquina superior izquierda es `(0, 0)`: `x` aumenta hacia la derecha y `y` hacia abajo. Se escala conservando la proporción 16:9; en pantallas con otra proporción quedan bandas oscuras para evitar deformaciones.

En Phaser, `fillRect(x, y, ancho, alto)` dibuja un rectángulo. Por ejemplo, `fillRect(100, 80, 50, 90)` empieza a 100 unidades de la izquierda y 80 de arriba, mide 50 de ancho y 90 de alto.

Los colores de Phaser usan `0xff2bd6`; el mismo color en CSS se escribe `#ff2bd6`. El segundo argumento de `fillStyle(color, opacidad)` va de 0 (transparente) a 1 (opaco).

## Edificios: tu primer cambio

En `src/game/worldDesign.ts`, modifica una entrada:

```ts
{ x: 49, width: 65, height: 132, style: 'steps', neon: 0xff2bd6 },
```

- `x`: posición horizontal.
- `width`: ancho. Prueba 75 para ensanchar el edificio.
- `height`: altura. Prueba 145 para hacerlo más alto; la base permanece en `y = 194`.
- `style`: `steps` (azotea escalonada), `antenna`, `terraces` o `glass`.
- `neon`: color de iluminación.

Puedes duplicar entradas para añadir edificios; los últimos se dibujan sobre los anteriores. Deja espacio para las azoteas y antenas. Los estilos actuales se ven mejor con anchos de al menos 39 unidades; `glass` admite torres más estrechas.

Las ventanas están en los bucles `row` y `col` de `drawCity()`. `wy += 10` controla la separación vertical; `wx += 8`, la horizontal. El `fillRect` dentro del bucle controla el tamaño de cada ventana.

## Cuadros y tipografía

En `src/styles.css`:

- `.car-dashboard`: `height`, `left`, `right` y `grid-template-columns` ajustan el tamaño del tablero y el espacio de instrumentos, estéreo y lado del pasajero.
- `.center-console` y `.broken-fm`: `padding`, bordes y colores cambian la carcasa del estéreo.
- `.track-screen`: espacio y separación de la pantalla de la canción.
- `.start-screen`: `gap` y `padding` controlan la distribución del menú.
- `.start-screen h1`: `font-size: clamp(mínimo, adaptable, máximo)` controla el título.
- `.start-button`: `padding` cambia el tamaño del botón; `font-size` cambia sus letras.
- `.world-label`: tamaño de las letras sobre la escena. `1cqw` equivale al 1% del ancho de `.world-frame`.
- `@media (max-width: 680px)`: ajustes específicos para pantallas pequeñas.

Los letreros tienen **fondo en Phaser y texto HTML** para mantener las letras nítidas. Si cambias `pixelSign(x, y, ancho, alto, color)` en `drawSigns()`, actualiza también `.sign-left`, `.sign-center` o `.sign-right`:

```text
left   = x / 640 × 100%
top    = y / 360 × 100%
width  = ancho / 640 × 100%
height = alto / 360 × 100%
```

No fuerces ancho y alto del canvas al 100% por separado: deforma la escena. El pixelado se aplica solo al dibujo, no a la interfaz. El CRT queda debajo de la interfaz y ya no hay desenfoque del fondo del menú.

## Cambiar el cielo y la carretera

En `drawSky()`, los colores `0x050817` y `0x382044` son el inicio y el final del cielo. El bucle de 65 iteraciones dibuja las estrellas. Los círculos centrados cerca de `(397, 43)` forman la luna; los arreglos `[x, y, ancho]` definen las nubes.

En `drawRoads()`, cada `fillPoints()` contiene las esquinas de una rama de la carretera. El punto de fuga está cerca de `(320, 194)`. Mantén alineados esos polígonos con los bordillos. La lista `[y, length, width]` controla cada marca central. El bucle de 65 iteraciones controla los reflejos y su transparencia.

## Incorporar tus propios diseños PNG

1. Guarda tu dibujo en `public/assets/sprites/`, por ejemplo `mi-edificio.png`, con fondo transparente.
2. Añade este método a la clase `CrossroadsScene`, antes de `create()`:

```ts
preload() {
  this.load.image('mi-edificio', '/assets/sprites/mi-edificio.png');
}
```

3. Dentro de `create()`, después de `this.drawCity()` y antes de `this.drawRoads()`, coloca:

```ts
this.add.image(120, 194, 'mi-edificio')
  .setOrigin(0.5, 1) // centro horizontal y base del dibujo
  .setDisplaySize(64, 128);
```

Este ejemplo supone un PNG con proporción 1:2. Usa medidas que conserven la proporción de tu archivo; si ya lo dibujaste al tamaño deseado, omite `setDisplaySize()`. Para pixel art, dibuja al tamaño de la escena o usa escalas enteras. Quita la entrada correspondiente de `BUILDINGS` si quieres sustituir un edificio existente.

Para reemplazar todo el fondo, dibuja un PNG de 640 × 360, cárgalo igual y usa `this.add.image(0, 0, 'mi-fondo').setOrigin(0)`. Sustituye las llamadas a las capas incluidas en tu imagen: `drawSky()`, `drawCity()` y/o `drawRoads()`. El orden de creación importa: lo último aparece encima. Si tu fondo incluye letreros o tablero, elimina también los dibujos y textos HTML duplicados.

Las rutas públicas empiezan en `/assets/`, no en `/public/assets/`. Para una fuente propia, guárdala en `public/assets/fonts/`, declárala con `@font-face` en CSS y cambia `font-family`.

## Ver los cambios

Ejecuta `npm run dev`, guarda el archivo y revisa el navegador. Después de modificar la escena de Phaser, recarga la página si conserva el dibujo anterior. Ejecuta `npm run build` para comprobar TypeScript y generar la versión de producción.

## Tablero y estéreo del coche

`src/components/CarDashboard.tsx` contiene el velocímetro, tacómetro, combustible y avisos. Por ahora son decorativos: velocidad cero, marcha P y estacionamiento. Cuando exista conducción, estos valores deberán conectarse al estado del vehículo.

`src/components/BrokenFM.tsx` contiene la interfaz del estéreo. `YouTubeScreen.tsx` contiene el marco del video; `useBrokenFM.ts` conecta React con la API oficial. La reproducción y el avance circular de canciones están en `src/services/brokenFM.ts`. Edita `src/data/tracks.ts`: cada entrada tiene `title`, `artist` y `youtubeVideoId` (el valor después de `v=` en la URL). No necesitas MP3 ni clave de API. `NO SIGNAL` indica un error de conexión o un video no disponible; los detalles aparecen debajo del estéreo.

En `src/styles.css`, `.instrument-binnacle` cambia la carcasa de los instrumentos; `.speed-value`, las cifras; `.steering-wheel` y `.wheel-hub`, el volante; `.console-top` y `.air-vent`, las rejillas. El tablero está dentro de `.world-frame`, por lo que acompaña el tamaño de la ciudad. En móvil vertical se extiende debajo del parabrisas para mantener utilizables los controles.

En `drawCarInterior()` de `CrossroadsScene.ts` están el retrovisor, los pilares del parabrisas, las costuras y los limpiaparabrisas. El borde superior del tablero comienza en `y = 269`. Para sustituirlo por arte propio, dibuja esa capa con transparencia y conserva los controles HTML encima.

La pantalla `.youtube-screen` está a la derecha de `.fm-information`. Conserva al menos 200 × 200 píxeles visibles y no tapes los controles o logotipos de YouTube. `.broken-fm` usa dos columnas; en móvil conserva el video a la derecha y sitúa los botones y volumen debajo. No hay autoplay al entrar. Al terminar una canción se reproduce la siguiente; después de la última vuelve a la primera.

## Pantalla de bienvenida

La presentación está en `src/components/StartScreen.tsx`. `src/App.tsx` muestra primero esa pantalla y monta la ciudad al pulsar START ENGINE. En CSS, `.welcome-panel` controla el marco, `.welcome-content` los espacios, `.start-screen h1` el título y `.welcome-routes` los destinos al pie. La presentación tiene desplazamiento propio en pantallas bajas y nunca se superpone con la ciudad.
