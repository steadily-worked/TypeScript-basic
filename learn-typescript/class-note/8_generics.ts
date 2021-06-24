// 타입스크립트를 처음 시작할 때 가장 어려워하는 문법
// function logText(text) {
//   console.log(text);
//   return text;
//   // 콘솔에 찍은 후 반환
// }
// logText(10); // 숫자 10
// logText("hi"); // 문자열 hi
// logText(true); // 진위값 true

// function logText<T>(text: T): T {
//   console.log(text);
//   return text;
// }
// logText<string>("hi");
// // 함수를 호출을 할 때, 파라미터에 대한 타입이 뭔지 같이 지정을 하면서 넘기는 것

// function logText(text: string) {
//   console.log(text);
//   text.split("").reverse().join("");
//   return text;
// }

// function logNumber(num: number) {
//   console.log(num);
//   return num;
// }

// logText("a");
// logText(10);
// 이게 가능한 이유는, 암묵적으로 any 타입으로 지정이 돼 있기 때문이다.
// const num = logNumber(10);

// 이러한 방식의 문제점은, 동일한 코드를 단순히 다른 타입을 받기 위해서 중복 작성한다는 점이다.

// 조금 더 쉽게 접근할 수 있는 방법: 유니온 타입 (함수 하나에 여러가지 타입 받음)
// 이 경우 input의 문제점은 해결이 되지만 text를 치고 프리뷰를 보면 string과 number가 모두
// 타이핑이 되어있다는 점이다.
// function logText(text: string | number) {
//   console.log(text);
//   text;
//   return text;
// }

// // 그래서, 문자열로 지정을 해줬음에도 불구하고 문자열 속성인 split을 사용할 수 없다는 에러가 뜬다.
// // 즉 반환값에 대한 문제점이 생긴 것이다.
// const a = logText("a");
// a.split("");

function logText<T>(text: T): T {
  console.log(text);
  return text;
}

const str = logText<string>("abc");
str.split("");
const login = logText<boolean>(true);
// 타입 정의에 대한 이점을 가져감

// logText("a");
// logText(10);

// 어떤 타입을 받을건지 미리 정의 (제네릭을 쓸 거야)

// 인터페이스에 제네릭 선언하기
// interface Dropdown {
//   value: string;
//   selected: boolean;
// }

const obj: Dropdown<number> = {
  value: 10,
  selected: false,
};

interface Dropdown<T> {
  value: T;
  selected: boolean;
}

// 제네릭의 타입 제한
// function logTextLength<T>(text: T[]): T[] {
//   text.forEach(function (text) {
//     console.log(text);
//   });
//   return text;
// }
// logTextLength(["hi", "abc"]);

// 제네릭 타입 제한 2 - 정의된 타입 이용하기
interface LengthType {
  length: number;
}
function logTextLength<T extends LengthType>(text: T): T {
  text.length;
  return text;
}
logTextLength("abc"); // 가능
logTextLength(10); // '10' 형식의 인수는 'LengthType' 형식의 매개 변수에 할당될 수 없습니다.ts(2345), 즉 숫자에는 length가 제공되지 않으므로 생기는 오류
logTextLength({ length: 10 });

// 제네릭의 타입 제한 3: keyof
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption;
}

// getShoppingItemOption(10);
// getShoppingItemOption<string>("a"); // a 반환
getShoppingItemOption("name"); // OK
