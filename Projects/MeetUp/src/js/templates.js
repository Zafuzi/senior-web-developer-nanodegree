$(function(){
  if (supportsTemplate()) {
    landing_page();
    $(".button-collapse").sideNav();
  } else {
    console.log("not good");
  }
});
function landing_page(){

  // Populate images
  templates.landing_page.content.querySelector('img').src = 'src/images/group_003.jpg';
  var structure = [templates.nav, templates.main];
  for(template in structure){
    var temp = document.importNode(structure[template].content, true);
    $('body').append(temp);
  }
  $('#template_container').append(document.importNode(templates.landing_page.content, true));

}

var templates = {
  nav: document.querySelector('#nav_template'),
  main: document.querySelector('#main_template'),
  landing_page: document.querySelector('#landing_template'),
  register: document.querySelector('#register_template'),
  events: document.querySelector('#events_template')
}

function supportsTemplate() {
  return 'content' in document.createElement('template');
}

function route(template_name){
  $('#template_container').html('');
  $('#template_container').append(document.importNode(templates[template_name].content, true));
}
