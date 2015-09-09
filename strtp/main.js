$(function () {
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
