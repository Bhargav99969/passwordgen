const inputSlider = document.querySelector('.slider');
const lenght = document.querySelector("[data-Lenght]");
const display = document.querySelector("[data-passwordDisplay]");
const copy = document.querySelector("[data-copyMsg]");
const upper  = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const gen = document.querySelector('.generate');
const copybutton = document.querySelector("[data-copybutton]");
const checkbox = document.querySelectorAll("input[type=checkbox]");  
let smb = "!@##$%^#*<.,;/'][`~]))_+|?>";



let password ="";
let passwordlength = 10 ;
let checkCount = 0 ;

handleSlider();
setidicator("#ccc");


function handleSlider(){
    inputSlider.value = passwordlength;
    lenght.innerText = passwordlength;

}

function setidicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "0 0 20px" ;
}

function getRandomint(min ,max){
    return Math.floor(Math.random() * (max - min)) + min;


}

function getint(){

    return getRandomint(0,9);

}
function uppercase(){
    return String.fromCharCode(getRandomint(97,123));
}
function lowercase(){
    return String.fromCharCode(getRandomint(65,91));
}

function symbs(){
    return smb.charAt(getRandomint(0,smb.length));

}

function strength(){
    let upp = false;
    let low = false;
    let numb =false;
    let symb= false;
   if(upper.checked) upp = true;
   if(lower.checked) low=true;
   if(number.checked) numb=true;
   if(symbol.checked) symb = true;

   if(upp && low &&(numb||symb) &&passwordlength>=8){
    setidicator("#0f0");
   }
   else if((upp || low) && (numb||symb) && passwordlength>=4){
    setidicator("#ff0");

   }
   else{
    setidicator("#f00");
   }

}

function shufflepass(array){
    for(let i = array.lenght-1 ;i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]= array[j];
        array[j]= temp;
    }
     let str = "";
     array.forEach((el)=>{str+=el});
     return str;
}


async function copycontent(){
    try{
    await navigator.clipboard.writeText(display.value);
    copy.innerText="copied";
    }
    catch(e){
        copy.innerText="failed";
   
    }

    copy.classList.add("active");

    setTimeout( ()=>{
        copy.classList.remove("active");
    },2000 );

}


inputSlider.addEventListener('input',(e)=>{
    passwordlength =e.target.value;
    handleSlider();
} )

copybutton.addEventListener('click' , ()=>{
    if(display.value)
        copycontent();
})

function handlecheck(){
    checkCount=0;
    checkbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    }
);

if(passwordlength<checkCount){
    passwordlength=checkCount;
    handleSlider();

}

}

checkbox.forEach ((checkbox)=>{
    checkbox.addEventListener('change' ,handlecheck)
      
})

gen.addEventListener('click',()=>{
    console.log("heyy");


     if(checkCount==0){
        return;
     }

     else if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleSlider();
     }

     //password genration

     console.log("starting the journey");
        
     
     password="";


        let funcArr =[];

        if(upper.checked)
            funcArr.push(uppercase);
    
        if(lower.checked)
            funcArr.push(lowercase);
    
        if(number.checked)
            funcArr.push(getint);
    
        if(symbol.checked)
            funcArr.push(symbs);
        
    
     for(let i =0; i<funcArr.length; i++){
       
         password +=funcArr[i]();
        
     }
//remaining adddition
            for(let i=0; i<passwordlength-funcArr.length; i++) {
            let randIndex = getRandomint(0 , funcArr.length);
            console.log("randIndex" + randIndex);
            password += funcArr[randIndex]();
             }
        console.log("ohasdiu");

    password = shufflepass(Array.from(password));
    console.log("agasg");

    //show password
    display.value= password;
    //strenght
    strength();

})

