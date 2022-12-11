const submitTransaction = document.getElementById('add-transaction-form');
submitTransaction.addEventListener("submit", (e) => {
    e.preventDefault();
    const conceptInputElement = document.getElementById('concept');
    const quantityInputElement = document.getElementById('quantity');
    if (conceptInputElement.value !== "" && quantityInputElement.value !== ""  && !isNaN(quantityInputElement.value)) {
        let newTransaction = {concept: conceptInputElement.value, quantity: quantityInputElement.value};
        let transactions = JSON.parse(localStorage.getItem("transactions"));
        transactions.push(newTransaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        addElements(newTransaction);
        
        conceptInputElement.value = "";
        quantityInputElement.value = "";
    }
})

function addElements(newTransaction){
    const EXPENSE_COLOR = 'rgb(200, 60, 60)'
    const newTransactionList = document.createElement('li');
    const incomeElement = document.getElementById('income-p');
    const expenseElement = document.getElementById('expense-p');
    const savingsElement = document.getElementById('savings-p');
    if (parseInt(newTransaction.quantity) < 0) {
        expenseElement.innerHTML =`${(parseFloat(expenseElement.innerHTML) + parseFloat(newTransaction.quantity)).toFixed(2)}`;
        newTransactionList.style.background = EXPENSE_COLOR
    } else {
        incomeElement.innerHTML =`${(parseFloat(incomeElement.innerHTML) + parseFloat(newTransaction.quantity)).toFixed(2)}`;
    }

    savingsElement.innerHTML =`${(parseFloat(incomeElement.innerHTML) + parseFloat(expenseElement.innerHTML)).toFixed(2)}`;
    const ulElement = document.getElementById('history-ul');
    newTransactionList.innerHTML = `
        <button class="remove" onclick="removeTransaction(this)">❌</button>
        <div>
            <div class="transaction">
                <p id="concept-li-p">${newTransaction.concept}</p>
                <p id="quantity-li-p">${newTransaction.quantity}</p>
            </div>
        </div>
    `;
    ulElement.appendChild(newTransactionList);
}

function removeTransaction(button) {
    const listElement = button.parentNode;
    const ulElement = listElement.parentNode;
    listElement.setAttribute('id', 'remove-li');
    const transactionIndex = Array.from(ulElement.children, (x)  => {return x.id}).indexOf("remove-li");
    let transactions = JSON.parse(localStorage.getItem("transactions"));
    transactions.splice(transactionIndex, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    console.log(localStorage.getItem("transactions"))
    listElement.remove();
    location.reload();
    
}

let data = localStorage.getItem('transactions');
transactions = data ? JSON.parse(data) : [];
transactions.forEach((element) => {
    addElements(element);
})