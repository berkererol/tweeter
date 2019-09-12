$(document).ready((event) => {
  //converts miliseconds to conventional time measures.
  const createdAt = function(time) {
    const timeDiff = Date.now() - time;
    if (timeDiff >= 31556952000) {
      return `${Math.floor(timeDiff / 31556952000)} years`;
    } else if (timeDiff >= 2592000000) {
      return `${Math.floor(timeDiff / 2592000000)} months`;
    } else if (timeDiff >= 604800000) {
      return `${Math.floor(timeDiff / 604800000)} weeks`;
    } else if (timeDiff >= 86400000) {
      return `${Math.floor(timeDiff / 86400000)} days`;
    } else if (timeDiff >= 3600000) {
      return `${Math.floor(timeDiff / 3600000)} hours`;
    } else if (timeDiff >= 60000) {
      return `${Math.floor(timeDiff / 60000)} minutes`;
    } else {
      return `${Math.floor(timeDiff / 1000)} seconds`;
    }
  }

  //accepts tweet object and returns the formatted HTML to be appended onto the tweets-container where new tweets are displayed.
  const createTweetElement = function (tweet) {
    const $tweet = $("<article>")
      .addClass("tweetpost")
      .append(
        $("<header>")
          .addClass("tweetpostheader")
          .append(
            $("<div>")
              .addClass("tweetpostheader-bar-left")
              .append(
                $("<img>")
                  .addClass("post-avatar")
                  .attr("src", tweet.user.avatars),
                $("<p>")
                  .addClass("user-info")
                  .append(
                    $("<span>")
                      .addClass("user-name")
                      .text(tweet.user.name),
                    $("<span>")
                      .addClass("user-account")
                      .text(tweet.user.handle)
                  ),
              ),
            $("<div>")
              .addClass("tweetpostheader-bar-right")
              .append(
                $("<p>")
                  .addClass("tweet-date")
                  .text(`${createdAt(tweet.created_at)} ago`) 
              ),
          ),
        $("<p>")
          .addClass("tweetpost")
          .html(tweet.content.text)
      );
    return $tweet;
  };

    // When the button is clicked; compose tweet box slides down
    $(".create-new-tweet").on("click", function (event) {
      $(".new-tweet").slideToggle("slow",function () {
        $("#tweet-text-area").focus();
      });
    });

  const renderTweets = function (tweets) {
    //first empty container to load new tweets
    $("#tweet-container").empty();
    tweets.forEach(item => {
      let renderTweet = createTweetElement(item);
      $("#tweet-container").prepend(renderTweet);
    });
  };

  // loadTweets() renders the tweets if the GET request was successful
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (response) {
        renderTweets(response);
      }
    });
  };

  //Validate the appropriate length of the tweet
  const validateTweetLength = function (data) {
    if (data.val().length === 0) {
      $("#alert-container").css("display", "inherit");
      $(".error-message").text("You didn't write anything!");
      return false;
    } else if (data.val().length > 140) {
      $("#alert-container").css("display", "inherit");
      $(".error-message").text("You're over the character limit of 140");
      return false;
    }
    return true;
  };

  //Event handling on submit button
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();

    if (validateTweetLength($("#tweet-text-area"))) {
      $.ajax('/tweets', {
        method: 'POST',
        data: data
      }).done(function (newTweet) {
        $("#tweet-text-area").val("");
        $(".counter").text(140);
        $("#alert-container").css("display", "none");
        loadTweets();
      })
    };
  });

    // When user scrolls down 120px from the top of the document, scroll up button will appear.
    $(document).on("scroll", function() {
      if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
        $("#scroll-up-btn").css("display", "block");
      } else {
        $("#scroll-up-btn").css("display", "none");
      }
    });
  
    // When the scroll up button is pressed, the user is brought to the top of the document.
    $("#scroll-up-btn").on("click", function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });


});








