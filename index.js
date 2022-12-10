let data = localStorage.getItem("transactions");
let transactions = data ? JSON.parse(data) : [];
const submitTransaction = document.getElementById('add-transaction-form');

submitTransaction.addEventListener("submit", (e) => {
    e.preventDefault();
    const conceptInputElement = document.getElementById('concept');
    const quantityInputElement = document.getElementById('quantity');
    if (conceptInputElement.value !== "" && quantityInputElement.value !== ""  && !isNaN(quantityInputElement.value)) {
        let newTransaction = {concept: conceptInputElement.value, quantity: quantityInputElement.value};
        transactions.push(newTransaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        addTransaction(newTransaction);
        
        conceptInputElement.value = "";
        quantityInputElement.value = "";
    }
})

function addTransaction(newTransaction){
    const EXPENSE_COLOR = 'rgb(200, 60, 60)'
    const newTransactionList = document.createElement('li');
    const incomeElement = document.getElementById('income-p');
    const expenseElement = document.getElementById('expense-p');
    const savingsElement = document.getElementById('savings-p');
    if (parseInt(newTransaction.quantity) < 0) {
        expenseElement.innerHTML =`${parseFloat(expenseElement.innerHTML) + parseFloat(newTransaction.quantity)}`;
        newTransactionList.style.background = EXPENSE_COLOR
    } else {
        incomeElement.innerHTML =`${parseFloat(incomeElement.innerHTML) + parseFloat(newTransaction.quantity)}`;

    }
savingsElement.innerHTML =`${parseFloat(incomeElement.innerHTML) + parseFloat(expenseElement.innerHTML)}`;
    const ulElement = document.getElementById('history-ul');
    newTransactionList.innerHTML = `
        <div>
            <p id="concept-li-p">${newTransaction.concept}</p>
            <p id="quantity-li-p">${newTransaction.quantity}</p>
        </div>
    `;
    ulElement.appendChild(newTransactionList);
}

transactions = localStorage.getItem('transactions');
transactions = data ? JSON.parse(data) : [];
transactions.forEach((element) => {
    addTransaction(element);
})