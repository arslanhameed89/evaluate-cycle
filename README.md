
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript NodeJS.


## Pre-requisites
- NodeJS (`>=14.1.2`)
--- 


## Prepare ENV
* Copy `.env.example` to `.env`

**SET APP LEVEL PARAMS**
```shell script
APP_NAME=EVALUATION-CYCLE
HOST=localhost
PORT=3900
NODE_ENV=development
SERVER=http://localhost:3900
API_GLOBAL_PREFIX=api/v1
```


**KAFKA BROKER**
```shell script
KAFKA_QUEUE_URL: '127.0.0.1:9092'
```

**SWAGGER LINK**

```shell script
http://localhost:3900/documentation/
```

## Dependency Installation
```bash
$ npm install
```

## Running the app in development
---
```bash
# development 
$ npm run start:dev
```

## Running the app in Production + Staging
---
#### Build
```bash
# It will create build inside dist
$ npm run build 
```

#### Start
```bash
# Make sure PM2 package is installed
pm2 start npm --name "evaluation-cycle" -- run start:prod
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
