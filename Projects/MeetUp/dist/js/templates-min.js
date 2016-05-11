
$(function() {
  if (supportsTemplate()) {
    structure();
    window.onload = function() {
      landing_page();
      $(".button-collapse").sideNav();
    }
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
  // Populate images\
}

//access to registration/login page
function register() {
  // get firebase and then once it is loaded, add content to page.
  var jqDeferred = $.getScript('https://cdn.firebase.com/js/client/2.2.1/firebase.js');
  jqDeferred.then(function() {
    AddScript('js/auth/register.js');
    $('#template_container').append(document.importNode(templates.register.content, true));
  }, function(err){
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

function loadImage(object, url){
  object.src = url;
  $(object).load(function(){
    console.log('loaded');
  });
}
//make events template
function events() {
  //TODO get images from database
  var events = 4;
  var content = templates.events.content;
  $('#template_container').append(document.importNode(content, true));
  $(content).find('img').each(function(i){
    $(i).attr('src', 'https://www.unsplash.it/200/200');
  });


}

var templates = {
  nav: document.querySelector('#nav_template'),
  main: document.querySelector('#main_template'),
  landing_page: document.querySelector('#landing_template'),
  register: document.querySelector('#register_template'),
  events: document.querySelector('#events_template'),
  manual_registration: document.querySelector('#manual_registration')
}

function supportsTemplate() {
  return 'content' in document.createElement('template');
}

function route(template_name) {
  $('#template_container').html('');
  $('#template_container').hide(0);
  switch (template_name) {
    case 'events':
      events();
      $('#template_container').show(500);
      break;
    case 'manual_registration':
      $('#template_container').append(document.importNode(templates.manual_registration.content, true));
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
    default:
      structure();
      break;
  }
}
