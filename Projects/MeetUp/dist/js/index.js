var submit = $("#submit");

$(function(){
  Materialize.updateTextFields();
});

submit.onClick = function(){
  console.log("Clicked!");
}
