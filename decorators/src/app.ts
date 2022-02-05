function Logger(/* 함수형태임을 지정 */) {
  return function (constructor: Function) {
    console.log("Logging...");
    console.log(constructor);
  };
}

@Logger()
class Person {
  name = "steadily";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
