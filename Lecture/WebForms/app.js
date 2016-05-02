/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');

var cARR = ["!", "@", "#", "$", "%", "^", "&", "*"];

submit.onclick = function () {
  valour(firstPasswordInput, secondPasswordInput);
};

function containsChar(str, i) {
  var retINT = 0;
  var newChar = cARR[i];
  retINT = str.search(newChar);
  return retINT;
}

function valour(input1, input2){
  input1.value = "hello hello hello hello";
  input2.value = "hello hello hello hello";

  var pass1 = input1.value;
  var pass2 = input2.value;

  if(pass1.length < 16){
    input1.setCustomValidity("16 characters");
  }else{
    if(pass1.length > 100){
      input1.setCustomValidity("100 characters");
    }else{
      if(input1.value != input2.value){
        input1.setCustomValidity("match");
      }else{
        var hasCHAR = 0;
        for(var i = 0; i < cARR.length; i++){
          if(containsChar(pass1, i)){
            hasCHAR = 1;
            return;
          }
        }
        if(hasCHAR < 0){
          input1.setCustomValidity("symbol");
          return;
        }else{
          input1.setCustomValidity("Valid");
          return;
        }
      }
    }
  }
}
