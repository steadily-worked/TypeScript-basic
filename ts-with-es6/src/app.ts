// const userName = "steadily";
// // userName = "steady";
// let age = 29;

// age = 30;

function add(a: number, b: number) {
  let result;
  result = a + b;
  return result;
}

// if (age > 20) {
//   let isOld = true;
// }
// console.log(isOld);
// console.log(result);

const add2 = (a: number, b: number = 1) => a + b;
// 표현식이 하나밖에 없다면 중괄호 생략 가능. return문이 암묵적으로 존재함

const printOutput: (a: number | string) => void = (output) =>
  console.log(output);
// 타입스크립트에서는 파라미터의 괄호 생략이 불가능함.
// 하지만 함수에서 타입 셋업이 되어있고, 파라미터에 그 값을 집어넣는 경우라면 타입을 할당하지 않아도 에러가 안 남. but 이 경우 타입 할당에 굳이 직접 추가해야 하므로 많이 저장하진 않음

const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", (e) => {
    console.log(e);
  });
}

printOutput(add2(5));

// spread
const hobbies = ["Sports", "Cooking", "Coding"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const Person = {
  firstName: "steadily",
  age: 27,
};

const copiedPerson = { ...Person };
const copiedPerson2 = Person;

// 입력하는 값만큼 더하기. rest
const add3 = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};
const addedNumbers = add3(5, 10, 2, 3.7);
console.log(addedNumbers);

// 객체 비구조화 할당
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
// hobbies 배열의 첫번째 값은 hobby1, 두번째 값은 hobby2, 그 외에 나머지 값들은 remainingHobbies라는 배열에 저장됨

console.log(hobbies, hobby1, hobby2, remainingHobbies);
// 이 때 원래 배열인 hobbies의 값은 변하지 않는다. 즉 새로운 상수 및 변수에 복사된 것임

const { firstName: userName, age } = Person;
// Person 객체의 firstName과 age를 가져왔는데, 여기서 firstName은 userName이라는 변수에 담아서 가져왔다.

console.log(userName, age, Person);
// console.log(firstName); // Cannot find name 'firstName'.ts(2304)
// 그래서 console.log 내부에서 firstName은 인식하지 못한다. 다른 값으로 덮어썼기 때문
