//function formulas() {
//     let totalMonthlyPayment = (loanAmount * (rateAmount / 1200)) / (1 - ((1 + rateAmount / 1200) ^ termAmount));
//     let remainingBalance = termAmount - monthNumber * totalMonthlyPayment;
//     let interestPayment = (totalMonthlyPayment * rateAmount) / 1200;
//     let principalPayment = payment - interestPayment;
//     let mothlyBalance = remainingBalance - totalMonthlyPayment - principalPayment;
//}

//function calculator() {
//    const loanAmount = document.getElementById("loan").value;
//    const termAmount = document.getElementById("term").value
//    const rateNumber = document.getElementById("rate").value
//
//    let rateAmount = rateNumber / 100
//
//    let totalMonthlyPayment = (loanAmount * (rateAmount / 1200) / (1 - ((1 + rateAmount / 1200) ** (-termAmount))));
//    let remainingBalance = (loanAmount - totalMonthlyPayment);
//    let lastMonth = (remainingBalance + totalMonthlyPayment);
//    let interestPayment = (lastMonth * ((rateAmount * 100) / 1200));
//    let principalPayment = (totalMonthlyPayment - interestPayment);
//    let monthlyBalance = (remainingBalance - totalMonthlyPayment - principalPayment);
//    let totalCost = (interestPayment + principalPayment);
//
//    let totalMonthly = totalMonthlyPayment.toFixed(2)
//
//    document.querySelector("#results").innerHTML = "$" + totalMonthly;
//}

function getInputs() {
  let loan = document.getElementById("loan").value;
  let term = document.getElementById("term").value;
  let rate = document.getElementById("rate").value;

  let loanAmount = parseFloat(loan);
  let termAmount = parseFloat(term);
  let rateAmount = parseFloat(rate);

  let inputs = {
    loanAmount: loanAmount,
    termAmount: termAmount,
    rateAmount: rateAmount,
  };

  calculateInputs(inputs);
}

function calculateInputs(inputs) {
  let paymentArray = [];
  let totalTop = [];

  let loanAmount = inputs.loanAmount;
  let termAmount = inputs.termAmount;
  let rateAmount = inputs.rateAmount;

  let totalMonthlyPayment =
    (loanAmount * (rateAmount / 1200)) /
    (1 - (1 + rateAmount / 1200) ** -termAmount);

  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let totalPrincipal = 0;
  let totalCost = 0;

  for (let i = 1; i <= termAmount; i++) {
    let interestPayment = remainingBalance * (rateAmount / 1200);
    let principalPayment = totalMonthlyPayment - interestPayment;
    remainingBalance = remainingBalance - principalPayment;
    totalInterest += interestPayment;
    totalPrincipal += principalPayment;
    let totalCost = totalInterest + totalPrincipal;

    let paymentValues = {
      month: i,
      payment: "$" + totalMonthlyPayment.toFixed(2),
      principal: "$" + principalPayment.toFixed(2),
      interest: "$" + interestPayment.toFixed(2),
      totalInterest: "$" + totalInterest.toFixed(2),
      balance: "$" + remainingBalance.toFixed(2),
    };
    paymentArray.push(paymentValues);
  
    let totalTopValues = {
      totalPrincipal: "$" + totalPrincipal.toFixed(2),
      totalInterest: "$" + totalInterest.toFixed(2),
      totalCost: "$" + totalCost.toFixed(2),
      payment: "$" + totalMonthlyPayment.toFixed(2),
    };
    totalTop.push(totalTopValues);
  }
  displayPaymentsTable(paymentArray);
  displayTotals(totalTop);
}

function displayPaymentsTable(paymentArray) {
  const eventTable = document.getElementById("eventTable");
  const template = document.getElementById("tableRowTemplate");

  eventTable.innerHTML = "";
  

  for (let i = 0; i < paymentArray.length; i++) {
    let event = paymentArray[i];

    let tableRow = document.importNode(template.content, true);

    tableRow.querySelector('[data-id="month"]').textContent = event.month;
    tableRow.querySelector('[data-id="payment"]').textContent = event.payment;
    tableRow.querySelector('[data-id="principal"]').textContent = event.principal;
    tableRow.querySelector('[data-id="interest"]').textContent = event.interest;
    tableRow.querySelector('[data-id="total"]').textContent = event.totalInterest;
    tableRow.querySelector('[data-id="balance"]').textContent = event.balance;

    tableRow.querySelector("tr").setAttribute("data-event", event.id);

    eventTable.appendChild(tableRow);
  }
}

function displayTotals(totalTop) {
  let top = totalTop[totalTop.length - 1];

  document.getElementById("tPrincipal").textContent = top.totalPrincipal;
  document.getElementById("tInterest").textContent = top.totalInterest;
  document.getElementById("tCost").textContent = top.totalCost;
  document.getElementById("results").textContent = top.payment;
}