# Buscador de Ubicaciones · Rick and Morty

Aplicación web de una sola página que permite buscar las ubicaciones de la serie Rick and Morty (planetas, estaciones espaciales, dimensiones) consumiendo la API pública [The Rick and Morty API](https://rickandmortyapi.com/documentation). Resuelve la necesidad de consultar rápidamente el tipo, la dimensión y la cantidad de residentes de cada lugar sin navegar la documentación de la API.

**Autor:** Enzo Rojas · Fundamentos de Desarrollo Web · UCSA
**Variante del TP:** B · Ubicaciones (endpoint `https://rickandmortyapi.com/api/location`)

## Sitios publicados
- GitHub Pages: https://enzorojasgc-debug.github.io/tp-rojas-enzo/
- Vercel: (pendiente de publicación)

## Captura
![Captura de la aplicación buscando "earth" con el tipo "Planet"](img/captura.png)

## Funcionalidades
- Búsqueda de ubicaciones por **nombre** y filtro por **tipo** (por ejemplo, `Planet`); ambos criterios se envían juntos en la misma petición (`?name=...&type=...`).
- Aviso cuando se intenta buscar sin escribir ningún criterio.
- Resultados en tarjetas con **nombre**, **tipo**, **dimensión** y **cantidad de residentes**; los datos vacíos o `unknown` se muestran como «Desconocido».
- Estado «Buscando…» con el botón desactivado mientras se espera la respuesta.
- Mensaje de «sin resultados» cuando la API responde 404 y mensaje de error si falla la conexión.
- La última búsqueda se guarda en `localStorage` y se repite automáticamente al recargar la página.
- Diseño responsive: se ve correctamente desde 375 px de ancho sin desplazamiento horizontal.
- Número de versión visible en el pie de la página.

## Tecnologías
- HTML5 semántico (formulario con `<label>`, `<article>`, `<dl>`)
- CSS3 (variables CSS, CSS Grid con `repeat(auto-fill, minmax(...))`, media queries)
- JavaScript (ES6+): funciones flecha, `const`/`let`, plantillas de texto
- Fetch API con `async/await` y `try/catch/finally`
- `URL` y `searchParams` para armar la petición
- `localStorage`
- [API de Rick and Morty](https://rickandmortyapi.com/)

## Estructura del proyecto
```
tp-rojas-enzo/
├── index.html        → estructura de la página: encabezado, formulario, resultados y pie con la versión
├── README.md         → documentación técnica del proyecto
├── .gitignore        → archivos que Git no debe versionar (sistema, editor, dependencias, .env)
├── css/
│   └── estilos.css   → estilos, variables de color y espaciado, grilla de tarjetas y diseño responsive
├── js/
│   └── app.js        → lógica: arma la URL, hace la petición, crea las tarjetas y maneja localStorage
└── img/
    └── captura.png   → captura de la aplicación usada en este README
```

## Cómo ejecutarlo localmente
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/enzorojasgc-debug/tp-rojas-enzo.git
   ```
2. Abrir `index.html` en el navegador (o con la extensión Live Server de VS Code).

No necesita instalar dependencias ni servidor propio: la aplicación consume la API pública directamente desde el navegador (se requiere conexión a internet).
