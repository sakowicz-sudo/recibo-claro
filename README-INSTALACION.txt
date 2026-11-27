RECIBO CLARO AR — BÚSQUEDA AUTOMÁTICA DE PARITARIAS

ESTE PAQUETE CONTIENE
- index.html: aplicación Recibo Claro AR con el botón para buscar novedades.
- netlify/functions/paritarias-search.js: backend de búsqueda (Brave Search API).
- netlify.toml: configuración Netlify Functions.

QUÉ HACE
- Botón “Buscar actualizaciones ahora”: consulta resultados web recientes y los muestra en la sección Fuentes.
- Comprobación automática: una vez cada 24 horas por navegador (la búsqueda no es silenciosa si falla; el estado lo informa).
- “Abrir búsquedas en navegador”: abre buscadores alternativos si no está configurada la API.
- “Agregar resultados al chat”: agrega los extractos encontrados a la conversación con una advertencia visible de que son resultados, no homologación ni escala verificada.
- No reemplaza automáticamente escalas embebidas ni afirma que un acuerdo está homologado. Los cálculos derivados y datos pendientes deben verificarse.

CONFIGURACIÓN (UNA SOLA VEZ)
1. Conseguí una API key de Brave Search API: https://brave.com/search/api/
2. Subí este proyecto a Netlify desde un repositorio Git (GitHub/GitLab) o Netlify CLI. No sirve publicar únicamente index.html por Drop, porque las Netlify Functions deben desplegarse también.
3. En Netlify, abrí Site configuration / Environment variables (o Build & deploy > Environment variables, según UI).
4. Agregá variable:
   BRAVE_SEARCH_API_KEY = TU_CLAVE_API
5. Redeploy el sitio.
6. En el sitio publicado, probá “Buscar actualizaciones ahora”.

IMPORTANTE
- No pegues la API key dentro del HTML; quedaría visible a cualquiera.
- Si Netlify no despliega Functions, el botón de búsqueda automática no funcionará; la alternativa manual abre búsquedas en Google.
- Las respuestas de búsqueda son snippets de páginas. Abrí la fuente original y verificá fecha, vigencia, homologación, convenio, categoría, zona y jornada antes de usarla para una auditoría de sueldo.
- El chequeo diario se hace al abrir la página en cada navegador (máximo una vez cada 24 horas por ese navegador), no es una tarea cron que corre aunque nadie visite la web.

DISEÑO COMPACTO (VERSIÓN ACTUAL)
- Se corrigió el rediseño que había quedado demasiado grande.
- Tipografía, botones, títulos y espacios más compactos.
- Chat y panel lateral con proporciones equilibradas en escritorio.
- Scroll interno para mensajes; en tablet y móvil los paneles se apilan.
- Se mantiene el contraste, el foco de teclado y el modo oscuro.

ACTUALIZAR EL SITIO AUTOMÁTICAMENTE AL CAMBIAR EL ARCHIVO (NETLIFY + GITHUB)
La forma más sencilla es conectar Netlify con un repositorio Git. Después, cada vez que subas cambios al repositorio, Netlify vuelve a publicar el sitio solo.

1. En GitHub, creá un repositorio (por ejemplo, recibo-claro-ar). Subí TODOS los archivos y carpetas de este paquete; la carpeta netlify/functions debe quedar incluida.
2. En Netlify, abrí tu sitio actual (no crees uno nuevo) y entrá en Site configuration / Build & deploy / Continuous deployment (la ubicación exacta del menú puede variar).
3. Elegí Link repository / Connect to Git provider y vinculá el repositorio de GitHub que contiene estos archivos. Si ya está vinculado, no hace falta repetir este paso.
4. Configuración de build: para este proyecto estático, dejá Build command vacío y Publish directory como raíz del repositorio ("."). El archivo netlify.toml incluido define la configuración de funciones.
5. En Netlify, conservá la variable de entorno BRAVE_SEARCH_API_KEY (si ya la configuraste). No la publiques en GitHub.
6. Guardá la configuración. Netlify hará un deploy inicial y mostrará el estado en Deploys.
7. Para futuras actualizaciones: editá el index.html (o los archivos necesarios), guardá, subí/commiteá los cambios a GitHub (Commit changes / Push). Netlify detectará el cambio y desplegará automáticamente en la MISMA URL cuando termine.

Si el sitio actual ya está conectado a GitHub: descargá este ZIP, reemplazá los archivos del repositorio con los del ZIP, commit + push; Netlify se actualizará solo. No uses Netlify Drop para esta versión porque no publica correctamente las Netlify Functions.
