$(function(){
  $('body').html('');
});

function new_event_form(){

  var content = templates.new_event_form.content;
  $('#template_container').append(document.importNode(content, true));
}
