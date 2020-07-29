// IN: the loan amount int 
// the Annual Percentage Rate (APR) int  + %
// the loan duration int
//Out: 
//monthly interest rate int
//loan duration in months int 12
//monthlyPayment = int + dollars and cents $111.33 
//let monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow((1 + motnhlyInterestRate), (-loanDurationMonth))));

//Take loan duration in years and convert it to months. Take intRate and convert it to montly  Then calculate monthly payment. Multiply monthly payment times amount of months to get tota Payment and deduct it from loan amount to get totalInetrest Rate. Then return those trhee numbers. 

//example: 
//in: let loanAmount = 10000         
//in: let annualPercRate = 5         
//in: let loanDurationYears: 10       
//out: motnhlyPayment = $1,021.75
//totalPayment: $128,739.87               $123.45
//totalInterest: $28,739.87
 
//tests: edge cases: 
//LoanAmount = /10.000 / ten tousands / 10000$ / 10,000 / 
//LoanDuration = / 10.5 / ten / 10 and 6 months
//AnnualPercantageRate = /can be 0.5 / 5% / five / 0,5


//mothly interestRate = convert annual rate from % to decimal
//devide annual rate by 12
//X the loan amount
//convert to % (X100)


const messages = require('./mortage_messages.json');
const readline = require('readline-sync');
console.log("Welcome to Loant Calculator!");

function prompt(message) {
  console.log(`=> message`);
}

while(true) {
  prompt(messages.loan);
  let loanAmount = readline.question();

  prompt(messages.intRate);
  let annualPercantageRate = readline.question();

  prompt(messages.loanterm);
  let loanDurationYears = readline.question();

  prompt(messages.continue);
  let countAnother = readline.question();

  if(!countAnother) {
    break;
  }

//};