var ref;
$(function() {
  ref = new Firebase("https://shindigevents.firebaseio.com");
  attachButtonListeners();
});

//adds the listeners for sign in buttons
function attachButtonListeners() {
  $('#facebook').click(function() {
    connect('facebook');
  });
  $('#twitter').click(function() {
    connect('twitter');
  });
  $('#google').click(function() {
    connect('google');
  });
  $('#email_auth').click(function() {
    connect('email');
  });
}

//REVIEW make sure that all criteria are met
function connect_email(e, p) {
  ref.authWithPassword({
    email: e,
    password: p
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

//TODO create a new user for OAuth sign ins
function connect(type) {
  ref.authWithOAuthPopup(type, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

/* Creates a new user in the data base using email authentication
 * REVIEW see if this and OAuth can be combined into one method.
 * NOTE May need to change the params, and the method that calls this in register_email.js
 */
function newUser(email, pass, name, options) {
  var e = email;
  var p = pass;
  var n = name;
  var o = options;
  var usercreated = false;
  var id;
  ref.createUser({
    email: e, //email var here
    password: p, //pass var here
    name: n,
  }, function(error, userData) {
    if (error) {
      switch (error.code) {
        case "EMAIL_TAKEN":
          console.log("The new user account cannot be created because the email is already in use.");
          break;
        case "INVALID_EMAIL":
          console.log("The specified email is not a valid email.");
          break;
        default:
          console.log("Error creating user:", error);
      }
    } else {
      usercreated = true;
      id = userData.uid;
    }
    if (usercreated) {
      connect_email(e, p);
      adduserdata(n, e, id);
    } else {
      console.log("For some reason this user was not created.");
    }
  });
}

//adds users data to the data base for persistent storage
function adduserdata(n, e, id) {
  var usersRef = ref.child("users/");
  var cref = usersRef.child(id);
  cref.set({
    first_name: n,
    email_address: e
  });
  alert("User successfully created");
  window.location.href = "../html/events.html";
}

// Used only for creating events without an account, no persistent data.
function anonymous() {
  ref.authAnonymously(function(error, authData) {
    if (error) {
      alert("Login Failed!", error);
    } else {
      alert('You are now logged in as an anonymous user');
    }
  });
}
