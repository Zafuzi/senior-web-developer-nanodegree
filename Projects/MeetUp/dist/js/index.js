$(function(){

  var name_input = $('#fname');
      email_input = $('#email');

  var name = name_input.val(),
      email = email_input.val();


  $('.submitBTN').click(function(){
    name = name_input.val();
    email = email_input.val();
    $('.frontpage-form').slideToggle(500);
    $('.finish-form').removeClass('hide').toggle();
    setTimeout(function(){
      $('.finish-form').slideToggle(500);
    }, 1500);
  });

  $('.finishBTN').click(function(){
    $('.finish-form').slideToggle(500);
  });

  $('#addInfo').click(function(){
    if($('.moreinfo').hasClass('hide')){
      $('.moreinfo').removeClass('hide');
    }else{
      $('.moreinfo').addClass('hide');
      $('#employer').val('');
      $('#jobTitle').val('');
      $('#birthDay').val('');
    }
  });
  
  $('#birthday').datepicker({
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      changeYear: true,
      changeMonth: true,
      yearRange: "-100:+0",
  });
});
