$(function () {
  new WOW().init();
    var container = $(".hire_form");

    function hideContainer() {
      container.fadeOut(function(){
        container.remove();
      });
    }

    $(document).mouseup(function (e) {
      if (!container.is(e.target) // if the target of the click isn't the container...
      && container.has(e.target).length === 0) { // ... nor a descendant of the container
        hideContainer(); 
        }
    });
    $('.closeme').click(function(){
      hideContainer();
      return false;
    })
    function testScroll(ev){
      if(window.pageYOffset>800) {
        $('.hire_form').slideDown() }
      }

     window.onscroll=testScroll

  $('.hire_form').on('keypress', 'input, textarea', function(){
    tooltip = $(this).parent().find('.tooltip')
    tooltip.remove();
    $(this).parent().removeClass('has-error');
  });

  $('.hire_form').submit(function(event) {

    var formData = {
        'name': $('input[name=name]').val(),
        'email': $('input[name=email]').val(),
        'message': $('textarea[name=message]').val()
    };

    function validateEmail(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    }

    $('.form-group').removeClass('has-error');

    function isTrue(element, index, array) {
        return element == true;
    }

    var formValid = [false, false, false]

    if ($('input[name=name]').val() == '') {
      $('input[name=name]').parent().addClass('has-error');
      $('input[name=name]').tooltip({
        title: 'Please enter your name',
        placement: 'left',
        trigger: 'manual'
      }).tooltip('show');
      formValid[0] = false;
    } else {
      formValid[0] = true;
    }

    if ($('input[name=email]').val() != '' && validateEmail(formData['email'])) {
      formValid[1] = true;
    } else {
      $('input[name=email]').parent().addClass('has-error');
      $('input[name=email]').tooltip({
        title: 'Please enter a valid email',
        placement: 'left',
        trigger: 'manual'
      }).tooltip('show');
      formValid[1] = false;
    }

    if ($('textarea[name=message]').val() == '') {
      $('textarea[name=message]').parent().addClass('has-error');
      $('textarea[name=message]').tooltip({
        title: 'Please enter your message',
        placement: 'left',
        trigger: 'manual'
      }).tooltip('show');
      formValid[2] = false;
    } else {
      formValid[2] = true;
    }

    if (formValid.every(isTrue)) {
      $.ajax({
        type: 'POST',
        crossDomain: true,
        url: 'https://fwdform.herokuapp.com/user/4f224393-f1c9-4078-aca9-316cbc0ad347',
        data: formData,
        dataType: 'json',
        encode: true,
        complete: function (response) {
          $('.hire_form').html('<h1>Thank you!</h1>')
        },
        success: function (response) {
          var resp = JSON.parse(response)
        },
        error: function (xhr, status) {
        }
      })
    }

    event.preventDefault();
  });

  $('.advantage').hover(
    function() {
      $(this).find('p').show('slideUp');
      $(this).find('img').hide();
    }, function() {
      $(this).find('p').hide();
      $(this).find('img').show();
    }
  );
});
