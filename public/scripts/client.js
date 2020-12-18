/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  loadTweets;
});

// Gets Tweets From server
const loadTweets = () => {
  //Create AJAX request
  $.ajax({
    method: 'GET',
    url: "http://localhost:8080/tweets",
  })
    .then((result) => {
      $("#tweetContainer").empty();
      $(".counter").text("140");
      $("form").trigger("reset");

      renderTweets(result);
    })
    .catch((err) => console.log("Error", err));
}

// Post Tweets to server
const postTweets = (data) => {
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/tweets",
    data: data
  }).then(() => {
    // Used to update tweet list everytime submit is pressed
    loadTweets();
  });
}

// Creates the Tweet Box on Page
const renderTweets = function (tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweet);
    // using JQuery added new posts
    $('#tweetContainer').prepend(tweetElement);
  }
  // takes return value and appends it to the tweets container
}

// Takes all the element from the database to use in tweet
const createTweetElement = function (tweet) {
  createdAt = new Date(parseInt(`${tweet.created_at}`))

  let $tweet = /* Your code for creating the tweet element */
    `<article class="tweet">
      <header class="articleHead">
        <div>
          <img src="${tweet.user.avatars}">
          <h3>${tweet.user.name}</h3>
        </div>
        <div>
          <p>${tweet.user.handle}</p>
        </div>
      </header>
      <div>
        <p class="content">${escape(tweet.content.text)}</p>
        <footer>
          <time>${createdAt}</time>
          <div>
            <!-- Heart -->
            <span><i class="fas fa-heart"></i></span>
            <!-- Flag -->
            <span><i class="fas fa-flag"></i></span>
            <!-- Comment -->
            <span><i class="fas fa-retweet"></i></span>
          </div>
        </footer>
      </div>
    </article>`

  return $tweet;
}

// Form Submission
$('#newTweet').on('submit', function (event) {
  // Stop the form from being submitted
  event.preventDefault();
  let $tweetText = $(this).children('#tweet-text');
  if ($tweetText.val().length < 1) {
    $(".noCharacter").slideDown();
    $(".overCharacter").slideUp();
  } else if ($tweetText.val().length > 140) {
    $(".overCharacter").slideDown();
    $(".noCharacter").slideUp();
  } else {
    $(".noCharacter").slideUp();
    $(".overCharacter").slideUp();
    const $newTweetBox = $tweetText.serialize();
    postTweets($newTweetBox);
  }
});

// Escape Function
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
loadTweets();
$(".noCharacter").hide();
$(".overCharacter").hide();

