$(function () {
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
    formValid = false;

    if ($('input[name=name]').val() == '') {
      $('input[name=name]').parent().addClass('has-error');
      formValid = false;
    } else {
      formValid = true;
    }

    if ($('input[name=email]').val() != '' && validateEmail(formData['email'])) {
      formValid = true;
    } else {
      $('input[name=email]').parent().addClass('has-error');
      formValid = false;
    }

    if ($('textarea[name=message]').val() == '') {
      $('textarea[name=message]').parent().addClass('has-error');
      formValid = false;
    } else {
      formValid = true;
    }

    if (formValid) {
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
