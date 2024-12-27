const inputSlider = document.querySelector("[data-lengthSlider]"); // syntax of using custom attribute 
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]"); // imp
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
//! write way is write html code , write js code , give custom id to element as use com , and fetch above in js code.

let password = "";
let passwordLength = 10;
let checkCount = 0;
// set strength circle color to grey

// function to make
// copy content
// handle slider 
// generate password
// set indicator to bring color
// getRandomInteger(min , max )
// get randomuppercase
// get randomlowercase
//getRandomNumber
// getRandomSymbol
// calculate strength


handleSlider();
// set password length as per slider
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    // other thing
}

// set color and strength
function setIndicator(color){
    indicator.style.backgroundColor = color;
    // shadow
}

function getRndInteger(min , max){
    return Math.floor( Math.random() * (max - min) ) + min ; // 0 -   max - min tk dega after adding min --> min - max hogya , floor se roundof kiya.
}

function generateNumber(){
    return getRndInteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){// make array of diff symbol generate random index get value 
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}


function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;// by checked keyword we are checking that is checkboard is checked
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0"); // calling a function to set the color
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
  }

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value); // it returns the promise
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }

    // to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array){
    // Fisher Yates Method
    for(let i = array.length - 1 ; i > 0 ; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach( (el) => (str+=el));
    return str;

}

function handleCheckBoxChange(){
    checkCount = 0; 
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    })

    // specail condition
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox)=> { // on every checkboa applying event listener
    checkbox.addEventListener('change' , handleCheckBoxChange);
})

// event listener on slider , slider ke input me change hone pr passwordki length change hogi , slider ki value 1 - 20 tk revolve hogi. 
inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
});

// copybtn
copyBtn.addEventListener('click' , () => {
    if(passwordDisplay.value)
        copyContent(); // alt if password ki length is greater than 0 then we could copy
});

generateBtn.addEventListener('click' , () => {
    // console.log("Clicked on btn");
    // none of the checkbox are selected
    if(checkCount == 0) return ;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // lets start the journey to find new password

    // remove the old password
    password = "";

    // lets put the stuff mentioned by  checkbox

    // if(uppercaseCheck.checked){
    //     password += generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowercase();
    // }
    // if(numbersCheck.checked){
    //     password += generateNumber();
    // }
    // if symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked) funcArr.push(generateUppercase);
    if(lowercaseCheck.checked) funcArr.push(generateLowercase);
    if(numbersCheck.checked) funcArr.push(generateNumber);
    if (symbolsCheck.checked) funcArr.push(generateSymbol);

    // console.log("Before Compulsory addition");
    // compulsory addition 
    for(let i = 0 ; i < funcArr.length; i++){
        password += funcArr[i]();
    }

    // remaining addition
    for(let i = 0 ; i < passwordLength - funcArr.length ; i++){
        let randIndex = getRndInteger( 0 , funcArr.length);
        password += funcArr[randIndex]();
    }

    // shuffling the password
    password = shufflePassword(Array.from(password));

    // show in UI
    passwordDisplay.value = password;

    // strength
    calcStrength();

});