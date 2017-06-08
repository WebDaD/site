/* global $ */
$(document).ready(function () {
  $('#contact-form').on('click', '#contact-send', function () {
    $.post('../php/mailer.php', {
      type: $('#contact-name').text(),
      name: $('#contact-name').val(),
      url: $('#contact-url').val(),
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
  $('.form-selector').on('click', function () {
    var type = $(this).data('type')
    $('#form-selector-buttons').hide()
    $('#form-selector-form').show()
    switch (type) {
      case 'website':
        $('#contact-type').text('Neue Webseite')
        $('#form-selector-url').hide().val('-')
        break
      case 'rebuild':
        $('#contact-type').text('Neubau Webseite')
        $('#form-selector-url').show()
        break
      case 'support':
        $('#contact-type').text('Unterstützung')
        $('#form-selector-url').hide().val('-')
        break
      case 'other':
        $('#contact-type').text('Sonstiges')
        $('#form-selector-url').hide().val('-')
        break
    }
  })
})
