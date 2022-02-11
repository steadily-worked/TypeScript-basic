function Logger(logString: string /* 함수형태임을 지정 */) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
    // 이 Logger 데코레이터가 붙은 함수에 해당하는 constructor 출력
    // constructor에 출력문이 있다면 constructor 출력 이후에 출력됨
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    /*_: Function은: 존재는 알지만 쓰지 않겠다고 명시하는것 */
    console.log("Rendering Template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// @Logger("LOGGING - PERSON")
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
// 이렇게 데코레이터를 두 개 이상 넣어주면 아래 데코레이터부터 실행된다.
class Person {
  name = "steadily";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
