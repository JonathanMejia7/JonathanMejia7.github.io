# jonathanmejia7.github.io

Web de Jonathan Mejía: los prompts y recursos que comparto en mis videos de TikTok, Instagram y LinkedIn.

## Carpetas

| Carpeta | Qué hay |
|---|---|
| `index.html` | Inicio: quién soy, dónde publico y recursos destacados |
| `recursos/` | Lista de recursos. Cada recurso tiene su propia carpeta |
| `recursos/cotizar-con-ia/` | Prompt para comparar cotizaciones con IA |
| `recursos/_plantilla/` | Plantilla para un recurso nuevo (no se publica) |
| `archivo/` | Proyectos anteriores de análisis de datos y gestión de proyectos (2023) |
| `assets/` | Estilos (`css/`), código del botón copiar (`js/`), imágenes (`img/`) e íconos (`icons/`) |

## Agregar un recurso nuevo

1. Copia `recursos/_plantilla/` y ponle un nombre corto en minúsculas y con guiones, por ejemplo `recursos/control-de-inventario/`.
2. Abre su `index.html` y cambia todo lo que dice `CAMBIAR`.
3. Agrega una tarjeta en `recursos/index.html` (y en `index.html` si quieres destacarlo).
4. El enlace para la descripción del video es `https://jonathanmejia7.github.io/recursos/control-de-inventario/`.

## Ver la web en tu computadora

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000.
