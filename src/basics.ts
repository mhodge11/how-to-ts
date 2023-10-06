function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const sum = n1 + n2;
  if (showResult) return console.log(phrase + sum);
  else return sum;
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is: ";

add(number1, number2, printResult, resultPhrase);
