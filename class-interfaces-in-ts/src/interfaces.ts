// type AddFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};
// 여기서 n1: string으로 바꾸면 Type '(n1: string, n2: number) => string' is not assignable to type 'AddFn'.
// 이라는 에러가 뜬다. AddFn 인터페이스가 함수로서의 기능을 하며, 파라미터의 타입을 지정해줬기 때문에 맞춰줘야 한다.

interface Named {
  readonly name: string;
  outputName?: string;
}
/* type Greetable = */ interface Greetable
  extends Named /*, AnotherInterface */ {
  // Named 인터페이스의 속성을 갖기 위해서는 클래스에서처럼 extends로 상속해주면 된다.
  // 여기서 클래스와는 다르게 인터페이스는 여러 개의 다른 인터페이스를 상속받을 수 있다.
  age: number;

  greet(phrase: string): void;
}
// interface Greetable을 type Greetable = 로 바꿔도 에러 없이 컴파일이 잘 되는데,
// 인터페이스는 객체의 구조를 설명하기 위해서만 사용한다.
// 즉 Greetable으로 취급되어야 하는 모든 객체는 name, age, greet 메소드를 지닌 객체여야 한다는 것.

// implements interface를 통해 이 클래스가 interface의 규칙을 준수해야 한다는 것을 알려줌
// 이 과정에서, 인터페이스는 주로 구체적인 구현보다는 서로 다른 클래스 간의 기능을 공유하기 위해 사용된다는 것을 알 수 있다.
class Person implements Greetable {
  name: string;
  age = 27;
  outputName?: string;
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable;
// user1을 Greetable 인터페이스로 저장한 이상 무조건 greet 메소드와 name 문자열이 필요하다.
user1 = new Person("steadily");
// user1.name = "worked";
// Cannot assign to 'name' because it is a read-only property.ts(2540)
// Person이 implements한 Greetable 메소드에서 name을 readonly로 설정했기 때문에 불가능
user1.greet("Hi there - I am");

// user1 = {
//   name: "steadily",
//   age: 27,
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };
