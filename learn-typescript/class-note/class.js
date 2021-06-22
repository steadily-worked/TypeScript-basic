function Person(name, age) {
  this.name = name;
  this.age = age;
}
const capt = new Person("캡틴", 100);

class Person {
  // 클래스 로직
  constructor(name, age) {
    console.log("생성 되었음.");
    this.name = name;
    this.age = age;
  }
}

const sangmin = new Person("상민", 26); // 생성 되었음.
console.log(sangmin);
