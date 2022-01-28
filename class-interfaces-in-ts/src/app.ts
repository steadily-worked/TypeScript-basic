abstract class Department {
  static fiscalYear = 2022;
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
    // console.log(this.fiscalYear) // Property 'fiscalYear' is a static member of type 'Department'ts(2576)
    // this는 클래스를 기반한 인스턴스를 참조하므로, 정적 프로퍼티는 당연히 인스턴스에서 작동하지 않을 것이다.
    // 다시 말하면, 정적 프로퍼티와 메소드는 애초에 인스턴스와는 분리되어 있는 것이기 때문에 딘스턴스 내부에서는 작동하지 않을 것이다.
    // 불러오려면, 클래스 안이더라도 Department.fiscalYear의 형태로 불러와야 한다.
  }

  // 정적 프로퍼티 사용: static 선언
  static createEmployee(name: string) {
    return { name: name };
  }

  // 기초 클래스에 빈 메소드를 놓고, 클래스에 기반된 모든 클래스들을 이 메소드에 추가하거나 오버라이드 해야 함
  abstract describe(
    this: Department
  ): void; /* {
    // console.log(`Department: (${this.id}): ${this.name}`);
    // 이 경우에는 항상 Department 클래스에 기반한 인스턴스를 참고함
  } */
  // this는 보통 생성된 클래스의 구체적인 인스턴스를 참고한다.
  // this.~~~ 와 같은 구문으로 이 인스턴스의 모든 속성과 메소드에 접근할 수 있다.

  // abstract 처리를 하면, 이제 이 describe 메소드가 어떻게 보여야 하는지, 구성이 어떤지 정의하기는 했지만

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

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
  // abstract class에서 describe를 abstract로 정의했기 때문에,
  // 자식 클래스들에서는 무조건 describe가 필요하다. abstract로 구현된 클래스들은 스스로 인스턴스화 할 수 없다.
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;
  // 클래스에서 바로 접근 가능한 static 프로퍼티가 존재.

  public get mostRecentReport(): string {
    if (this.lastReport) {
      return this.lastReport;
    }
    // getter 메소드는 반드시 반환값이 있어야 한다.
    throw new Error("No report found");
  }
  // lastReport 자체로는 외부 클래스에서 .lastReport ~ 이런식으로 가져올 수 없으나,
  // 조건부로 가져올 수 있게 / 혹은 에러를 띄우게 하려면 위와 같은 getter 메소드를 사용해야 한다.

  public set mostRecentReport(v: string) {
    if (!v) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(v);
  }
  // setter는 받아오는 getter와 다르게 작접 수행하는 메소드이다.
  // 넘겨받은 v(value)에 대해 값이 없는 경우가 아니라면 addReport를 실행하는 것이다.

  private constructor(id: string, private reports: string[]) {
    super(id, "IT");
    this.lastReport = reports[0];
  }

  static getInstance() {
    // 이 클래스에 이미 인스턴스가 있는지 확인, 없으면 새것을 리턴
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(name: string) {
    if (name === "steadily") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("steadily");
console.log(employee1, Department.fiscalYear); // {name: 'steadily'}
// static 처리를 한 메소드에 대해서는 클래스명.메소드명("파라미터") 로 바로 접근 가능
// 반면 이렇게 static 처리가 되어있는 것은, 정작 클래스 내부에서는 접근할 수 없다.

const it = new ITDepartment("d1", ["steadily"]);

it.addEmployee("steadily");
it.addEmployee("worked");

// accounting.employees[2] = "sangmin";
// 메소드를 이용하는 방식이 아니라 이런 방식은 추천하지 않으며, 하더라도 둘 중 하나의 방식으로만(메소드를 이용하거나, 이용하지 않거나.) 통일하는 게 좋다.
// 이렇게 직접 접근하는 방식을 막기 위해서 employees 프로퍼티에 private를 추가한다. 이 경우 클래스 내에서만 접근할 수 있다.
// 정의된 클래스 내에서만 접근 가능하다는 말은 즉, 상속받는 하위 클래스에서도 접근할 수 없다는 말이다. 후자만 가능하게 하려면 private 대신 protected를 쓰면 된다. 혹은 private로 하되 getter 메소드를 통해 조건부로 받을 수 있게 하면 된다.

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

// const accounting = new AccountingDepartment("d2", []);
// constructor에 private 설정을 하면, 클래스 안에서만 접근할 수 있으므로 새로운 객체를 생성할 수 없게 된다.
const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = "Latest Report";
// setter로 실행하려면 괄호로 실행시켜줄 게 아니라, 값을 대입해줘야 한다. 우항에 들어가는 값이 setter의 파라미터로 들어간다.

accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);
// addReport가 있고 난 후에야 accounting.mostRecentReport가 에러를 일으키지 않는다.

accounting.addEmployee("steadily");
accounting.addEmployee("worked");

accounting.describe(); // Accounting Department - ID: d2 (처음 시작부터 id를 d2로 박았으므로 그대로 나옴)
// accounting.printReports();
// accounting.printEmployeeInformation();

// 정적 프로퍼티 사용: 새 클래스를 호출할 필요 없이 클래스에 직접 접근할 수 있게 된다.
// ex) Math.PI
