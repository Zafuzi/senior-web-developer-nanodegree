var view;
$(function() {
  if (supportsTemplate()) {
    structure();
    window.onload = function() {
        if (view != undefined) {
          route(view);
        } else {
          landing_page();
        }
        $(".button-collapse").sideNav();
      }
      //adds the listener to render templates on history navigation
    window.addEventListener("popstate", function(e) {
      // URL location
      var pathArray = window.location.pathname.split('/');
      var uniqueLocations = [];
      $.each(pathArray, function(i, el) {
        if ($.inArray(el, uniqueLocations) === -1) uniqueLocations.push(el);
      });
      var location = uniqueLocations[pathArray.length - 1];
      view = location;
      if (view != undefined) {
        route(view);
      } else {
        landing_page();
      }
    });
  } else {
    console.log("not good");
  }
});

//Creates navbar and main template_container
function structure() {
  var structure = [templates.nav, templates.main];
  for (template in structure) {
    var temp = document.importNode(structure[template].content, true);
    $('body').append(temp);
  }
}

//home page for the entire application
function landing_page() {
  loadImage(templates.landing_page.content.querySelector('img'), 'images/group_003.jpg');
  $('#template_container').append(document.importNode(templates.landing_page.content, true));
}

//access to registration/login page
function register() {
  // get firebase and then once it is loaded, add content to page.
  var jqDeferred = $.getScript('https://cdn.firebase.com/js/client/2.2.1/firebase.js');
  jqDeferred.then(function() {
    AddScript('js/auth/register.js');
    $('#template_container').append(document.importNode(templates.register.content, true));
  }, function(err) {
    console.log(err);
  });
}

function email_registration() {
  // get jqueryui and then once it is loaded, add content to page.
  var jqDeferred = $.getScript('https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js');
  jqDeferred.then(function() {
    AddScript('js/auth/register_email.js');
    $('#template_container').append(document.importNode(templates.manual_registration.content, true));
  }, function(err) {
    console.log(err);
  });
}

function AddScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
  document.body.removeChild(document.body.lastChild);
};

function loadImage(object, url) {
  object.src = url;
  $(object).load(function() {
    console.log('loaded');
  });
}
//make events template
function events() {
  //TODO get events from database
  var events = 4;
  var content = templates.events.content;
  var new_event_button = templates.new_event_button.content;
  $('#template_container').append(document.importNode(content, true));
  $('#template_container').append(document.importNode(new_event_button, true));
}

function new_event_form() {
  var content = templates.new_event_form.content;
  $('#template_container').append(document.importNode(content, true));
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
}

var templates = {
  nav: document.querySelector('#nav_template'),
  main: document.querySelector('#main_template'),
  landing_page: document.querySelector('#landing_template'),
  register: document.querySelector('#register_template'),
  events: document.querySelector('#events_template'),
  new_event_button: document.querySelector('#new_event_button'),
  manual_registration: document.querySelector('#manual_registration'),
  new_event_form: document.querySelector('#new_event_form')
}

function supportsTemplate() {
  return 'content' in document.createElement('template');
}

function route(template_name) {
  $('#template_container').html('');
  $('#template_container').hide(0);
  history.pushState(view, template_name, template_name);
  switch (template_name) {
    case 'events':
      events();
      $('#template_container').show(500);
      break;
    case 'manual_registration':
      email_registration();
      $('#template_container').show(500);
      break;
    case 'register':
      register();
      $('#template_container').show(500);
      break;
    case 'landing_page':
      landing_page();
      $('#template_container').show(500);
      break;
    case 'structure':
      structure();
      $('#template_container').show(500);
      break;
    case 'new_event_form':
      new_event_form();
      $('#template_container').show(500);
      break;
    default:
      structure();
      break;
  }
}
