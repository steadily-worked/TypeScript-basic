// 타입 추론 기본 1
let a = 10;

function getB(b = 10) {
  let c = "hi";
  // 함수 내부에서 변수를 선언했으므로 c의 type이 string이라는 것을 볼 수 있다.
  return b + c;
  // 숫자 + 문자열 = 반환값 type은 문자열로 설정됨
}
// b라는 값을 넘기지 않으면 기본적으로 10을 가진다는 뜻

10 + "10"; // 1010

// 타입 추론 기본 2
// interface Dropdown<T> {
//   value: T;
//   title: string;
// }

// const shoppingItem: Dropdown<string> = {
//   value: "abc",
//   title: "hello",
// };

// 타입 추론 기본 3
interface Dropdowns<T> {
  value: T;
  title: string;
}
interface DetailedDropdown<K> extends Dropdowns<K> {
  // DetailedDropdown에 들어간 타입 K가 현재 인터페이스에 있는 태그의 type에도 정의가 되고,
  // Dropdown에 있는 value와 title도 사용하게 된다.
  description: string;
  tag: K;
}

let detailedItem: DetailedDropdown<string> = {
  title: "abc",
  description: "ab",
  value: "a",
  tag: "a",
  // value는 여기서 string으로 바로 정의가 됨
};

// Best Common Type:
let arr = [1, 2, true, true, "abc"];
