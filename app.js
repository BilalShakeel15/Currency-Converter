const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  const api="https://v6.exchangerate-api.com/v6/02fa2d21578135450c930735/latest/USD";

  const dropdowns = document.querySelectorAll(".choose select");
  let btn=document.querySelector(".btn");
  let msg=document.querySelector(".convert");
  const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let tex=document.querySelector(".text");



const updaterate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    

    let response = await fetch(api);
    let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];
    let fromExchangeRate = data.conversion_rates[fromCurr.value];
    let toExchangeRate = data.conversion_rates[toCurr.value];
    const convertedAmount = (amtVal / fromExchangeRate) * toExchangeRate;
    // let finalAmount = amtVal * rate;
    // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    tex.style.display="block";
    msg.innerText= `${amtVal}${fromCurr.value}=${convertedAmount} ${toCurr.value}`;
  };


for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "PKR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updaterate();
  });
