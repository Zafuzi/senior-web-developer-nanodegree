var database, birthday, isAuth, startDate, endDate, uid, username;

document.addEventListener('DOMContentLoaded', function() {
  init();
}, false);
window.onload = function() {
  $.getScript('https://ajax.aspnetcdn.com/ajax/jquery.validate/1.12.0/jquery.validate.js').then(function() {
    addEventHandlers();
    createValidator();
  });
};

function init() {
  // Initialize Firebase and bootstrap js
  //var bootstrap = $.getScript('dist/js/bootstrap.min.js');
  var fbs = $.getScript('https://www.gstatic.com/firebasejs/live/3.0/firebase.js');
  fbs.then(function() {
    var config = {
      apiKey: "AIzaSyBjbc5fbEm8EFhOSBwWQUJMod-g8g5Yjdc",
      authDomain: "shindig-91a8e.firebaseapp.com",
      databaseURL: "https://shindig-91a8e.firebaseio.com",
      storageBucket: ""
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        uid = user.uid;
        firebase.database().ref('users/' + user.uid).on('value', function(snapshot) {
          username = snapshot.val().displayName;
          $('#event_host').attr('value', username);
        });
        document.cookie="true";
        getEvents();
      } else {
        document.cookie="false";
        console.log("Not currently logged in");
      }
    });
    database = firebase.database();
  });
}
// function for dynamically loading js scripts before jquery loads
function AddScript(url, type) {
  var script = document.createElement("script");
  script.type = "text/" + type;
  script.src = url;
  document.body.appendChild(script);
  document.body.removeChild(document.body.lastChild);
}

function addEventHandlers() {
  $('#login_button').click(function() {
    login();
  });
  $('.logout_button').click(function() {
    logout();
  });
  $('#register_submit').click(function() {
    register();
  });
  $('#collapse_toggle').click(function() {
    $('.collapse').slideToggle(500);
  });
  $('#new_event').click(function() {
    location.replace("create_event.html");
  });
  $('#register_birthday').change(function() {
    birthday = $(register_birthday).val();
  });
  $('#event_start_date').change(function() {
    startDate = $(event_start_date).val();
  });
  $('#event_end_date').change(function() {
    endDate = $(event_end_date).val();
  });
  $('#create_event_submit_button').click(function() {
    createEvent();
  });
  $('#event_type li').on('click', function() {
    $('#event_type_span').text($(this).text());
  });
}
// Make the dates conform!

function prettyDate(old_date) {
  var formattedDate = new Date(old_date);
  var day = formattedDate.getDay();
  var date = formattedDate.getDate();
  var mon = formattedDate.getMonth();
  var year = formattedDate.getFullYear();
  var hours = formattedDate.getHours();
  var minutes = formattedDate.getMinutes();
  var dd = "AM";
  if (hours >= 12) {
    hours -= 12;
    dd = "PM";
  }
  if (hours === 0) {
    hours = 12;
  }
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var returnDate = (weekday[day] + ", " + month[mon] + " " + date + " " + year + " - " + hours + ":" + minutes + " " + dd);
  return returnDate;
}
// Creates the validation methods for registration forms

function createValidator() {
  $.validator.addMethod("email", function(value) {
    return (/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i).test(value);
  });
  $.validator.addMethod("pwcheckupper", function(value) {
    return (/[A-Z]/).test(value); // has an uppercase letter
  });
  $.validator.addMethod("pwcheckspecial", function(value) {
    return (/[!@#$%^&*-]/).test(value); // contains a special character
  });
  $.validator.addMethod("pwchecklower", function(value) {
    return (/[a-z]/).test(value); // has a lowercase letter
  });
  $.validator.addMethod("pwcheckdigit", function(value) {
    return (/\d{2}/).test(value); // has two digits
  });
  //Add event handler for from validation
  $('#register_form').validate({
    focusInvalid: true,
    focusCleanup: true,
    rules: {
      fname: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      password_one: {
        required: true,
        pwcheckupper: true,
        pwcheckspecial: true,
        pwchecklower: true,
        pwcheckdigit: true,
        minlength: 8,
        maxlength: 100,
      },
      password_two: {
        equalTo: "#register_password",
      }
    },
    messages: {
      password_one: {
        required: "This field is required",
        pwcheckupper: "Password must contain at least one uppercase letter",
        pwcheckspecial: "Password must contain at least one special character",
        pwchecklower: "Password must contain at least one lowercase letter",
        pwcheckdigit: "Password must contain at least two numerical values (0-9)",
        minlength: "your password must contain at least 8 characters",
        maxlength: "your password cannot contain more than 100 characters"
      },
      password_two: {
        required: "This field is required",
        equalTo: "the passwords do not match"
      }
    }
  });
}

function register() {
  var name = $('#register_name').val(),
    email = $('#register_email').val(),
    pass1 = $('#register_password').val(),
    pass2 = $('#register_password_2').val(),
    options = {
      employer: $('#register_employer').val(),
      jobtitle: $('#register_job_title').val(),
      birthday: birthday
    },
    password, register_user;

  if ($('#register_form').valid()) {
    password = pass1;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        console.log(error.message);
      } else if (errorCode == 'auth/email-already-in-use') {
        console.log(error.message);
      } else {
        console.error(error);
      }
    }).then(function(e) {
      register_user = new User(e.uid, name, e.email, password, options);
      writeUserData(register_user);
      firebase.auth().signInWithEmailAndPassword(e.email, password)
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/user-not-found") {
          alert('This email was not found in our database.');
        } else {
          console.log(error.code + " " + error.message);
        }
        return;
      });
    });
    location.replace('events.html');
  }
}

function login(email, password) {
  if (email === null || password !== null) {
    email = $('#login_email').val();
    password = $('#login_password').val();
  }
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == "auth/user-not-found") {
      console.log('This email was not found in our database.');
    } else {
      console.log("Sorry, we don't know what went wrong.");
      console.log(error.code + " " + error.message);
    }
    return;
  }).then(function() {
    location.replace('index.html');
  });
}

function logout() {
  firebase.auth().signOut();
  location.replace('index.html');
}

function User(id, name, email, password, options) {
  this.id = id;
  this.email = email;
  this.name = name;
  this.password = password;
  this.info = options;
}

function writeUserData(register_user) {
  firebase.database().ref('users/' + register_user.id).set({
    displayName: register_user.name,
    email: register_user.email,
    info: register_user.info,
  });
}

function getEvents() {
  firebase.database().ref('users/' + uid + '/events').once('value', function(snapshot) {
    if(snapshot.val()){
      console.log(true);
    }else{
      console.log(false);
    }
    for (var snap in snapshot.val()) {
      var evt = snapshot.val()[snap].event;
      var event_container = $('<div class="six columns">');
      var main_event = $('<div class="container card">');
      var event_content = $('<div class="row">');
      var event_type = $('<span class="text-muted">').text(" - " + evt.event_type);
      event_content.append($('<h4 class="text-left">').text(evt.event_name_header + " ").append(event_type));
      event_content.append($('<strong class="text-left">').text("Hosted by " + evt.event_host));
      event_content.append($('<p class="lead">').text(evt.event_message));

      var event_action = $('<div class="row">');
      var collapse_container = $('<div>');
      var collapse_body = $('<div class="collapse text-left">').attr('id', evt.collapse_id);

      var std = prettyDate(true, evt.start_date);
      collapse_body.append($('<label>').text('Starts'));
      collapse_body.append($('<p class="text-muted">').text(std));

      var etd = prettyDate(true, evt.end_date);
      collapse_body.append($('<label>').text('Ends'));
      collapse_body.append($('<p class="text-muted">').text(etd));

      var link = "<a href='http://maps.google.com/maps?q=" + encodeURIComponent(evt.event_location) + "' target='_blank'>" + evt.event_location + "</a>";

      collapse_body.append($('<label>').text('Location'));
      collapse_body.append($('<address class="address text-muted">').html(link));

      collapse_body.append($('<label>').text('Guest List'));
      var guest_list = $('<ul class="">');
      var list = evt.event_guests.split(',');
      for (var guest in list) {
        guest_list.append($('<li>').text(list[guest]));
      }
      collapse_body.append(guest_list);

      var collapse_button = $('<a class="button button-primary collapse_toggle">')
      .attr("onclick", "$('#" + evt.collapse_id + "').slideToggle(500);").text('Read More');
      event_action.append(collapse_container.append(collapse_button, collapse_body));
      main_event.append(event_content);
      main_event.append(event_action);
      event_container.append(main_event);

      $('#events_container').prepend(event_container);
    }
  });
}

function createEvent() {
  var random = (Math.random() + "").split(".")[1];
  var event = {
    event_name_header: $('#event_name_header').val(),
    event_type: $('#event_type').val(),
    event_host: $('#event_host').val(),
    start_date: $('#event_start_date').val(),
    end_date: $('#event_end_date').val(),
    event_location: $('#event_location_input').val(),
    event_guests: $('#event_guests').val(),
    event_message: $('#event_message').val(),
    collapse_id: "event_" + random
  };

  var isValid = false,
    keyTracker;
  for (var key in event) {
    if (event[key].length < 1) {
      isValid = false;
      keyTracker = key;
      break;
    } else {
      isValid = true;
    }
  }
  var sd = new Date(event.start_date), ed = new Date(event.end_date);
  // TODO fix datetime compare method
  // if (sd.getTime() == ed.getTime()) {
  //   isValid = false;
  //   console.log(event.start_date);
  // }
  if (isValid) {
    writeNewEvent(event);
    location.replace('events.html');
  } else {
    var elem = $('#' + keyTracker)[0];
    console.log(elem);
    console.log(event[keyTracker]);
  }
}

function writeNewEvent(event) {
  firebase.database().ref('users/' + uid + '/events').push({
    event: event
  });
}
