// 함수의 파라미터에 타입을 정의하는 방식
function sum(a: number, b: number) {
  return a + b;
}
sum(10, 20);

// 함수의 반환값에 타입을 정의하는 방식
function sum2(): number {
  return 10;
}

// 함수에 타입을 정의하는 방식
function sum3(a: number, b: number): number {
  return a + b;
}
sum3(10, 20, 30, 40); // 2개가 필요한데 4개를 가져왔다고 에러를 띄움. 파라미터를 제한함
// 그냥 정한 개수만큼 쓰지 않으면 오류를 가져옴.

// 함수의 옵셔널 파라미터
// function log(a: string, b: string) {

// }
// log('hello world');
// log('hello ts', new Person());
// 이런 방식으로 파라미터로 지정한 것 중 일부만 쓰고 싶을 경우..

function log(a: string, b?: string) {
  console.log(a, b);
}
log("hello world");
log("hello ts", "abc");

// 이렇게, 파라미터 뒤에 ?를 넣어주면 된다. 이것을 Optional Parameter라고 한다.
