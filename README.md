## Description

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

```bash
## Запуск проекта с ребилдом контейнера в случае некоторых изменений проекта
## Иначе запускать без флага --build
docker compose up --build
```

```bash
## Остановить проект в контейнерах докера с удалением указанных volumes в docker-compose.yml
docker compose down -v
```

```bash
## Перезапустить контейнеры
docker compose restart
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
