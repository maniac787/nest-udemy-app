# PIPES

Tipar datos es decir validar que el dato enviado sea un entero por ejemplo

En NestJS, la librería url-slug se utiliza para generar slugs a partir de cadenas de texto. Un slug es una versión de
una cadena de texto que es adecuada para ser utilizada en URLs, ya que está formateada de manera legible y amigable para
SEO. Esto implica:

Convertir el texto a minúsculas.

Reemplazar espacios y caracteres especiales con guiones (-).

Eliminar caracteres no deseados o inválidos en URLs.

Casos de uso comunes de url-slug en NestJS:
Generar URLs amigables para SEO:

Cuando tienes títulos de artículos, productos, o páginas que deben ser convertidos en URLs legibles.

Ejemplo: "Cómo aprender NestJS en 2023" se convierte en "como-aprender-nestjs-en-2023".

Crear identificadores únicos para recursos:

Si tienes entidades como posts, productos, o categorías, puedes usar slugs como identificadores únicos en las rutas.

Ejemplo: /posts/como-aprender-nestjs-en-2023.

Normalizar nombres de rutas:

Para asegurarte de que las rutas de tu API o aplicación web sean consistentes y no contengan caracteres extraños.

Evitar problemas con caracteres especiales en URLs:

Los caracteres como espacios, acentos, o símbolos pueden causar problemas en las URLs. url-slug los convierte en
formatos válidos.

```shell
yarn add url-slug
```

```shell
nest g pi courses/pipes/Slug
```