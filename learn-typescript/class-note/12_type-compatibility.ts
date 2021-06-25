// 인터페이스
// interface Developerss {
//   name: string;
//   skill: string;
// }
class Developerss {
  name: string;
  skill: string;
}

// interface Personss {
//   name: string;
//   // skill: string;
// }
class Personss {
  name: string;
}

let developer: Developerss;
let person: Personss;

// 클래스
developer = new Person();
person = new Developerss();
// developer = person;
// developer = person; // Property 'skill' is missing in type 'Personss' but required in type 'Developerss'.ts(2741)

// 오른쪽에 있는 타입이 왼쪽으로 할당이 될 수가 없다. 왼쪽에 있는 타입(객체)이 더 믄 관계를 갖고 있기 때문에.
// 기본적으로 타입 호환이라는 것은 오른쪽에 있는 타입이 더 많은 속성을 갖고 있거나 더 클 때 호환이 된다.

// 함수
let add = function (a: number) {
  return a + 1;
};
let sum = function (a: number, b: number) {
  return a + b;
};
sum = add;
add = sum; // sum에는 b가 있으므로 안됨

// 제네릭
interface Empty<T> {}

let empty1: Empty<string>;
let empty2: Empty<number>;
empty1 = empty2;
empty2 = empty1;

interface NotEmpty<T> {
  data: T;
}

let notempty1: NotEmpty<string>;
let notempty2: NotEmpty<number>;
notempty1 = notempty2;
notempty2 = notempty1;
