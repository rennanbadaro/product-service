## Product Service

Service for listing products.

## Requirements

- NodeJS 12.x __*__
- Docker
- Docker Compose

___*___ _If you're using `nvm`, just run `nvm install` inside the project root to have the proper Node version installed._
## Usage

To run the project on you local machine run with a fresh seeded DB run the following command:

```sh
cp .env.example .env
npm run dev:docker:all
```

In case you just want Docker Compose to start Postgres and Redis so you can run the app using you debugger __*__, for example, you can do the following:

```sh
cp .env.example .env
npm run dev:docker:infra
npm i
npm run migrations:up
npm run dev:seed:run
```

This will only start the DBs containers and run the migrations/seeds. You can then run the way you like.

__*__ _If you're using VS Code, the project includes a `.vscode` folder containing a debugger configuration for running the application (Launch API)_
## Tests

Unit tests:

```sh
npm run test:unit
```

Integration tests:

```sh
npm run test:integration
```

## Proto files

The project already contains generated code. The source for the protobuffer files lives in the repo [proto-graal](https://github.com/rennanbadaro/proto-graal). In case there's an update in proto graal that should have an impact on this project, the code can be regenerated any time by running the shell script `build-protos.sh`. It will clone the latest version of proto-graal and generate the code inside the proper directory.
