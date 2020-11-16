const sayHelloWorld = require("../src/index");

test("sayHelloWorld", () => {
  expect(sayHelloWorld()).toEqual("Hello World!");
})
