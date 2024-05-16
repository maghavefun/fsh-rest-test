## Клонировать проект

```bash
git clone https://github.com/maghavefun/fsh-rest-test.git
```

## Локальная установка зависимостей(не рекомендуется)

```bash
$ npm install
```

Перед запуском локально или же в докер контейнере, убедитесь что в папке с проектом есть .env файл с переменными окружения
Пример .example.env

## Запуск проекта локально(не рекомендуется)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Запуск проекта в докер контейнере

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

## Открыть базу данных в GUI

Открыть текущую базу данных в drizzle studio

```bash
npm run inspect:db
```

Drizzle Studio будет доступно здесь [LINK](https://local.drizzle.studio)

## Миграции

Создать миграции на основе описанных схем в modules/drizzle/shema.ts

```bash
npm run migration:generate
```

Применить созданные миграции к текущей базе данных

```bash
npm run migration:migrate
```

## Документация swagger

Эндпоинты доступны по [ссылке](http://localhost:4002/api-docs)

## Тесты

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
