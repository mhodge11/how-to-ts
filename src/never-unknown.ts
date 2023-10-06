let userInput: unknown; // unknown is a type that can be anything
let userName: string;

userInput = 5;
userInput = "Max";
if (typeof userInput === "string") userName = userInput;

function generateError(message: string, code: number): never {
  // never is a type that never returns anything
  throw { message: message, errorCode: code };
}

const result = generateError("An error occurred!", 500);
console.log(result);
