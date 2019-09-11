// function checks for keyup event (user typing into textarea) and updates the text to the counter element
$(document).ready(function() {
  $("#tweet-text-area").keyup(function() {
    let length = $(this).val().length;
    let counter = 140;
    if (counter - length < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
    $(".counter").text(counter - length);
  });
});

// $(document).ready(function() {
//   $("#tweet-area")
//     .keyup(function() {
//       let value = $(this).val().length;
//       $("#counter").text(140 - value);
//       if (140 - value < 0) {
//         $("#counter").css("color", "red");
//       } else {
//         $("#counter").css("color", "black");
//       }
//     })
//     .keyup();
// });