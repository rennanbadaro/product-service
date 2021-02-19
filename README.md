# Product Service

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

## Development Notes

After putting some thoughts about the service responsibility and expected capabilities, a hexagonal/ports and adapters _based_ architecture was chosen for the project. The proposed architecture seemed a good fit to isolate the application layers, specially regarding the domain and infrastructure.

With the designed solution, the service should have two main infrastructure components: storage and gRPC. So the idea is to isolate them inside the infra layer and expose an interface (Port) with declarative methods that abstracts the interaction with these components. The domain (use case) can then reach the outside world knowing this interface and having its implementation (Adapter) take care of the hard lifting.

This describes the initial strategy to build the service and based on that the project could grow progressively from the business logic and interface definitions up to its implementations and addition of application components exposing the service as a HTTP server.

The development was broken into tasks registered in a [Trello board](trello-link).

### Important Decisions

- ___Authentication:___ Although the project has no explicit requirement for authentication, it was the approach chosen to define the user ID for the GET /product request. No body or query string should be passed on this request but the products list should be personalized for a given user, so an authentication flow based on JWT was implemented so when the GET request is made a bearer token is passed so the application can define the user through the token instrospection.

- ___Tests:___ The application has very few business rules, it relies heavily on infrastructure. So to make better use of time/energy the focus was kept on guaranteeing the integration with infrastructure components(DB, cache and gRPC). More unit and integration tests are intended to be added in the future.
