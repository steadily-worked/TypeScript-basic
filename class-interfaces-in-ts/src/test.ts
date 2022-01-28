// interface State {
//   name: string;
//   capital: string;
// }

// const states: State[] = [
//   { name: "Korea", capital: "Seoul" },
//   { name: "Japan", capital: "Tokyo" },
// ];

// for (const state of states) {
//   console.log(state.capital);
// }

// const a = null + 7;
// const b = [] + 12; // JS에서는 빈 배열을 더해주면 출력 시 숫자가 문자열로 바뀌게 됨
// alert("Hello", "TypeScript");

// const c: number = null;

// const el = document.getElementById("status");
// el.textContent = "Ready";
// if (el) {
//   el.textContent = "Ready";
// }
// el!.textContent = "Ready";

interface Square {
  kind: "square";
  width: number;
}

interface Rectangle extends Square {
  kind: "rectangle";
  height: number;
  width: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  //   if (shape instanceof Rectangle) {
  //     // instanceof 체크는 런타임에 일어나지만, Rectangle은 타입이기 때문에 런타임 시점에 아무런 역할을 할 수 없다.
  //     // 즉 여기서는 shape 타입이 명확하게 되어있지 않은 상황인 것임
  //     return shape.width * shape.height;
  if (shape.kind === "rectangle") {
    shape; // 타입이 Rectangle
    return shape.width * shape.height;
  } else {
    shape; // 타입이 Square
    return shape.width * shape.width;
  }
}
