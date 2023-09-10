const http = require("http");
const { hostname } = require("os");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  if (request.url === "/favicon.ico") {
    response.status = 204;
    response.statusMessage = "OK";
    response.end();
    return;
  }

  if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  }
  //   console.log(request.url);

  const url = new URL(request.url, "http://127.0.0.1:3003");
  let checkUrl = url.searchParams.get("hello");
  console.log(checkUrl);
  if (checkUrl) {
    response.status = 200;
    response.statusMessage = "OK";
    // console.log("check");
    // console.log(url);
    // console.log(url.searchParams.get("hello"));
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${checkUrl}!`);
    response.end();
    return;
  }

  if (url.searchParams.has("hello")) {
    if (checkUrl === "") {
      response.status = 400;
      response.header = "Content-Type: text/plain";
      response.write(`Enter a name`);
      response.end();
      return;
    }

    if (checkUrl === null) {
      response.status = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain";
      response.write("Hello, world!");
      response.end();
      return;
    }
  } else {
    response.status = 500;
    response.write("");
    response.end();
  }

  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
