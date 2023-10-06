const names: Array<string> = ["Max", "Manuel"]; // default generic type
names[0].split(" ");

// default generic type
const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => resolve("This is done!"), 2000);
});

promise.then((data) => {
  data.split(" ");
});

// generic function with constraints
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
const mergedObj2 = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.hobbies);
console.log(mergedObj2.age);

interface Lengthy {
  length: number;
}

// generic function with constraints
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length > 0)
    descriptionText =
      "Got " + element.length + ` element${element.length === 1 ? "" : "s"}.`;
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));

// keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Max" }, "name"));

// generic classes
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());

// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Max" };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

// generic utility types
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // Partial<CourseGoal> makes all properties optional
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// Readonly makes all properties read-only
const names2: Readonly<string[]> = ["Max", "Anna"];
// names2.push("Manu");
// names2.pop();
