# Description

This project emulated system with info about virtual machines and private networks.

## How to run system

You need to follow next steps to have system up and running:

- Run command from the root of the project: `docker-compose up -d --build`;
- Setup manually all tables for the Clickhouse to store statistics:
  - Connect to the clickhouse in any preferable way, e.g. via the IDE;
  - Run script `clickhouse/schema.sql` against the ClickHouse server;
  - Call some endpoint via Postman or curl to be sure that everything is working and check ClickHouse.
- Call any endpoint available in the app:
  - `curl --location --request GET 'http://localhost:8080/api/v1/stats'`
  - `curl --location --request GET 'http://localhost:8080/api/v1/attack?vm_id=vm-ab51cba10'`

## How to run load tests

- Install [k6 tool](https://k6.io/docs/getting-started/installation/) locally;
- Go to the `load-testing` directory;
- Run command: `k6 run index.js`;
- After one minute you need to receive a result that system is stable under the load of 500 users.

## Next steps

Further steps that might be taken:
- Introduce distributed cache for the methods (that works with databases) and endpoints in case if it's needed for performance reasons;
- Introduce OpenAPI documentation for the implemented endpoints;
- Add unit and e2e tests for the codebase;
- Introduce granular logging based on the configured log level;
- Add monitoring system to collect logs;
- etc.