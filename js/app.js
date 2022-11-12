//  class
//  every thing related to the budget
class Budget {
  constructor(budget) {
    this.budget = budget;
    this.budgetLeft = this.budget;
  }

  //   track remain budget
  calculateRemainingBudget(amount) {
    this.budgetLeft = this.budgetLeft - amount;
    return this.budgetLeft;
  }
}

// every thing related to html
class HTMLUI {
  //  insert input amount as weekly budget and remaining budget
  insertBudget(inputAmount) {
    //  assigning input amount to the weekly budget
    weeklyBudget.innerHTML = inputBudget;
    //  assigning input amount to the remaining budget
    remainBudget.innerHTML = inputBudget;
  }

  //  showing the alert
  showError(errorContext, errorClass) {
    //  this include all content in left section as parent element
    const boxColumnLeft = document.querySelector("#boxColumnLeft");
    //  create a div
    const div = document.createElement("div");
    //  add class to the div
    div.classList.add("alert", errorClass);
    //  add context to the div
    div.appendChild(document.createTextNode(errorContext));
    //  insert div before form in left column
    boxColumnLeft.insertBefore(div, form);
    setTimeout(() => {
      //  remove alert after 3 seconds
      document.querySelector(".alert").remove();
    }, 3000);
    // resetting form
    form.reset();
  }

  //  adding form input to list of expenses
  addToListExpenses(title, amount) {
    //  access to the ul
    const ul = document.querySelector(".ListOfExpenses");
    // create li element
    let li = document.createElement("li");
    // adding 2 features to li
    li.innerHTML = `
    the cost for ${title}  --->  ${amount}  £
    `;
    //  adding li to ul
    ul.appendChild(li);
  }

  // track budget to change the amount of remaining budget
  trackBudget(amount) {
    // calling calculating method in budget class to calculate remaining budget
    const calculatedLeftAmount = budget.calculateRemainingBudget(amount);
    remainBudget.innerHTML = ` ${calculatedLeftAmount} `;
    console.log(remainBudget.parentElement.parentElement);
    if (budget.budget / 4 > calculatedLeftAmount) {
      //  if remain budget become less than 25 %  give alert danger
      remainBudget.parentElement.parentElement.classList.remove(
        "alert-warning"
      );
      remainBudget.parentElement.parentElement.classList.add("alert-danger");
    } else if (budget.budget / 2 > calculatedLeftAmount) {
      //  if remain budget become less than 50 % give warning
      remainBudget.parentElement.parentElement.classList.remove(
        "alert-success"
      );
      remainBudget.parentElement.parentElement.classList.add("alert-warning");
    }
  }
}

//  variables

//  input budget in prompt50
let inputBudget;
//  access to the total budget
let weeklyBudget = document.querySelector("#total");
// access to the remain budget
let remainBudget = document.querySelector("#left");
//  access to form
const form = document.querySelector("#formAddExpenses");
//  instantiate budget class
const html = new HTMLUI();

//  eventListeners

eventListeners();
function eventListeners() {
  //  adding input in prompt on loaded
  document.addEventListener("DOMContentLoaded", function () {
    //  the value of input
    inputBudget = window.prompt("please enter your weekly budget");
    //  if input value is 0 or without input user click on ok('') or cancel(null)
    if (inputBudget === null || inputBudget === "" || inputBudget === "0") {
      //  repeat the request for getting input
      window.location.reload();
    } else {
      //  instantiate budget class
      budget = new Budget(inputBudget);
      //   insert input amount to both weekly budget and remaining budget
      html.insertBudget(budget.budget);
    }
  });

  //    getting information from form after submitting
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    //  get the title of cost
    const costTitle = document.querySelector("#costTitle").value;
    //  get the amount of cost
    const amount = document.querySelector("#costPrice").value;
    if (costTitle === "" || amount === "") {
      //  if there are empty fields
      html.showError("please fill out all fields correctly", "alert-danger");
    } else {
      //  adding title and amount to list of expenses
      html.addToListExpenses(costTitle, amount);
      //   change the amount of remaining budget after spending input budget
      html.trackBudget(amount);
    }
  });
}
