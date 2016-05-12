var view, source, template, context, html;
$(function() {

  if (localStorage) {
    structure();
    AddScript('js/modernizr-min.js');
    AddScript('js/materialize-min.js');
    $(window).load(function() {
      if (localStorage.getItem('state') == null) {
        route('landing_page');
      } else {
        route(localStorage.getItem('state'));
      }
      $(".button-collapse").sideNav();
    });
  } else {
    // No support. Use a fallback such as browser cookies or store on the server.
  }
});

//Creates navbar and main template_container
function structure() {
  source = $('#nav_template').html();
  template = Handlebars.compile(source)
  context = {};
  html = template(context);
  $('body').append(html);

  source = $('#main_template').html();
  template = Handlebars.compile(source)
  context = {};
  html = template(context);
  $('body').append(html);
}

//access to registration/login page
function register() {
  // get firebase and then once it is loaded, add content to page.
  var jqDeferred = $.getScript('https://cdn.firebase.com/js/client/2.2.1/firebase.js');
  jqDeferred.then(function() {
    AddScript('js/auth/register.js');
  }, function(err) {
    console.log(err);
  });
}

function manual_registration() {
  // get jqueryui and then once it is loaded, add content to page.
  var jqDeferred = $.getScript('https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js');
  jqDeferred.then(function() {
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

function loadImage(object, url) {
  object.src = url;
  $(object).load(function() {
    console.log('loaded');
  });
}
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
      context = {};
      $('#template_container').show(500);
      break;
    case 'manual_registration':
      manual_registration();
      context = {};
      $('#template_container').show(500);
      break;
    case 'register':
      register();
      context = {};
      $('#template_container').show(500);
      break;
    case 'landing_page':
      context = {
        image: 'images/group_003.jpg'
      };
      $('#template_container').show(500);
      break;
    case 'structure':
      context = {};
      $('#template_container').show(500);
      break;
    case 'new_event_form':
      new_event_form();
      context = {};
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
