type Combined = number | string; // union type
type ConversionDescriptor = "as-number" | "as-text"; // literal type

function combine(
  input1: Combined,
  input2: Combined,
  resultConversion: ConversionDescriptor
) {
  let result: Combined;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  )
    result = +input1 + +input2;
  else result = input1.toString() + input2.toString();
  return result;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
