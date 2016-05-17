var view, source, template, context, html, ref;
$(function() {
  //get firebase reference
  var firebase = $.getScript('https://cdn.firebase.com/js/client/2.2.1/firebase.js');
  firebase.then(function() {
    ref = new Firebase("https://shindigevents.firebaseio.com");
    init();
  }, function(err) {
    console.log(err);
  });
});

function init() {
  if (localStorage) {
    //build navbar and main container
    structure();
    AddScript('js/modernizr-min.js');
    AddScript('js/materialize-min.js');
    $(window).load(function() {
      if (localStorage.getItem('state') != null && localStorage.getItem('state') != '') {
        route(localStorage.getItem('state'));
      }else{
        route(tern(ref.getAuth(), 'events', 'events'));
      }
      $(".button-collapse").sideNav();
      $('.collapsible').collapsible({
        accordian: true
      });
    });
  } else {
    // No support. Use a fallback such as browser cookies or store on the server.
  }
}

function structure() {

  source = $('#nav_template').html();
  template = Handlebars.compile(source);
  ref = new Firebase("https://shindigevents.firebaseio.com");
  Handlebars.registerPartial("loginPartial", template);
  context = tern(ref.getAuth(), {
    login_option_routing: 'route("events")',
    login_option_function: 'logout()',
    login_option_text: 'Logout'
  }, {
    login_option_routing: 'route("landing_page")',
    login_option_function: 'route("register")',
    login_option_text: 'Login or Register'
  });

  html = template(context);
  $('body').append(html);

  source = $('#main_template').html();
  template = Handlebars.compile(source)
  context = {};
  html = template(context);
  $('body').append(html);
}

function checkLogin() {
  if(ref.getAuth()){
    location.reload();
  }
}

function tern(condition, option1, option2) {
  var t = (condition ? option1 : option2);
  return t;
}

function logout() {
  ref.unauth();
  route('landing_page');
  location.reload();
}

function register_template() {
  $.getScript('js/auth/register.js').then(function() {
    ref = new Firebase("https://shindigevents.firebaseio.com");
    var authData = ref.getAuth();
    if (authData) {
      $('#template_container').html('');
      $('#template_container').hide(0);
      source = $('#register').html();
      template = Handlebars.compile(source);
      localStorage.setItem('state', 'register');
      html = template(context);
      $('#template_container').append(html);
      $('#template_container').show(500);
    } else {
      route('manual_registration');
    }
  });
}

function manual_registration() {
  var firebase = $.getScript('https://cdn.firebase.com/js/client/2.2.1/firebase.js');
  firebase.then(function() {
    AddScript('js/auth/register.js');
  }, function(err) {
    console.log(err);
  });

  var jqUI = $.getScript('https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js');
  jqUI.then(function() {
    AddScript('js/auth/register_email.js');
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

//make events template
function events() {
  //TODO get events from database
}

function new_event_form() {

}

function route(template_name) {
  $('#template_container').html('');
  $('#template_container').hide(0);
  source = $('#' + template_name).html();
  template = Handlebars.compile(source);
  localStorage.setItem('state', template_name);

  switch (template_name) {
    case 'events':
      events();
      $('#template_container').show(500);
      break;
    case 'manual_registration':
      manual_registration();
      $('#template_container').show(500);
      break;
    case 'register':
      register_template();
      $('#template_container').show(500);
      break;
    case 'landing_page':
      context = {
        image: 'images/group_003.jpg'
      };
      $('#template_container').show(500);
      break;
    case 'structure':
      $('#template_container').show(500);
      break;
    case 'new_event_form':
      new_event_form();
      $('#template_container').show(500);
      break;
    default:
      context = {};
      break;
  }

  html = template(context);
  $('#template_container').append(html);
  $('#template_container').show(500);
}
