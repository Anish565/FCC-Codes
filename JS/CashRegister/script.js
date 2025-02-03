let price = 19.5;
let cid = [
    ["PENNY", 0.5], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]
];

const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
};

document.getElementById("purchase-btn").addEventListener("click", function () {
    const cashInput = document.getElementById("cash");
    const changeDue = document.getElementById("change-due");
    let cash = parseFloat(cashInput.value.trim());

    if (isNaN(cash) || cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let change = parseFloat((cash - price).toFixed(2));
    if (change === 0) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        changeDue.style.color = "green";
        return;
    }

    let totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

    if (totalCid < change) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        changeDue.style.color = "red";
        return;
    }

    let changeArray = [];
    let remainingChange = change;

    for (let i = cid.length - 1; i >= 0; i--) {
        let currencyName = cid[i][0];
        let currencyValue = currencyUnit[currencyName];
        let currencyTotal = cid[i][1];

        let currencyUsed = 0;
        while (remainingChange >= currencyValue && currencyTotal > 0) {
            remainingChange -= currencyValue;
            remainingChange = parseFloat(remainingChange.toFixed(2));
            currencyTotal -= currencyValue;
            currencyUsed += currencyValue;
        }

        if (currencyUsed > 0) {
            changeArray.push([currencyName, currencyUsed]);
        }
    }

    if (remainingChange > 0) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        changeDue.style.color = "red";
        return;
    }

    if (totalCid === change) {
        changeDue.textContent = `Status: CLOSED ${changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ")}`;
        changeDue.style.color = "blue";
        return;
    }

    changeDue.textContent = `Status: OPEN ${changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ")}`;
    changeDue.style.color = "green";
});