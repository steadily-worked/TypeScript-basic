// const names: Array<string> = ["steadily", "worked"]; // string[]
// names[0].split(" "); // 배열이 문자열이라는 것을 알고있으므로 에러가 발생하지 않음

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   // Promise<> 제네릭 내부에 들어갈 값이 이 타입을 결정하는데,
//   setTimeout(() => {
//     resolve("This is done!");
//     resolve(10);
//     // Promise의 데이터 타입이 string이라는 것을 알고있으므로 10이라는, number를 넣으면 오류가 난다.
//     //
//   }, 2000);
// });

// promise.then((data) => {
//   // 여기서는 promise가 string이라는 것을 알고 있으므로 아래 split(' ')이 무리가 없다.
//   data.split(" ");
//   // 만약 Promise<number>이었다면 Property 'split' does not exist on type 'number'.ts(2339) 라는 오류가 떴을 것이다.
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
  // T extends Object: T 타입이 어떤 구조를 갖든, 아무 객체가 되어도 상관없지만 일단 객체여야 한다는 뜻: 타입 제약
  return Object.assign(objA, objB);
  // Object.assign을 하면, 입력된 두 객체의 인터섹션이 반환되는데
  // 이 인터섹션은 새로운 미상의 객체일 뿐이라 추가적인 타입 정보를 TS에 넘겨줄 수 없다.
  // 제네릭 타입을 사용하면 이 두 매개변수가 종종 서로 다른 타입이 될 수 있다고 TS에 넘겨줄 수 있으므로
  // 무작위의 객체 타입으로 작업하는 것이 아닌, 다양한 타입 데이터를 얻고자 한다는 것을 TS가 인식하게 된다.
}

const mergedObj = merge({ name: "steadily", hobbies: ["Coding"] }, { age: 27 });
mergedObj.name;
// 제네릭 선언이 되어있지 않은 상황에서는 접근 불가. Property 'name' does not exist on type 'object'.ts(2339)
// 왜냐면, 객체를 가져오라고 입력한 것이 타입스크립트에서는 객체를 반환하는 것으로 추론하기 때문임
// 원래는 merge<{ name: 'string', hobbies: string[] }, { age: number }>(~~) 이런 식으로 진행되는 게 맞지만
// 제네릭을 사용하면 인수로서 제공하는 값의 타입을 TS가 간단히 추론하여 T와 U에 대해 추론된 타입을 함수 호출을 위해 지정하기 때문에
// 작성해주지 않아도 상관없다.
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 2) {
    descriptionText = "Got " + element.length + " elements";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there"));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
  // No index signature with a parameter of type 'string' was found on type '{}'.ts(7053)
  // 즉, 여기 입력한 객체가 무엇이든 이 키를 가지는지의 여부를 알 수 없기 때문에 에러를 내보낸다.
  // 이 경우에도 제네릭을 사용하면 된다. <T extends object, U>로 제네릭 타입을 지정하게 되면
  // T는 객체라는 제약이 걸리며, U는 T의 키를 목적으로 넣은 것이다. 이를 명백하게 선언하기 위해
  // U extends keyof T로, T의 키라는 제약을 건다.
}

// extractAndConvert({}, "name");
// 여기에서 name에 빨간 줄이 그어지는 이유는, T의 키로 제약을 건 name에 해당하는 U가 없기 때문이다.
// 이때는 비어있는 객체에 값을 넣어주면 된다.
console.log(extractAndConvert({ name: "steadily" }, "name"));
