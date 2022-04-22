// let currency_left = document.querySelector('.active-currency-name-left');
// let currency_right = document.querySelector('.active-currency-name-right');
let value_left = document.querySelector('.converter-value-left');
let value_right = document.querySelector('.converter-value-right');
let currency_left_text = document.querySelector('.present-currency-left');
let currency_right_text = document.querySelector('.present-currency-right');
let converted = document.querySelectorAll('.converted');
let result = document.querySelectorAll('.result');
console.log(converted);

let calculate = (e) => {
    let currency_left = document.querySelector('.active-currency-left');
    let currency_right = document.querySelector('.active-currency-right');

    let currency_left_value = currency_left.textContent;
    let currency_right_value = currency_right.textContent;
    if (currency_left_value == currency_right_value) {
        value_right.value = value_left.value * 1;
        currency_left_text.innerHTML = `1 ${currency_left_value} = 1 ${currency_right_value}`;
        currency_right_text.innerHTML = `1 ${currency_right_value} = 1 ${currency_left_value}`;
    }
    else {
        if(e){
            fetch(`https://api.exchangerate.host/latest?base=${currency_right_value}&symbols=${currency_left_value}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let rates = data.rates[currency_left_value];
                console.log(rates);
                value_left.value = (value_right.value * rates).toFixed(4);
                // value_left.value = (value_right.value * (1 / rates)).toFixed(4);

                currency_left_text.innerHTML = `1 ${currency_left_value} = ${rates.toFixed(4)} ${currency_right_value}`;
                currency_right_text.innerHTML = `1 ${currency_right_value} = ${(1 / rates).toFixed(4)} ${currency_left_value}`;
            })
        }
        else{
            fetch(`https://api.exchangerate.host/latest?base=${currency_left_value}&symbols=${currency_right_value}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    let rates = data.rates[currency_right_value];
                    console.log(rates);
                    value_right.value = (value_left.value * rates).toFixed(4);
                    // value_left.value = (value_right.value * (1 / rates)).toFixed(4);
    
                    currency_left_text.innerHTML = `1 ${currency_left_value} = ${rates.toFixed(4)} ${currency_right_value}`;
                    currency_right_text.innerHTML = `1 ${currency_right_value} = ${(1 / rates).toFixed(4)} ${currency_left_value}`;
                })

        }
    }
    console.log(value_left.value)
}

converted.forEach(e => {
    e.addEventListener('click', () => {
        converted.forEach(data => {
            data.classList.remove("active-currency-left");
        });
        e.classList.add("active-currency-left");
        // e.classList.remove("active-currency-left");  
        // e.currentTarget.classList.add("active-currency-left");
        calculate();
    })

})
result.forEach(e => {
    e.addEventListener('click', () => {
        result.forEach(data => {
            data.classList.remove("active-currency-right");
        });
        e.classList.add("active-currency-right");
        calculate();
    })
})

let numberMask = IMask(value_left, {
    mask: Number,  
    
    scale: 4,  
    signed: false,  
    thousandsSeparator: '',  
    padFractionalZeros: false, 
    normalizeZeros: true, 
    radix: '.', 
    mapToRadix: ['.'],  
    
    min: -10000000000,
    max: 100000000000
});
let numberMask1 = IMask(value_right, {
    mask: Number,  
    
    scale: 4,  
    signed: false,  
    thousandsSeparator: '',  
    padFractionalZeros: false, 
    normalizeZeros: true, 
    radix: '.', 
    mapToRadix: ['.'],  
    
    min: -10000000000,
    max: 100000000000
});
value_left.addEventListener('keyup', (e) => {
    if (e.target.value.length >= 0) {
        calculate();
    }
});
value_right.addEventListener('keyup', (e) => {
    if (e.target.value.length >= 0) {
        calculate('test');
    }
});


