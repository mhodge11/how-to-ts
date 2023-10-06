// Decorators are functions that can be attached to classes, methods, properties, etc.
// They are executed when the class is defined, not when the class is instantiated
// Decorators are executed top to bottom
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

// Decorator runs when the class is defined
@Logger // Decorator
class Guy {
  name = "Max";

  constructor() {
    console.log("Creating guy object...");
  }
}

const guy = new Guy();
console.log(guy);

function LoggerFactory(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// Decorator Factory runs when the class is defined
@LoggerFactory("LOGGING - PERSON") // Decorator Factory
class Guy2 {
  name = "Max";

  constructor() {
    console.log("Creating guy object...");
  }
}

const guy2 = new Guy2();
console.log(guy2);

// More complex decorator
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@LoggerFactory("LOGGING") // Decorator Factory
@WithTemplate("<h1>My Person Object</h1>", "app") // Decorator Factory
class Guy3 {
  name = "Max";

  constructor() {
    console.log("Creating guy object...");
  }
}

const guy3 = new Guy3();
console.log(guy3);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

// Property Decorator runs when the property is defined
class Product {
  @Log // Property Decorator
  title: string;
  private _price: number;

  @Log2 // Accessor Decorator
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw new Error("Invalid price - should be positive!");
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 // Method Decorator
  getPriceWithTax(@Log4 tax: number) {
    // Parameter Decorator
    return this._price * (1 + tax);
  }
}

function WithTemplateClassExtender(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@LoggerFactory("LOGGING") // Decorator Factory
@WithTemplateClassExtender("<h1>My Person Object</h1>", "app") // Decorator Factory
class Guy4 {
  name = "Max";

  constructor() {
    console.log("Creating guy object...");
  }
}

// Return method property descriptor with decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind // Method Decorator
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

// Validation with Decorators
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
