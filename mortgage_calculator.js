const messages = require("./mortgage_messages.json");
const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function isInvalidNumber(num) {
  return (
    num.toString().trimStart() === "" ||
    Number.isNaN(Number(num)) ||
    Math.sign(num) !== 1
  );
}


function isInvalidInput(stringYN) {
  if (stringYN.toLowerCase() === "yes" ||
    stringYN.toLowerCase() === "no" ||
    stringYN.trimStart()
    === "") {
    return false
  } else {
    return true;
  }
}

function printResult(messagee, result) {
  console.log(`=> ${messagee} ${result}`);
}

prompt(messages.welcome);


let countAnother = "yes";

while (countAnother[0] === "y") {

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

  let loanAmount = retriveInput(messages.loan, messages.wrongInput, isInvalidNumber);

  let annualPercantageRate = retriveInput(messages.intRate, messages.wrongInput, isInvalidNumber);

  let loanDurationYears = retriveInput(messages.loanTerm, messages.wrongInput, isInvalidNumber);

  let countMonthlyInterestRate = (annRate) => (annRate / 100) / 12;

  let countMonthlyPayment = (loanAmount, monthlyInterestRate, loanDurationYears) => {
    return Number(((loanAmount * (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -(loanDurationYears * 12))))).toFixed(2)));
  }

  let countTotalPayment = (paymentMonth, loanTerm) => {
    return (paymentMonth * (loanTerm * 12));
  }

  let monthlyInterestRate = countMonthlyInterestRate(annualPercantageRate);
  let monthlyPayment = countMonthlyPayment(loanAmount, monthlyInterestRate, loanDurationYears);
  let totalPayment = countTotalPayment(monthlyPayment, loanDurationYears);
  let totalInterest = (totalPayment - loanAmount);

  printResult(messages.paymentMonth, monthlyPayment.toLocaleString());
  printResult(messages.paymentTotal, totalPayment.toLocaleString());
  printResult(messages.interestTotal, totalInterest.toLocaleString());

  countAnother = retriveInput(messages.continue, messages.invalid, isInvalidInput);

  if (countAnother[0].toLowerCase() !== "y") break;
}
