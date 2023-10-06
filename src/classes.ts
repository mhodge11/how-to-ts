abstract class Department {
  // static property that can be accessed directly on the class without new keyword
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  // static method that can be called directly on the class without new keyword
  static createEmployee(name: string) {
    return { name };
  }

  // abstract method that must be implemented in child classes
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation(this: Department) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("Please pass in a valid value!");
    this.addReport(value);
  }

  // Ensures new instances of AccountingDepartment cannot be created
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // Singleton pattern
  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new AccountingDepartment("1", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports(this: AccountingDepartment) {
    console.log(this.reports);
  }
}

const it = new ITDepartment("1", ["Max"]);
const accounting = AccountingDepartment.getInstance();
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.addReport("Something went wrong...");
accounting.describe();
accounting.printEmployeeInformation();
accounting.printReports();
