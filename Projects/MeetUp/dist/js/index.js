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
    // @TODO:20 Fake this form submitting into the event creation. Or not depending on what I learn in the rest of the lesson. Basically I mean if we learn node and gulp stuff that allows for data submission then go ahead and implement it. It can't really hurt at this point, plus it will be a fun side project.
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

// TODO:0 add password validation function
// TODO:10 build the event page JS
