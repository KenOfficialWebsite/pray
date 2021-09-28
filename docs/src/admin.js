$(document).ready(function(){
    $('input[type=password]').on('change input', function(){
        if ($(this).val()) {
          $('.arrow-submit').addClass('active');
        } else {
          $('.arrow-submit').removeClass('active');
        }
    });
});