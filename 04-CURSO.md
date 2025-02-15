# OPEN API

```shell
yarn add @nestjs/swagger
```

> En el archivo main.ts

```js
const config = new DocumentBuilder()
  .setTitle('Documentation Nest API')
  .setDescription('The Nest API description')
  .setVersion('1.0')
  .addTag('Nest')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);
```