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

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
    // 찾지 못하면 -1을 제거하기 때문에 마지막 요소가 제거됨
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("steadily");
textStorage.addItem("worked");
textStorage.removeItem("steadily");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
// const objStorage = new DataStorage<object>();
// const maxObj = { name: "steadily" };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "worked" });
// objStorage.removeItem(maxObj);
// // 객체의 경우는 삭제가 제대로 되지 않는데, 이는 객체를 새로 정의함으로써 메모리를 개별적으로 차지하기 때문이다.
// // 이러한 문제를 해결하려면, 애초에 변수에 객체를 지정해두고 그 변수를 메소드의 파라미터로 집어넣는 방식을 사용하면 된다.
// // 근데 이렇게 하는 건 사실 비효율적이라, 애초에 객체에만 해당하는 DataStorage를 만드는 것이 더 낫다.
// console.log(objStorage.getItems());

// 제네릭 클래스에서도 타입의 제약을 걸 수 있는데, 이를 통해 훨씬 유연하고 안전하게 작업할 수 있다.

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // let courseGoal: CourseGoal = {};
  // 이 경우 courseGoal이 비어있는 객체이므로 Type '{}' is missing the following properties from type 'CourseGoal': title, description, completeUntilts(2739)
  // 와 같은 에러가 나타난다.
  let courseGoal: Partial<CourseGoal> = {};
  // Partial 타입은 모든 속성이 선택적인 객체 타입으로 바꾼다.
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  // return courseGoal
  // but 이 경우라면 return courseGoal은 불가능한데, 그 이유는 CourseGoal의 부분 타입일 뿐 CourseGoal 타입이 아니기 때문이다.
  return courseGoal as CourseGoal; // courseGoal을 CourseGoal로 형 변환하여 해결할 수 있다.
}

const names: Readonly<string[]> = ["steadily", "worked"];
// Readonly는 속성 변경 및 객체에 새 속성 추가를 할 수 없게 함
names.push("coding"); // Property 'push' does not exist on type 'readonly string[]'.ts(2339)
