// interface Human {
//   name: string;
//   age: number;
// }

type Human = {
  name: string;
  age: number;
};

const sang: Human = {
  name: "상민",
  age: 26,
};

// 타입은 인터페이스 뿐만 아니라 다른 곳에다가도 쓸 수 있다.
type MyString = string;
const str: MyString = "hello";
// 타입을 부여할 수 있는 모든 곳에 별칭을 부여할 수 있다.

type Todo = { id: string; title: string; done: boolean };
function getTodo(todo: Todo// 별칭으로 활용) {

}
