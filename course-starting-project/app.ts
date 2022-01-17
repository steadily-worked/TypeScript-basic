function add(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult(num: number): void {
  // return type void: return문의 상세가 없을 경우
  // return type undefined: 어딘가에 return이 존재할 때(실제 값을 return하진 않음)
  console.log("Result: " + num);
  return;
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
  // 파라미터 두개를 더하고 그 값에 대해 콜백 함수 실행
}

printResult(add(5, 12));

// undefined도 TypeScript에서는 타입에 해당한다.
// but function은 undefined를 리턴할 수 없으므로 에러가 발생한다.
let combineValues: /*Function*/ (a: number, b: number) => number;
// 결합한 값이 숫자 타입의 매개변수 두개를 사용하고 숫자를 반환하는 함수를 허용한다는 뜻

combineValues = add;
// combineValues = printResult;
// 변수가 함수를 가리키게 할 수 있음

console.log(combineValues(8, 8));
// 설정된 함수와 맞지 않는 파라미터를 넣으면 undefined를 리턴한다.

addAndHandle(10, 20, (result) => {
  console.log(result);
});
