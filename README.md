# AsyncAPI Playground Initialization Problem MWE

## The Problem™

When including the AsyncAPI Playground in a React application, depending on viewport size, zoom level etc, the schema editor will sometimes appear to be empty and/or/because its content will be sitting way over on the right-hand side, taking up only a small fraction of its width.

When that happens, going to the dummy page via the navigation drawer and then back to the playground fixes it.
So does switching tabs back and forth in the editor itself.

## Reproducing the Problem™

### webpack dev server

The Problem™ is easily reproduced with a webpack dev server:

```shell
npm ci
npm start
```

Typing `http://localhost:8080/playground` in the address bar and pressing Enter or hitting F5 while on that page triggers the Problem™ almost every time in both Firefox and Chrome.

### Docker

With nginx running in Docker, however, it's a different story:

```shell
docker build -t asyncapi . && docker run -p 8080:80 asyncapi
```

With this setup, the Problem™ only occurs occasionally when pressing Enter in the address bar or reloading with F5, but almost every time when reloading with Ctrl + F5 (i.e. without cache).
