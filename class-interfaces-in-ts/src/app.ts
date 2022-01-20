class Department {
  // private readonly id: string;
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department: (${this.id}): ${this.name}`);
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

// 상속: 단일 상속만 가능
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT" /* 이름도 넣어줄 수 있음*/);
    // 다른 클래스를 상속 받는 클래스에 고유 생성자를 추가하려면 super()를 호출해야 한다.
    this.admins = admins;
    // this 키워드를 사용하기 위해선 먼저 super()로 불러오는 거 먼저 해야한다.
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "IT");
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("d1", ["steadily"]);

it.addEmployee("steadily");
it.addEmployee("worked");

// accounting.employees[2] = "sangmin";
// 메소드를 이용하는 방식이 아니라 이런 방식은 추천하지 않으며, 하더라도 둘 중 하나의 방식으로만 통일하는 게 좋다.
// 이렇게 직접 접근하는 방식을 막기 위해서 employees 프로퍼티에 private를 추가한다. 이 경우 클래스 내에서만 접근할 수 있다.

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);
// accounting.describe()가 실행될 때 this 키워드는 이 클래스에 기반하여 구축된 이 구체적인 accounting 객체를 참고할 것이다.

// const accountingCopy = { name: "DUMMY_NAME", describe: accounting.describe };
// accountingCopy.describe();
// Department: undefined로 출력되는데, 그 이유는 메소드 실행 시 this가 이 객체를 참조하지 않기 때문이다.
// 즉 describe를 할 때 이름 속성이 없는 accountingCopy 객체를 참조했기 때문이다.
// 이 때는 8행의 describe의 파라미터로 this를 넣어줘야 하며, 이 this는 class명인 Department의 타입을 갖고 있어야 한다.

// 타입스크립트는, 클래스를 기반으로 인스턴스화 되는 객체의 구성요소를 정의할 수 있다.
// 클래스의 프로퍼티는: 곧 클래스의 변수를 의미함
// private: 오직 클래스 내부에서만(ex. 클래스 메소드 내부에서만) 접근할 수 있도록 한다.

const accounting = new AccountingDepartment("d2", []);
accounting.addReport("Something went wrong...");
accounting.printReports();
