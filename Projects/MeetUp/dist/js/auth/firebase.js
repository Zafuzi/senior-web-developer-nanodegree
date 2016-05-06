$(function(){
  attachButtonListeners();
});
function attachButtonListeners(){
  $('facebook').click(connect("facebook"));
  $('twitter').click(connect("twitter"));
  $('google').click(connect("google"));
}
function connect(type){
  var ref = new Firebase("https://shindig.firebaseio.com");
  ref.authWithOAuthPopup(type, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}
