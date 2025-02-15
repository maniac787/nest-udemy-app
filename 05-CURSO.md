# VARIABLES DE ENTORNO

```shell
yarn add @nestjs/config
```

> Importar el módulo en app.module.ts

```js

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    VideosModule,
    AwardsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

```

> Configuraciones adicionales

```js
//Para que el validador sea global
app.useGlobalPipes(new ValidationPipe());

// Habilitar cors
app.enableCors();

// Limitar el tamanio del payload
app.use(json({ limit: '5mb' }));

// Versionamiento del API
app.enableVersioning({
  defaultVersion: '1',
  type: VersioningType.URI,
});
```

> Configuracion para el health check

```shell
yarn add @nestjs/serve-static
```

> Agregar en ap app.module.ts

```js
ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'client'),
});
```