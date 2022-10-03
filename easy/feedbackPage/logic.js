

var value = "";
var globalChoice ="0";
function changeVal(choice) {
    if (choice == '1') {
        value = '1';
    } else if (choice == '2'){
        value ='2';
    }
    else if (choice == '3'){
        value ='3';
    }
    else if (choice == '4'){
        value ='4';
    }
    else if (choice == '5'){
        value ='5';
    }
console.log(value);
   globalChoice = choice;
   var property = document.getElementById(num);
  
       property.style.backgroundColor = "#FFFFFF"
}

const btn = document.getElementById('btn');

btn.addEventListener('click', function onClick(event) {
// 👇️ change background color
document.body.innerHTML=` <br>You selected ${globalChoice} out of 5 <br>Thank you!<br> We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!
<br> Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
Coded by <a href="#">Kashish Verma</a>.`;

// 👇️ optionally change text color
// document.body.style.color = 'white';
});