/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Heidegger",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@zeitundsein"
    },
    "content": {
      "text": "Language is the house of the truth of Being."
    },
    "created_at": 9261127859088
  },
  {
    "user": {
      "name": "Bhagavad Gita",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@vyasa"
    },
    "content": {
      "text": "You are what you believe in. You become that which you believe you can become."
    },
    "created_at": 92611220399087
  },
];

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
        .text(tweet.content.text)
    );
  return $tweet;
};


const renderTweets = function (tweets) {

  tweets.forEach(item => {
    let renderTweet = createTweetElement(item);
    $("#tweet-container").prepend(renderTweet);
  });

};

$(document).ready((event) => {

  renderTweets(data);

});