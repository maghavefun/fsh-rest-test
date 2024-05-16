## Installation

```bash
$ npm install
```

## Running the app in local environment

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Runnning the app in docker container

Запуск проекта с ребилдом контейнера в случае добавления новых зависимостей
Иначе запускать без флага --build

```bash
docker compose up --build
```

Остановить проект в контейнерах докера с удалением указанных volumes в docker-compose.yml

```bash
docker compose down -v
```

Перезапустить контейнеры

```bash
docker compose restart
```

## Inspect current db

Открыть текущую базу данных в drizzle studio

```bash
npm run inspect:db
```

Drizzle Studio будет доступно здесь [LINK](https://local.drizzle.studio)

## Migration

Создать миграции на основе описанных схем в modules/drizzle/shema.ts

```bash
npm run migration:generate
```

Применить созданные миграции к текущей базе данных

```bash
npm run migration:migrate
```

## Swagger documentation

Эндпоинты доступны по [ссылке](http://localhost:4002/api-docs)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
