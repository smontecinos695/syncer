## Description

Synchronizer pokemon API app

## Requirements
This project uses Docker version 20.10.16 and node v14.17.0.

## Installation

```bash
$ npm install
```

## Running the app

Rename .env.example to .env and the run the following commands

```bash
$ docker compose up # start the dynamodb local environment
$ npm run migration create_pokemons_table # create the table

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
