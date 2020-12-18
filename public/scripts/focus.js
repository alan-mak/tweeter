$(document).ready(function() {
  const $button = $('#newTweetButton');
  $button.on("click", function() {
    $('textarea').focus();
  });
});