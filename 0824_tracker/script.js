//Grab Elements
var addBtn = document.getElementById('add-entry')
var table = document.querySelector('tbody')
var itemCounter = 0
var totalAmt = document.getElementById('total-amt')
const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;

//functions
///////////////////
function getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + '-' + dd;
    return today;
}


/////////////////// basic add and del ///////////////////
function addRow(){ // if already empty row no add new row
    var tableLastRow = table.lastChild
    var newRowExist = checkNoNewLine(table.lastChild)
    if (newRowExist){
        return;
    }

    itemCounter++;

    const tr = document.createElement('tr');
    tr.id = "new-row"

    tr.innerHTML = `
        <td class="input-item">${itemCounter}</td>
        <td><input class = "input-date" type="date" name = "date" value = ${getDate()}></td>
        <td><input class = "input-amt" type="number" name = "amt" placeholder = "0.00"></td>
        <td>
            <select name="description" class = "input-desc" id="desc-dropdown">
                <option value="">--Select an option--</option>
                <option value="grocery">Grocery</option>
                <option value="shopping">Shopping</option>
                <option value="income">Income</option>
                <option value="investment">Investment</option>
                <option value="misc">Miscellaneous</option>
        </td>
        <td><button type = "button" class = "delete-entry">Delete</button></td>
    `;
    //input desc : <input class = "input-desc" type="text" name = "desc" placeholder = "Describe Expense/Income">

    table.appendChild(tr);
}

function checkNoNewLine(tableLastRow){
    if (table.childNodes.length == 0){
        return;
    }
    var newRowExist = document.getElementById("new-row")

    if (newRowExist == null){
        return false
    }

    return true
}

function deleteRow(event){
    if (event.target.className === "delete-entry"){
        //grab amount first
        var currentAmountString = event.target.parentNode.parentNode.getElementsByClassName('input-amt')[0].innerHTML

        if (currentAmountString !== ""){
            currentAmountString = currentAmountString.slice(1).replace(/,/g, "")
            var currentAmountNum = parseFloat(currentAmountString.match(NUMERIC_REGEXP))
            alert(currentAmountNum)
            updateTotalAmt(-1 * currentAmountNum)
        }
        // remove row
        table.removeChild(event.target.parentNode.parentNode);
        const allItems = document.querySelectorAll("tr");

        for (let i = 1; i < allItems.length; i++){
            allItems[i].querySelector("td").innerHTML = i
        }
        
        itemCounter--;
    }
    
}

/////////////////// Logging into table ///////////////////
function insertRowValues(event){
    if (event.keyCode === 13){
        // get value for each items in row
        var selectOption = document.getElementById("desc-dropdown")
        var inputsArray = checkAllInputsFilled(event)

        // if date or amount is not filled
        if (inputsArray == false){
            alert("Please fill out Date and Amount");
            return;
        }
        
        // Update total amount
        var inputAmt = parseFloat(inputsArray[1].value)
        updateTotalAmt(inputAmt)

        // format amount entry for negative values
        var inputAmtString = "$" + inputAmt.toLocaleString()
        if (inputAmt < 0){
            inputAmtString = "-$" + inputAmt.toLocaleString().slice(1)
        }

        // create new value and add to table
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class = "input-item">${itemCounter}</td>
            <td class = "value input-date">${inputsArray[0].value}</td>
            <td class = "value input-amt">${inputAmtString}</td>
            <td class = "value input-desc">${selectOption.value}</td>
            <td><button type = "button" class = "delete-entry">Delete</button></td>
        `;
        
        tr.removeAttribute('id')
        table.removeChild(event.target.parentNode.parentNode);
        table.appendChild(tr);


        
    }
}

function checkAllInputsFilled(event){
    var row = event.target.parentNode.parentNode
    var allInputs = row.querySelectorAll("input")

    for (let i = 0; i < allInputs.length; i++){
        if( i < allInputs.length - 1 && allInputs[i].value === ""){
            return [];
        }
    }
    

    return allInputs;
}

function updateTotalAmt(inputAmt){
    var totalAmtString = totalAmt.innerHTML
    var totalAmtNum = parseFloat(totalAmtString.match(NUMERIC_REGEXP));
    var newtotalAmtNum = totalAmtNum + inputAmt
    totalAmtString = totalAmtString.replace(NUMERIC_REGEXP, newtotalAmtNum.toFixed(2))

    totalAmt.innerHTML = totalAmtString;
}
//Events
addBtn.addEventListener("click", addRow);
table.addEventListener("click", event => deleteRow(event));
table.addEventListener("keypress", event => insertRowValues(event));