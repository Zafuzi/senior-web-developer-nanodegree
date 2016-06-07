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
  // Initialize Firebase
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
  var newDate = new Date(old_date),
  formattedDate = newDate.toUTCString();
  return formattedDate;
}

// Creates the validation methods for registration forms
function createValidator() {
  $.validator.addMethod("notEqualTo", function (value, element, param){
    var target = $(param);
    if (value) return value != target.val();
    else return this.optional(element);
  }, "Does not match");
  $.validator.addMethod("datingParadox", function (value, element, param){
    var target = $(param);
    if (value) return value > target.val();
    else return this.optional(element);
  }, "Does not match");

  $.validator.addMethod("email", function(value) {
    /**
      * Dear Rick,
      *
      * I understand that this regex invalidates emails that are actually valid,
      * and I do understand why I should change it. And I will, if need be.
      * But first I would like you to consider this, firebase requires and extension.
      * That means that if I were to allow valid emails without extensions, I would have to force
      * an extension on every user, wheras simply requiring them to supply their own extension would
      * mean less work for the database, and the user in the log run.
      *
      * I have not found any information that will allow me to add an email without an extension to firebase,
      * but if I do come across any information regarding the matter I will promptly change this code. Until then,
      * I fear it must stay.
      *
      * Sincerely,
      *
      * Morty
      */
    return (/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/).test(value);
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
  $('.create_event_form').validate({
    focusInvalid: true,
    focusCleanup: true,
    rules: {
      event_name_header: {
        required: true,
        minlength: 2
      },
      event_host: {
        required: true,
        minlength: 2
      },
      event_type: {
        required: true,
        minlength: 2
      },
      event_start_date: {
        required: true,
        minlength: 2
      },
      event_end_date: {
        required: true,
        minlength: 2,
        notEqualTo: "#event_start_date",
        datingParadox: "#event_start_date"
      },
      event_location_input: {
        required: true,
        minlength: 2
      },
      event_guests: {
        required: true,
        minlength: 2
      }
    },
    messages: {
      event_name_header: {
        required: "This field is required"
      },
      event_host: {
        required: "This field is required",
      },
      event_type: {
        required: "This field is required"
      },
      event_start_date: {
        required: "This field is required"
      },
      event_end_date: {
        required: "This field is required",
        notEqualTo: "The start and end times must not be the same.",
        datingParadox: "The end date cannot take place before the start date."
      },
      event_location_input: {
        required: "This field is required"
      },
      event_guests: {
        required: "This field is required"
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
        //TODO add real error handling (alerts)
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
          //TODO add real error handling (alerts)
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
      //TODO add real error handling (alerts)
      console.log('This email was not found in our database.');
    } else {
      console.log("Sorry, we don't know what went wrong.");
      console.log(error.code + " " + error.message);
    }
    return;
  }).then(function() {
    location.replace('events.html');
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

      var std = prettyDate(evt.start_date);
      collapse_body.append($('<span>').text('Starts'));
      collapse_body.append($('<p class="text-muted">').text(std));

      var etd = prettyDate(evt.end_date);
      collapse_body.append($('<span>').text('Ends'));
      collapse_body.append($('<p class="text-muted">').text(etd));

      var link = "<a href='http://maps.google.com/maps?q=" + encodeURIComponent(evt.event_location) + "' target='_blank'>" + evt.event_location + "</a>";

      collapse_body.append($('<span>').text('Location'));
      collapse_body.append($('<address class="address text-muted">').html(link));

      collapse_body.append($('<span>').text('Guest List'));
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
  if ($('.create_event_form').valid()) {
    writeNewEvent(event);
    location.replace('events.html');
  } else {
    //TODO add real error handling (alerts)
    console.log('invalide form');
  }
}

function writeNewEvent(event) {
  firebase.database().ref('users/' + uid + '/events').push({
    event: event
  });
}
