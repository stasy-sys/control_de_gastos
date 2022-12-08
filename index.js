localStorage.removeItem("transactions")
let data = localStorage.getItem("transactions");
let transactions = data ? JSON.parse(data) : [];
const transactionButton = document.getElementById('add-transaction-form');

transactionButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const conceptInputElement = document.getElementById('concept');
    const quantityInputElement = document.getElementById('quantity');
    let newTransaction = {concept: conceptInputElement.value, quantity: quantityInputElement.value};
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addElement(newTransaction);
})

function addElement(newTransaction){
    ulElement = document.getElementById('history-ul');
    let newTransactionList = document.createElement('li');
    if (parseInt(newTransaction.quantity) < 0) {
        newTransactionList.style.background = 'rgb(200, 60, 60)'
    } 
    
    if (newTransaction.concept !== "" && newTransaction.quantity !== ""  && !isNaN(newTransaction. quantity)) {
        newTransactionList.innerHTML =`
        <div>
            <p id="concept-li-p">${newTransaction.concept}</p>
            <p id="quantity-li-p">${newTransaction.quantity}</p>
        </div>
    `;

    ulElement.appendChild(newTransactionList);
    }

}

transactions = localStorage.getItem("transactions");
transactions = data ? JSON.parse(data) : [];
transactions.forEach((element) => {
    addElement(element);
})
