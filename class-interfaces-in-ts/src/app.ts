class Department {
  private name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }
  describe(this: Department) {
    console.log("Department: " + this.name);
    // 이 경우에는 항상 Department 클래스에 기반한 인스턴스를 참고함
  }
  // this는 보통 생성된 클래스의 구체적인 인스턴스를 참고한다.
  // this.~~~ 와 같은 구문으로 이 인스턴스의 모든 속성과 메소드에 접근할 수 있다.

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("Accounting");

accounting.addEmployee("steadily");
accounting.addEmployee("worked");

// accounting.employees[2] = "sangmin";
// 메소드를 이용하는 방식이 아니라 이런 방식은 추천하지 않으며, 하더라도 둘 중 하나의 방식으로만 통일하는 게 좋다.
// 이렇게 직접 접근하는 방식을 막기 위해서 employees 프로퍼티에 private를 추가한다. 이 경우 클래스 내에서만 접근할 수 있다.

accounting.describe();
accounting.printEmployeeInformation();
// accounting.describe()가 실행될 때 this 키워드는 이 클래스에 기반하여 구축된 이 구체적인 accounting 객체를 참고할 것이다.

// const accountingCopy = { name: "DUMMY_NAME", describe: accounting.describe };
// accountingCopy.describe();
// Department: undefined로 출력되는데, 그 이유는 메소드 실행 시 this가 이 객체를 참조하지 않기 때문이다.
// 즉 describe를 할 때 이름 속성이 없는 accountingCopy 객체를 참조했기 때문이다.
// 이 때는 8행의 describe의 파라미터로 this를 넣어줘야 하며, 이 this는 class명인 Department의 타입을 갖고 있어야 한다.
