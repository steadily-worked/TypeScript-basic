// JS 문자열 선언 방식
// const str = 'hello';

// TS 문자열
let str: string = "hello";

// TS 숫자
let num: number = 10;

// TS 배열
let arr: Array<number> = [1, 2, 3];
let heroes: Array<string> = ["Capt", "Thor", "Hulk"];
let items: number[] = [1, 2, 3];
// arr과 items는 동일함. 표현 방식만 다름

// TS 튜플: 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식
let address: [string, number] = ["gangnam", 10];
// 배열의 특정 순서의 타입까지 정의할 수 있는 것을 튜플이라고 함

// TS 객체
let obj: object = {};
// let person: object = {
//   name: "capt",
//   age: 100,
// };
// 속성이 name과 age가 들어가는 경우
let person: { name: string; age: number } = {
  name: "sangminpark",
  age: 26,
};

// TS 진위값
let show: boolean = true;
