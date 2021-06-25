interface Developer {
  name: string;
  skill: string;
}
interface Person {
  name: string;
  age: number;
}

function introduce(): Developer | Person {
  return { name: "sangmin", age: 26, skill: "TypeScript" };
}
const sangmin2 = introduce();
console.log(sangmin2.skill);
// skill이 없다. 유니온 타입을 쓰게 되면 공통된 속성에만 접근할 수 있기 때문에.

if ((sangmin2 as Developer).skill) {
  const skill = (sangmin2 as Developer).skill;
  console.log(skill);
} else (sangmin2 as Person).age {
    const age = (sangmin2 as Person).age;
    console.log(age);
}

// 타입 가드 함수
function isDeveloper(target: Developer | Person): target is Developer {
  return (target as Developer).skill !== undefined;
//   Developer.skill이 undefined가 아니라면.. target은 Developer이다.
}

if (isDeveloper(sangmin2)) {
  console.log(sangmin2.skill);
} else {
  console.log(sangmin2.age);
}
