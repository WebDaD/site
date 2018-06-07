/* global $ */
$(document).ready(function () {
  $('#form-selector-form').on('click', '#contact-send', function () {
    $.post('../php/mailer.php', {
      type: $('#contact-type').text(),
      name: $('#contact-name').val(),
      url: $('#contact-url').val(),
      mail: $('#contact-mail').val(),
      message: $('#contact-message').val(),
      captchaResponse: $('#g-recaptcha-response').val()
    }, function (result) {
      $('#form-selector-form').hide()
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
  $('.nav li a').on('click', function () {
    if ($('#bs-example-navbar-collapse-1').hasClass('in')) {
      $('.navbar-toggle').click()
    }
    $(this).parent().find('a').removeClass('active')
    $(this).addClass('active')
  })
  $(window).on('scroll', function () {
    var paddingTop = parseInt($('body').css('padding-top').replace('px', '')) + 70
    $('.target').each(function () {
      if ($(window).scrollTop() >= $(this).offset().top - paddingTop) {
        var id = $(this).attr('id')
        $('.nav li').removeClass('active')
        $('.nav li a[href="#' + id + '"]').parent().addClass('active')
        window.history.replaceState(undefined, undefined, '#' + id)
      }
    })
  })
  $('#form-selector-back').on('click', function () {
    $('#form-selector-buttons').show()
    $('#form-selector-form').hide()
    $('#contact-type').text('')
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
      case 'service':
        $('#contact-type').text('Service')
        $('#form-selector-url').hide().val('-')
        break
      case 'error':
        $('#contact-type').text('Fehlermeldung')
        $('#form-selector-url').show().val('http://webdad.eu')
        break
    }
  })
})
