<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/php/config.php');
$captcha = filter_input(INPUT_POST, 'captchaResponse'); // get the captchaResponse parameter sent from our ajax

if (!$captcha) {
  ?>
  <div class="alert alert-danger" role="alert">Konnte Nachricht nicht verschicken.</div>
  <?php
  die();
}
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&amp;amp;response=" . $captcha);
if ($response . success == false) {
  ?>
  <div class="alert alert-danger" role="alert">Konnte Nachricht nicht verschicken.</div>
  <?php
} else {
  $name = $_POST['name'];
  $message = $_POST['message'];
  $email = $POST['mail'];
  $empfaenger = 'info@webdad.eu';
  $betreff = 'Message from Website';
  $nachricht = 'From: ' . $name . '<' . $email . '>' . "\r\nMessage:\r\n" . $message ;
  $header = 'From: ' . $email . "\r\n" .
      'Reply-To: ' . $email . "\r\n" .
      'X-Mailer: PHP/' . phpversion();

  mail($empfaenger, $betreff, $nachricht, $header);
  ?>
  <div class="alert alert-success" role="alert">Nachricht erfolgreich versendet.</div>
  <?php
}

?>
