# AsyncAPI Playground Initialization Problem MWE

## Getting started

### npm

For local development, run

```shell
npm ci
npm start
```

### Docker

For local development using Docker, run

```shell
docker build -t asyncapi . && docker run -p 8080:80 asyncapi
```

and visit <http://localhost:8080> in your browser.

## The problem

Visit <http://localhost:8080/playground>.
Depending on viewport size, zoom level etc, the schema editor should appear to be empty or its content should be sitting way over on the right-hand side, taking up only a small fraction of its width.

Go to the dummy page via the navigation drawer and then back to the playground.
It should now look as expected.
Reload the page by hitting F5; the problem should now appear again.
