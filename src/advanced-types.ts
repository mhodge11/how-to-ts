type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // intersection type

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // intersection type

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) console.log("Privileges: " + emp.privileges); // type guard
  if ("startDate" in emp) console.log("Start Date: " + emp.startDate); // type guard
}

printEmployeeInfo(e1);
printEmployeeInfo({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) vehicle.loadCargo(1000); // type guard
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird"; // discrimated union
  flyingSpeed: number;
}

interface Horse {
  type: "horse"; // discrimated union
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// ); // type assertion
// const userInputElement = document.getElementById(
//   "user-input"
// )! as HTMLInputElement; // type assertion
// userInputElement.value = "Hi there!";
const userInputElement = document.getElementById("user-input"); // type assertion
if (userInputElement)
  (userInputElement as HTMLInputElement).value = "Hi there!";

// index properties
interface ErrorContainer {
  // { email: "Not a valid email", username: "Must start with a character!" }
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

// function overload
function calculate(a: number, b: number): number;
function calculate(a: string, b: string): string;
function calculate(a: number, b: string): string;
function calculate(a: string, b: number): string;
function calculate(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string")
    return a.toString() + b.toString(); // type guard
  return a + b;
}

const data = calculate("Max", "Schwarz");
data.split(" ");

const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title); // optional chaining

const input = null;
const storedData = input ?? "DEFAULT"; // nullish coalescing
