# Instrucciones operativas de Vivomixx neo Venezuela

Estas instrucciones son obligatorias para cualquier tarea que publique contenido, cambios web o piezas sociales en este repositorio.

## Autenticación de GitHub

- El token fino exclusivo está en `/Users/GabrielRodriguez/.config/vivomixx/github-token`.
- Antes de una operación autenticada, comprobar que el archivo existe, no está vacío y tiene permisos `600`.
- Cargar su contenido en `GH_TOKEN` sin imprimirlo y eliminar la variable del entorno al terminar.
- No copiar el token a URLs, commits, logs, mensajes ni archivos del repositorio.
- Para Git HTTPS, usar el credential helper local del repositorio que entrega `x-access-token` y la referencia literal a `GH_TOKEN`; nunca guardar el valor del token en la configuración.
- No modificar secretos de GitHub Actions.

## Diagnóstico correcto: token frente a red

- No concluir que el token es inválido usando solamente `gh auth status`. Ese comando puede presentar un fallo de conectividad como un problema de autenticación.
- Un error como `Could not resolve host`, `error connecting to api.github.com`, DNS, timeout o conexión rechazada es un bloqueo de red o sandbox, no evidencia de que el token haya expirado.
- Considerar el token rechazado únicamente cuando una solicitud que sí logró llegar a GitHub devuelve inequívocamente `401 Bad credentials` u otra respuesta explícita de credenciales inválidas.
- No pedir al usuario que regenere o pegue el token por un error de DNS, conectividad o permisos de la integración.

## Flujo de publicación y recuperación

1. Sincronizar `main`, conservar cambios locales ajenos y crear una rama `agent/` descriptiva.
2. Implementar, validar y revisar el diff antes de autenticar o publicar.
3. Intentar `git push` con `GH_TOKEN` y el helper seguro.
4. Si el terminal no tiene red pero el trabajo está terminado:
   - no repetir diagnósticos del token;
   - no probar indefinidamente el mismo comando;
   - solicitar al usuario un único `git push` desde su Terminal normal, con un comando que cargue y elimine `GH_TOKEN` sin mostrarlo;
   - después del push, usar la sesión autenticada de GitHub en el navegador para crear la PR, revisar archivos, fusionar mediante squash, eliminar la rama remota y supervisar Actions.
5. Si la integración de GitHub devuelve `403 Resource not accessible by integration`, no asumir que el repositorio o el token están mal. Esa integración carece de escritura; usar la sesión autenticada del navegador.
6. No declarar éxito hasta que GitHub Pages termine correctamente y producción haya sido verificada.

## Verificación mínima de producción

- La URL nueva responde y muestra el título, canonical e imagen esperados.
- `/guia/` enlaza el contenido y conserva el conteo correcto.
- La home muestra exactamente los tres artículos más recientes.
- `sitemap.xml` incluye la URL publicada.
- Las imágenes cargan, los enlaces internos resuelven y no hay desbordamiento horizontal.
- La PR está fusionada, el diff contiene únicamente cambios previstos y la rama remota fue eliminada.

## Comunicación

- Evitar ciclos de mensajes sobre el mismo bloqueo.
- Comunicar únicamente la acción concreta que debe realizar el usuario cuando el sandbox impida el push.
- No afirmar que algo está publicado antes de verificar producción.
