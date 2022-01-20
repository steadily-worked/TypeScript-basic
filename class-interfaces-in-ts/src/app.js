var Department = /** @class */ (function () {
    function Department(n) {
        this.employees = [];
        this.name = n;
    }
    Department.prototype.describe = function () {
        console.log("Department: " + this.name);
    };
    return Department;
}());
var accounting = new Department("Accounting");
console.log(accounting);
accounting.describe();
var accountingCopy = { name: "DUMMY_NAME", describe: accounting.describe };
accountingCopy.describe();
// Department: undefined로 출력되는데, 그 이유는 메소드 실행 시 this가 이 객체를 참조하지 않기 때문이다.
