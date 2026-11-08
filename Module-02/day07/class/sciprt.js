let fullName = "Ku M.";

function returnName(Fname) {
  return Fname;
}

const studName = (Fname) => Fname;

const outer = (fName) => {
  return () => {
    return `${fName}`;
  };
};

// inner2();
returnName("Biruk");
studName("Ku");

let outer1 = outer("Ku M.");
let inner = outer1;

//higher order function
const calculate = (salary, operation) => {
  return operation(salary);
};

const total = (multiplier) => {
  return (salary) => salary * multiplier;
};

const totalBy10 = total(10);
const totalBy5 = total(5);

console.log(calculate(5000, totalBy10));
console.log(calculate(5000, totalBy5));

const subtotal = (...prices) => prices.reduce((sum, p) => sum + p, 0);

const discountBy = (rate) => (amount) => amount * (1 - rate);

const withVat = (amount) => amount * 1.15;

const toETB = (amount) => amount.toFixed(2);

function makeReceiptMaker() {
  let sequence = 0;
  return function (prices, discountRate = 0) {
    sequence += 1;
    const base = subtotal(...prices);
    const discounted = discountBy(discountRate)(base);
    const finalAmount = toETB(withVat(discounted));
    return `#${sequence}: ${finalAmount} ETB`;
  };
}
