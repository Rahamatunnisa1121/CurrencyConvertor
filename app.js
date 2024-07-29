const baseURL="https://v6.exchangerate-api.com/v6/8b49bb1d8b3a1dcb8c046005/pair";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".From select");
const toCurr=document.querySelector(".To select");
let msg=document.querySelector(".msg");

const updateExchangeRate= async ()=>{
    let amount = document.querySelector(".amount input"); //input statement
    let amntValue=amount.value;
    if(amntValue==="" || amntValue<1)
    {
        amntValue=1;
        amount.value="1";
    }
    const URL=`${baseURL}/${fromCurr.value}/${toCurr.value}`;
    let response =await fetch(URL);
    let data=await response.json();
    let rate=data.conversion_rate;
    let finalAmount=rate*amntValue;
    msg.innerText=`${amntValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

for(let select of dropdown)//accessing value
{
    for(let currCode in countryList)//accessing key
    {
        let option=document.createElement("option");
        option.innerText=currCode;
        option.value=currCode;
        select.append(option);
        //selecting the default flag
        if(select.name==="From" && currCode==="USD")
        {
            option.selected=true;
        }
        else if(select.name==="To" && currCode==="INR")
        {
            option.selected=true;
        }
    }
};

for(let select of dropdown)//adding event listeners (of change) to both the selects.
{
    select.addEventListener("change",(evt)=>{ //event obj
        updateFlag(evt.target); //the target(select) on which event occured
    });
};

const updateFlag=(element /*select*/)=>{
    let currCode=element.value; //new option selected is the currcode
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});