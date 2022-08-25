//Grab Elements
var addBtn = document.getElementById('add-entry')
var table = document.querySelector('tbody')
var itemCounter = 0

//functions

/////////////////// basic add and del ///////////////////
function addRow(){ // if already empty row no add new row
    itemCounter++;

    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td class="input-item">${itemCounter}</td>
        <td><input class = "input-date" type="date" name = "date"></td>
        <td><input class = "input-amt" type="number" name = "amt" placeholder = "0.00"></td>
        <td><input class = "input-desc" type="text" name = "desc" placeholder = "Describe Expense/Income"></td>
        <td><button type = "button" class = "delete-entry">Delete</button></td>
    `;

  table.appendChild(tr);
}

function deleteRow(event){
    if (event.target.className === "delete-entry"){
        table.removeChild(event.target.parentNode.parentNode);
    }
    const allItems = document.getElementsByClassName("input-item");

    for (let i = 0; i < allItems.length; i++){
        allItems[i].innerHTML = i + 1
    }
    itemCounter--;
}

/////////////////// Logging into table ///////////////////
// function insertRowValues(){

// }

// function checkAllEntriesFilled(){
    
// }

/////////////////// Adjust Total Amount ///////////////////
// function checkIfNumber(){

// }

// function adjustTotalAmount(){

// }


//Events
addBtn.addEventListener("click", addRow);
table.addEventListener("click", event => deleteRow(event));