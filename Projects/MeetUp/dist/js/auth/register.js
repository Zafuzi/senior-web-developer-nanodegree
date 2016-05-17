$(function() {
  getRef();
});

var ref, email = '',
  password = '',
  name = '',
  optional_data = [],
  user_created = false,
  id;

function getRef() {
  ref = new Firebase("https://shindigevents.firebaseio.com");
}

function register(e, p, n, o) {
  // Set global data
  email = e, password = p, name = n, optional_data = o;
  console.log(e);
  ref.createUser({
    email: e,
    password: p,
    name: n
  }, function(error, userData) {
    if (error) {
      // handle email errors
      switch (error.code) {
        case "EMAIL_TAKEN":
          Materialize.toast('A user with this email already exists in our database.', 4000);
          break;
        case "INVALID_EMAIL":
          Materialize.toast('The specified email in not a valid email.', 4000);
          break;
        default:
          console.log("Error creating user:", error);
      }
    } else {
      // notify that the user was created and set id
      user_created = true;
      id = userData.uid;
    }
    if (user_created) {
      // add new user data to the database
      adduserdata();
      // log in the new user
      connect_email();
    }
  });
}

function login() {
  email = $('#login_email').val();
  password = $('#login_pass').val();
  if (!connect_email()) {
    Materialize.toast('Welcome back', 2000, 'success');
    // TODO fix routing to events not reloding the page.
    route('events');
  } else {
    Materialize.toast('User verification failed', 2000);
  }
}

function connect_email() {
  ref.authWithPassword({
    email: email,
    password: password
  }, function(error, authData) {
    if (error) {
      console.log(error);
      return false;
    } else {
      id = authData.uid;
      return true;
    }
  });
}

//adds users data to the data base for persistent storage
function adduserdata() {
  var usersRef = ref.child("users/");
  var cref = usersRef.child(id);
  cref.set({
    first_name: name,
    email_address: email,
    employer: optional_data[0],
    jobTitle: optional_data[1],
    birthday: optional_data[2]
  });
  Materialize.toast("User successfully created", 2000);
  route('events');
}
// TODO Make sure that users get logged in as anonymous if they go to the events page without being logged in

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
