const account = {
  name: "Ronald Venegas",
  income: [],
  expenses: [],
  addExpense: function (description, amount) {
    this.expenses.push({
      description,
      amount
    })
  },
  addIncome: function (description, amount) {
    this.income.push({
      description,
      amount
    })
  },
  getAccountSummary: function () {
    let incomesAmount = 0;
    let expensesAmount = 0;
    this.income.forEach(function (income) {
      incomesAmount += income.amount;
    })
    this.expenses.forEach(function (expense) {
      expensesAmount += expense.amount;
    })
    return `${this.name} has a balance of $${incomesAmount - expensesAmount}. $${incomesAmount} in income. $${expensesAmount} in expenses.`
  }
}

account.addIncome("Job payment", 250);
account.addExpense("Rent", 100);
account.addExpense("Food", 50);
console.log(account.getAccountSummary());