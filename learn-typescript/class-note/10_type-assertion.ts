// 타입 단언(type assertion)
let z;
z = 20;
z = "z";
// let b = z;
// z는 맨 마지막에 문자열이 될 것으로 알고 있지만, 실제 프리뷰를 보면 any 타입이다.
// 그래서, as XX를 넣어주면 된다.
let b = z as string;

// DOM API 조작

const div = document.querySelector("div") as HTMLDivElement;

// 접근하는 시점의 document.querySelector가 돌아가는 위치에서
// div가 있다는 보장을 해주지 않기 때문에 div가 있는지 확인을 하고
// 있으면 조작을 하는 게 일반적인 패턴이다.
