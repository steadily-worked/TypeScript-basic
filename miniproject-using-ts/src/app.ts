// class ProjectInput {
//   templateElement: HTMLTemplateElement;
//   hostElement: HTMLDivElement;
//   element: HTMLFormElement;

//   constructor() {
//     this.templateElement = document.getElementById(
//       "project-input"
//     )! as HTMLTemplateElement; // 타입 캐스팅
//     this.hostElement = document.getElementById("app")! as HTMLDivElement; // !: null이 아닐 것이라는 걸 확신하는 경우 사용

//     const importedNode = document.importNode(
//       this.templateElement.content,
//       true
//     );
//     console.log(this.templateElement);
//     console.log(importedNode);
//     // importedNode는 노드 상태이므로, element라는 변수를 선언하여 (form 태그에 해당하는 값) + (첫번째 childNode를 가져온다는 것)을 따로 선언해줘야 한다.
//     // 이렇게 해야지만 hostElement에 insert할 수 있다.
//     this.element = importedNode.firstElementChild as HTMLFormElement;
//     this.element.id = "user-input";
//     this.attach();
//   }

//   private attach() {
//     this.hostElement.insertAdjacentElement("afterbegin", this.element);
//   }
// }

// const prjInput = new ProjectInput();

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  // 반환 타입으로 배열 내에 객체들의 모임: 튜플. 위 타입은, 반환하는 것이 없거나 튜플이라고 하는 것이다.
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert("칸을 전부 채워주세요");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
