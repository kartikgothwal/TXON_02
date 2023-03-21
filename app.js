// DOM ELEMENTS
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");

const display = document.querySelector(".display");

const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percent = document.querySelector(".percent");
const divide = document.querySelector(".divide");
const multiply = document.querySelector(".multiply");
const addition = document.querySelector(".addition");
const subtract = document.querySelector(".subtract");
const equalEl = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const number0 = document.querySelector(".number0");
const number1 = document.querySelector(".number1");
const number2 = document.querySelector(".number2");
const number3 = document.querySelector(".number3");
const number4 = document.querySelector(".number4");
const number5 = document.querySelector(".number5");
const number6 = document.querySelector(".number6");
const number7 = document.querySelector(".number7");
const number8 = document.querySelector(".number8");
const number9 = document.querySelector(".number9");

const numberelementArr = [number0, number1, number2, number3, number4, number5, number6, number7, number8, number9];

let ValueStrInMemory = null;
let operatorInMemory = null;


const getvalueAsStr = () => display.textContent.split(',').join("");

const getvalueAsNum = () => { return parseFloat(getvalueAsStr()); }


const getResultOfOperationAsStr =()=>{
    let currentdisplayEleAsNum = getvalueAsNum();
    let NewNumAfterOperation;
    let ValNumInMemory =  parseFloat(ValueStrInMemory);

    if (operatorInMemory === "addition") {
        NewNumAfterOperation = ValNumInMemory + currentdisplayEleAsNum;

    };
    if (operatorInMemory === "multiply") {
        NewNumAfterOperation = ValNumInMemory  * currentdisplayEleAsNum;

    };
    if (operatorInMemory === "divide") {
        NewNumAfterOperation = ValNumInMemory / currentdisplayEleAsNum;

    };
    if (operatorInMemory === "subtract") {
        NewNumAfterOperation = ValNumInMemory - currentdisplayEleAsNum;

    };
    return NewNumAfterOperation.toString();
}

const setStrAsValue = (ValNum) => {

    if (ValNum[ValNum.length - 1] === ".") {
        display.textContent += ".";
        return;
    }

    const [wholeNum, DecimalNum] = ValNum.split('.');
    if (DecimalNum) {
        display.textContent = parseFloat(wholeNum).toLocaleString() + '.' + DecimalNum;
    } else {
        display.textContent = parseFloat(wholeNum).toLocaleString();
    }
}


const handlenumclick = (Numstr) => {
    let currentdisplayELE = getvalueAsStr();
    if (currentdisplayELE === "0") {
        setStrAsValue(Numstr);
    }
    else {
        setStrAsValue(currentdisplayELE + Numstr);
    }
}

const handleOperatorClick = (operator) => {
    let currentdisplayEleAsStr = getvalueAsStr();
    
    if (!ValueStrInMemory) {
        ValueStrInMemory = currentdisplayEleAsStr;
        operatorInMemory = operator;
        setStrAsValue('0');
        return;
    }
   

    ValueStrInMemory = getResultOfOperationAsStr() ;
     
    
    operatorInMemory = operator;
    setStrAsValue('0');

}

// ADD Eventlisteners for Numbers
for (let i = 0; i < numberelementArr.length; i++) {
    const numberelement = numberelementArr[i];
    numberelement.addEventListener("click", () => {
        handlenumclick(i.toString());
    });
}

// Event listner for the functions 
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    operatorInMemory = null;
    ValueInMemory = null;
});

pmEl.addEventListener('click', () => {
    const CurrDisplayElementAsStr = getvalueAsStr();
    const CurrDisplayElementAsNum = getvalueAsNum();

    if (CurrDisplayElementAsStr === "-0") {
        setStrAsValue('0');
        return;
    }
    if (CurrDisplayElementAsNum >= 0) {
        setStrAsValue("-" + CurrDisplayElementAsStr);
    } else {
        setStrAsValue(CurrDisplayElementAsStr.substring(1));
    }
    
});
percent.addEventListener('click', () => {
    const currentdisplayELE = getvalueAsNum();
    const NewELE = currentdisplayELE / 100;
    setStrAsValue(NewELE.toString());
    operatorInMemory = null;
    ValueInMemory = null;
});
decimal.addEventListener("click", () => {
    let currentdisplayELE = getvalueAsStr();
    if (!currentdisplayELE.includes('.')) {
        setStrAsValue(currentdisplayELE + ".");
    }
});

// Event listeners for operators 
divide.addEventListener('click', () => {
    handleOperatorClick('divide');

});
multiply.addEventListener('click', () => {
    handleOperatorClick('multiply');

});
addition.addEventListener('click', () => {
    handleOperatorClick('addition');

});
subtract.addEventListener('click', () => {
    handleOperatorClick('subtract');

});
equalEl.addEventListener('click',()=>{
    if(ValueStrInMemory){
        setStrAsValue(getResultOfOperationAsStr());
        ValueStrInMemory = null;
        operatorInMemory = null;
    }
})
const findingTheNumberOfDigits =()=>{
    let currentdisplayELE = getvalueAsStr();
    if(currentdisplayELE.length > 8){
        display.style.fontSize = "70px";
    }
     
}
setInterval(findingTheNumberOfDigits,1000);


// Updating time
const updatetime = () => {
    let time = new Date();
    const currenthour = time.getHours();
    const currentminute = time.getMinutes();
    hours.innerHTML = currenthour.toString();
    minutes.innerHTML = currentminute.toString().padStart(2, "0");
};
setInterval(updatetime, 1000);
updatetime();
