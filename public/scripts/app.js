/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//DOCUMENT READY ----------------------------------------------
$(document).ready((event) => {

  // Accepts tweet object returns the formatted HTML to be appended onto the tweets-container
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
                  .text(tweet.created_at)
              ),
          ),
        $("<p>")
          .addClass("tweetpost")
          .html(tweet.content.text)
      );
    return $tweet;
  };


  const renderTweets = function (tweets) {
    //first empty container to load new tweets
    // $("#tweet-container").empty();
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
      alert("Tweet is empty!")
      return false;
    } else if (data.val().length > 140) {
      alert("Your tweet is over 140 character limit.")
      return false;
    }
    return true;
  };


  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();

    if (!validateTweetLength($("#tweet-text-area"))) {
      // $("#error").css("display", "inherit");
    } else if (validateTweetLength($("#tweet-text-area"))) {
      $.ajax('/tweets', {
        method: 'POST',
        data: data
      }).done(function (newTweet) {
        $("#tweet-text-area").val("");
        $(".counter").text(140);
        // $("#error").css("display", "none");
        loadTweets();
      })
    };
  });
});

