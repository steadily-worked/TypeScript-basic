let userInput: unknown;
// unknown type: 사용자가 어떤 값을 입력할지 모르므로 unknown -> 아무 값이나 들어가도 컴파일 에러가 생기지 않음
let userName: string;

userInput = 5;
userInput = "steadily";
if (typeof userInput === "string") {
  userName = userInput;
}
// userName = userInput;
// unknown 타입은 string 타입에 할당할 수 없음. 왜냐면 unknown이 string이 아닐 수도 있으니까.
// any랑 비슷하지만, any는 타입 검사를 하지 않으므로 이 경우 문제가 생기지 않음
// userInput의 타입을 string으로 한정짓는다면() 가능
// 추가로 type 확인이 필요한 부분이 unknown 값과 특정 고정값이 제대로 작용하는지 확인할 수 있기 때문에 unknown이 any보다 낫다.

function generateError(message: string, code: number) {
  throw { message: message, errorCode: code };
}

const result = generateError("An error occurred!", 500);
console.log(result);
