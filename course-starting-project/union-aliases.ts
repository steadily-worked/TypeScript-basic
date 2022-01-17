type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

type User = { name: string } | string;
// 유니온 타입은 'name' 속성을 포함하는 객체 또는 문자열을 허용한다.
const user1: User = { name: "steadily" };

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
    // 각자가 number로 바뀐 후이 두개를 더한 number
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  //   if (resultConversion === "as-number") {
  //     return +result;
  //   } else {
  //     return result.toString();
  //   }
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
