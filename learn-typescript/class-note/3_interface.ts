interface User {
  age: number;
  name: string;
}

// 변수에 인터페이스 활용
const sangmin: User = {
  age: 26,
  name: "상민",
};
// sangmin이라는 변수는 무조건, 상호간 약속한 규칙을 따라서 age와 name에 대한 정의를 해 줘야 한다.

// 함수에 인터페이스 활용
function getUser(user: User) {
  // 이 함수는 항상 특정 형식을 준수하는 데이터만 받겠다고 정의하는 것.
  console.log(user);
}
const steadily = {
  name: "steadily",
  age: 26,
};
getUser(steadily);

// 함수의 구조(스펙)에 인터페이스를 활용
interface SumFunction {
  (a: number, b: number): number;
  // 인터페이스에서 각 파라미터의 타입과 반환 타입까지 정의할 수 있다.
}

let sum: SumFunction;
sum = function (a: number, b: number): number {
  return a + b;
};

// 인덱싱
interface StringArray {
  // 보통은 속성과 그에 따른 타입을 넣음
  [index: number]: string;
  // 인덱스는 숫자이고, 그 인덱스에 들어가는 값은 string으로 정의한 것.
  // 예를 들면 .. let arr = ['a', 'b', 'c'] 정도가 될 것이다.
}

let arr: StringArray = ["a", "b", "c"];
arr[0]; // 'a'
arr[0] = 10; // 오류. '10' 형식은 'string'에 할당할 수 없음.

// 딕셔너리 패턴
interface StringRegexDictionary {
  [key: string]: RegExp; // reg expression: 정규 표현식 생성자
}

const obj: StringRegexDictionary = {
  cssFile: /\.css$/,
  jsFile: /\.js$/,
};
obj["cssFile"] = "a";

Object.keys(obj).forEach(function (value) {});

// 인터페이스 확장(상속): 인터페이스를 상속받아서 기존에 있었던 것보다 확장하는 것
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  //   name: string;
  //   age: number;
  language: string;
}

const sangminpark: Developer = {
  name: "sangmin",
  age: 26,
  language: "TypeScript",
};
