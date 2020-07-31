const messages = require("./mortgage_messages.json");
const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

let retriveInput = (promptMessage, invalidMessage, isInvalid) => {
  prompt(promptMessage);
  let input = readline.question();
  while (isInvalid(input)) {
    prompt(invalidMessage);
    prompt(promptMessage);
    input = readline.question();
  }
  return input;
}

function isInvalidNumber(num) {
  return (
    num.toString().trimStart() === "" ||
    Number.isNaN(Number(num)) ||
    Math.sign(num) !== 1
  )
}

function isInvalidAPR(num) {
  return (
    num.toString().trimStart() === "" ||
    Number.isNaN(Number(num)) ||
    Math.sign(num) === -1
  )
}


function isInvalidInput(stringYN) {
  return !(
    stringYN.toLowerCase() === "yes" ||
    stringYN.toLowerCase() === "no" ||
    stringYN.trimStart() === ""
  )
}

let countMonthlyInterestRate = (annRate) => (annRate / 100) / 12;

let countMonthlyPayment = (loanAmount, monthlyInterestRate, loanDurationYears) => {
  return Number(((loanAmount * (monthlyInterestRate /
    (1 - Math.pow(1 + monthlyInterestRate, -(loanDurationYears * 12))))).toFixed(2)));
}

let countTotalPayment = (paymentMonth, loanTerm) => {
  return (paymentMonth * (loanTerm * 12));
}

let countTotalInterest = (paymentTotal, loanAmnt) => paymentTotal - loanAmnt;

function printResult(messagee, result) {
  console.log(`=> ${messagee} ${result}`);
}

let clearScreen = () => {
  for (let i = 0; i < 22; i = i + 1) {
    console.log(" ");
  }
}


prompt(messages.welcome);

while (true) {

  let loanAmount = retriveInput(messages.loan, messages.wrongInput, isInvalidNumber);

  let annualPercantageRate = retriveInput(messages.intRate, messages.wrongInput, isInvalidAPR);

  let loanDurationYears = retriveInput(messages.loanTerm, messages.wrongYears, isInvalidNumber);

  let monthlyInterestRate = countMonthlyInterestRate(annualPercantageRate);
  let monthlyPayment = countMonthlyPayment(loanAmount, monthlyInterestRate, loanDurationYears);
  let totalPayment = countTotalPayment(monthlyPayment, loanDurationYears);
  let totalInterest = countTotalInterest(totalPayment, loanAmount);

  printResult(messages.paymentMonth, monthlyPayment.toLocaleString());
  printResult(messages.paymentTotal, totalPayment.toLocaleString());
  printResult(messages.interestTotal, totalInterest.toLocaleString());

  let countAnother = retriveInput(messages.continue, messages.invalid, isInvalidInput);
  clearScreen();
  if (countAnother[0].toLowerCase() !== "y") {
    break;
  }
}
