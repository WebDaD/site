/* global $ */
$(document).ready(function () {
  $('#contact-form').on('click', '#contact-send', function () {
    $.post('../php/mailer.php', {
      name: $('#contact-name').val(),
      mail: $('#contact-mail').val(),
      message: $('#contact-message').val(),
      captchaResponse: $('#g-recaptcha-response').val()
    }, function (result) {
      $('#contact-result').html(result).show()
    })
  })
  $(function () {
    $('img.lazy').lazyload({
      effect: 'fadeIn'
    })
  })
  $("a[href^='#']").on('click', function (e) {
    e.preventDefault()
    var haash = this.hash
    var paddingTop = parseInt($('body').css('padding-top').replace('px', '')) + 20
    $('html, body').animate({
      scrollTop: $(haash).offset().top - paddingTop
    }, 300, function () {
      window.location.hash = haash
    })
  })
  $('.nav a').on('click', function () {
    $('.navbar-toggle').click() // bootstrap 3.x by Richard
  })
})
