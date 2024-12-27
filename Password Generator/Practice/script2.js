// slider and its length code
const sliderDisplay = document.querySelector("[data-displaySlider]");
const sliderLength = document.querySelector("[data-sliderLength]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const circle = document.querySelector("[circleStre]");
let passDisp = document.querySelector("#passDisp");
const copyMsg = document.querySelector("[data-copyMsg]");
const copyIcon = document.querySelector("#copyIcon");
const genBtn = document.querySelector("#genBtn2");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let checkCount = 0;
let password = "";
let passwordLen = sliderLength.value;
const symbols = '~`!@#$%^&*()_-+={[}]|\:;"<,>.?/';

function sliderDisp(){
    sliderLength.innerText = sliderDisplay.value;
    passwordLen = sliderLength.value;
}

function checkHandle(){ // to handle count of check , count on each input on checkboxes by eventHandling
    checkCount = 0;
    if(uppercaseCheck.checked) checkCount++;
    if(lowercaseCheck.checked) checkCount++;
    if(numbersCheck.checked) checkCount++;
    if(symbolsCheck.checked) checkCount++;

    // alt 
    // allCheckBox.forEach( (checkbox) => {
    //     if(checkbox.checked)
    //         checkCount++;
    // })

    if(passwordLen < checkCount) {
        passwordLen = checkCount;
        sliderDisplay.value = checkCount;
        sliderDisp();
    }
    return checkCount;
}

// function to return random integer to help in generating random values
function ranInt(min , max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function genUpper(){
    return String.fromCharCode(ranInt(65,91));// upperCase is excluded
}

function genLower(){
    return String.fromCharCode(ranInt(97,123));
}

function genInt(){
    return ranInt(0,10);
}

function genSym(){
    return symbols.charAt(ranInt(0,symbols.length));
}

function strengthCal(){
    checkHandle();

    // if(checkCount >= 3 && sliderLength >= 8) circle.style.color = "fff";
    // else if( sliderLength > 5) circle.style.color = "777";
    // else circle.style.color = "000";
}

async function copyPass(){
    // console.log("Password is copying");
    if(!passDisp.value) return;
    try {
        await navigator.clipboard.writeText(passDisp.value);
        copyMsg.innerText = "copied";

    } catch (e) {
        copyMsg.innerText = "failed";
    }

    // to make span visible
    copyMsg.classList.add("active");// active class need to be built which make visible span
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 5000);
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

function generatePassword(){
    if(!checkCount) return;

    password = "";

    if(passwordLen < checkCount) {
        passwordLen = checkCount;
        sliderDisplay.value = checkCount;
        sliderDisp();
    }


    let arrFunc = [];
    
    if(uppercaseCheck.checked) arrFunc.push(genUpper);
    if(lowercaseCheck.checked) arrFunc.push(genLower);
    if(numbersCheck.checked) arrFunc.push(genInt);
    if(symbolsCheck.checked) arrFunc.push(genSym);

    // generating compulsory
    for(let i = 0 ; i < arrFunc.length ; i++){
        password += arrFunc[i]();
    }

    let total = sliderLength.innerText;
    // console.log(total);
    // remaining symbol
    for(let i = 0 ; i < total  - checkCount ; i++){
        // console.log("hello");
        let temp = ranInt(0,arrFunc.length);
        // console.log(temp);
        password += arrFunc[temp]();
    }

    // shuffle of passowrd
    password = shufflePassword(Array.from(password));// sending in array form to shuffle

    // display
    passDisp.value = password;

    // strength calculation
    strengthCal();

}


// EVENT LISTNERS
copyIcon.addEventListener('click' , copyPass);

genBtn.addEventListener('click' , generatePassword);

allCheckBox.forEach( (checkBox) => {
    checkBox.addEventListener('change' , checkHandle);
} );

sliderDisplay.addEventListener('input' , (e) => {
    passwordLen = e.target.value;
    sliderDisp();
})



// I made it whole mostly on my on , take help in adding event listener.