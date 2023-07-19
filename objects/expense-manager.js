let myAccount = {
  name: "Ronald",
  expenses: 0,
  income: 0
}

let addExpense = function (account, amount) {
  account.expenses += amount;
}

let addIncome = function (account, income) {
  account.income += income;
}

let resetAccount = function (account) {
  account.expenses = 0;
  account.income = 0;
}

let getAccountSummary = function (account) {
  return `Account for ${account.name} has $${account.income - account.expenses}. $${account.income} in income. $${account.expenses} in expenses.`
}

addIncome(myAccount, 2000);
addExpense(myAccount, 2.50);
addExpense(myAccount, 160);
console.log(getAccountSummary(myAccount));
resetAccount(myAccount);
console.log(getAccountSummary(myAccount));