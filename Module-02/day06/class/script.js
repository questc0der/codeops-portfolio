// Build a TeleBirr tip & split calculator

// DELIVERABLE
// A script that takes a bill amount and party size, adds a tiered tip, and
// prints the total and the amount per person in ETB.

// Steps
// • Read bill and partySize; convert the bill with Number().
// • Add a 10% tip when the bill is over 300 ETB, else 5%.
// • Compute the total and the per-person amount.
// • Print a clear message with a template literal.
// • Use a switch to add a TeleBirr / CBE Birr service fee.
// • Run with node tip.js and check it against expected.txt.

let bill = 1000;
let partySize = 4;

let tipPercentage;
if (bill > 300) {
  tipPercentage = 0.1;
} else {
  tipPercentage = 0.05;
}

let tipAmount = bill * tipPercentage;
let totalAmount = bill + tipAmount;
let amountPerPerson = totalAmount / partySize;

console.log(`Total bill (including tip): ${totalAmount} ETB`);
console.log(`Amount per person: ${amountPerPerson} ETB`);

let paymentMethod = prompt("Enter payment method (TeleBirr/CBE Birr):");
let serviceFee;
switch (paymentMethod) {
  case "telebirr":
    serviceFee = 5;
    break;
  case "cbe birr":
    serviceFee = 3;
    break;
  default:
    serviceFee = 0;
    console.log("No service fee applied for this payment method.");
}
print(`Service fee: ${serviceFee} ETB`);
totalAmount += serviceFee;
amountPerPerson = totalAmount / partySize;

console.log(
  `Final total bill (including tip and service fee): ${totalAmount.toFixed(2)} ETB`,
);
console.log(`Final amount per person: ${amountPerPerson.toFixed(2)} ETB`);
