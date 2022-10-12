/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Keep track of tweet length and display characters left, and prevent typing after reaching maximum
const $tweet = $('#tweet-text');
const $tweetTracker = $('#tweet-counter');
$tweet.on('keypress', (e) => {
  const tweetLength = $tweet.val().length;
  tweetLength === 140 ? $tweetTracker.text(140 - tweetLength) : $tweetTracker.text(140 - tweetLength - 1);

  if (140 - tweetLength === 0) {
    e.preventDefault();
  }
});
// Check if tweet length is maximum and allow deleting to lower tweet length
$tweet.on('keydown', (e) => {
  const tweetLength = $tweet.val().length;

  if (e.ctrlKey && e.key === 'Backspace') {
    $tweetTracker.text(140);
  } else {
    if (e.key === 'Backspace') {
      tweetLength === 0 ? $tweetTracker.text(140 - tweetLength) : $tweetTracker.text(140 - tweetLength + 1);
    }
  }
});
// Check if anything pasted inside will exceed tweet length maximum, prevent if so
$tweet.on('paste', (e) => {
  const tweetLength = $tweet.val().length;

  const clipboardData = e.clipboardData || window.clipboardData;
  if (140 - (tweetLength + e.clipboardData.getData('Text').length) <= 0) {
    e.preventDefault();
  }
});

// Show tweet prompt when clicked
$errorContainer = $('.error-container');
$('#show-prompt').on('click', () => {
  $('#write-tweet').slideDown();
});
// Hide tweet prompt when clicked
$('#hide-button').on('click', () => {
  $errorContainer.slideUp();
  $('#write-tweet').slideUp();
  $('#tweet-text').removeAttr('class');
});

$('#tweet-text').on('focus', () => {
  $errorContainer.slideUp();
  $('#tweet-text').removeAttr('class');
});

// Submits user entered tweet to json database?
const $tweetForm = $('#write-tweet');
$tweetForm.submit((e) => {
  e.preventDefault();

  if ($tweetForm.serialize() === 'text=') {
    $('#error-msg').text("Please enter your tweet!");
    $errorContainer.slideDown({
      start: function () {
        $errorContainer.removeAttr('style');
        $errorContainer.attr('class', 'flexible');
      }
    });
    $('#tweet-text').attr('class', 'invalid');
    return false;
  }
  $('.error-container').slideUp();
  $('#tweet-text').removeAttr('class');

  $.post('/tweets/', $tweetForm.serialize(), () => {
    $tweetForm[0].childNodes[3].value = '';
    $tweetForm[0].childNodes[11].innerHTML = 140;
    $tweetForm.slideUp();
    loadTweets();
  });
});

// Append tweet to tweet list on main page
const createTweetElement = (tweetObj) => {
  $list = $('.tweet-container');
  $list.prepend(`<article class="tweet-article"><header><div class="tweet-name"><img src="${tweetObj.user.avatars}"><h4>${tweetObj.user.name}</h4></div><span>${tweetObj.user.handle}</span></header><p id="safe-text"></p><footer><span>${Math.round(((((Date.now()) - tweetObj.created_at)) / 1000) / 86400)} days ago</span><div><button type="button"><i class="fa-solid fa-font-awesome"></i></button><button type="button"><i class="fa-solid fa-retweet"></i></button><button type="button"><i class="fa-regular fa-heart"></i></button></div></footer></article>`);
  $('#safe-text').text(tweetObj.content.text);
};

// Take list of tweets and append each one
const renderTweets = (tweetArray) => {
  $('.tweet-article').remove();
  for (let tweet of tweetArray) {
    createTweetElement(tweet);
  }
};

// Load all tweets from server database and send them to be rendered
const loadTweets = () => {
  $.get('/tweets/', (res, req) => {
    renderTweets(res);
  });
};

loadTweets();