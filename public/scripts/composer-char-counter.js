$(document).ready(function() {
  // --- our code goes here ---
  const $textarea = $('textarea');
  $textarea.on("keyup", function () {
    let counter = $(this).siblings("div").children(".counter")
    counter.text(140 - $(this).val().length)
    if ($(this).val().length > 140) {
      counter.addClass("negativeCounter")
    } else {
      counter.removeClass("negativeCounter")
    }
  })
});