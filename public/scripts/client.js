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
  }
]

$(document).ready(function () {

  // // Gets Tweets From server
  // const getTweets = () => {
  //   // Get tweets from URL
  //   const url = 'http://localhost:8080/tweets';

  //   //Create AJAX request
  //   $.ajax({
  //     method: 'GET',
  //     url: url,
  //   })
  //     .then((result) => {
  //       renderTweets(result);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // Post Tweets to server
  const postTweets = (data) => {
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: data
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
    let $tweet = /* Your code for creating the tweet element */
      `<article class="tweet">
      <header class="articleHead">
        <div>
          <img src="${tweet.user.avatars}">
          <h3>${tweet.user.name}</h3>
        </div>
        <p>${tweet.user.handle}</p>
      </header>
      <p class="content">${tweet.content.text}</p>
      <footer>
        <time>${tweet.created_at}</time>
        <div>
          <!-- Heart -->
          <span><i class="fas fa-heart"></i></span>
          <!-- Flag -->
          <span><i class="fas fa-flag"></i></span>
          <!-- Comment -->
          <span><i class="fas fa-retweet"></i></span>
        </div>
      </footer>
    </article>`

    return $tweet;
  }

  // Form Submission
  $('#newTweet').on('submit', function (event) {
    // Stop the form from being submitted
    event.preventDefault();
    // target the input field -> children
    const $newTweetBox = $(this).children('#tweet-text').serialize();
    postTweets($newTweetBox);
  });

  renderTweets(data);
});