$(document).ready(function () {
  $('#tweet-text').on('input', function (event) {
    const text = event.target.value;
    const limit = 140;
    const updatedCounter = limit - text.length;

    $('.counter').html(updatedCounter);

    if (updatedCounter < 0) {
      $('.counter').addClass('counter-red');
    } else {
      $('.counter').removeClass('counter-red');
    }
  });
});
