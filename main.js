const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const num = document.getElementById("num");
const ans = document.getElementById("ans");
const message = document.getElementById("message");
const host = 'api.frankfurter.app';


fetch(`https://${host}/currencies`)
.then(resp => resp.json())
.then((data) => {
    display(data);
});

function display(data) {
    const entries = Object.entries(data);

    for(var i = 0; i<entries.length; i++){
        select[0].innerHTML += `<option value = "${entries[i][0]}">${entries[i][0]}</option>`
        select[1].innerHTML += `<option value = "${entries[i][0]}">${entries[i][0]}</option>`
    }
}

btn.addEventListener("click", () => {
    let firstCurrency = select[0].value;
    let secondCurrency = select[1].value;
    let firstValue = num.value;

    if(firstCurrency != secondCurrency) {
        message.style.display = "none";
        convert(firstCurrency,secondCurrency,firstValue);
    } else {
        message.style.display = "block";
    }
});

function convert(firstCurrency,secondCurrency,firstValue){
    fetch(`https://${host}/latest?amount=${firstValue}&from=${firstCurrency}&to=${secondCurrency}`)
    .then(resp => resp.json())
    .then((data) => {
        ans.value = Object.values(data.rates)[0];
    });
}