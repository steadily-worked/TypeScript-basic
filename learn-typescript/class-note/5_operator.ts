// function logMessage(value: any) {
//   console.log(value);
// }
// logMessage("hello");
// logMessage(100); // '100' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)
// logMessage(false);

const stea: string | number | boolean;
function logMessage(value: string | number) {
  //   console.log(value);
  if (typeof value == "number") {
    value.toLocaleString();
  }
  if (typeof value == "string") {
    value.toString();
  }
}
logMessage("hello");
logMessage(100);

interface Engineer {
  name: string;
  skill: string;
}

interface Villain {
  name: string;
  age: number;
}
// function askSomeone(someone: Engineer | Villain) {}

// askSomeone({ name: "Developer", skill: "TypeScript" });
// askSomeone({ name: "engineer", age: 26 });

function askSomeone(someone: Engineer & Villain) {
  someone.name;
  someone.skill;
  someone.age;
}

askSomeone({ name: "Developer", skill: "TypeScript" });

// const stead2: string & number & boolean;
// // 세 가지 타입을 모두 만족하는 타입을 인터섹션 타입이라고 한다.
