/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Keep track of tweet length and display characters left, and prevent typing after reaching maximum
$tweet = $('#tweet-text');
$tweetTracker = $('#tweet-counter');
$tweet.on('keypress', (e) => {
  tweetLength = $tweet.val().length;
  tweetLength === 140 ? $tweetTracker.html(140 - tweetLength) : $tweetTracker.html(140 - tweetLength - 1);

  if (140 - tweetLength === 0) {
    e.preventDefault();
  }
});
// Check if tweet length is maximum and allow deleting to lower tweet length
$tweet.on('keydown', (e) => {
  tweetLength = $tweet.val().length;

  if (e.ctrlKey && e.key === 'Backspace') {
    $tweetTracker.html(140);
  } else {
    if (e.key === 'Backspace') {
      tweetLength === 0 ? $tweetTracker.html(140 - tweetLength) : $tweetTracker.html(140 - tweetLength + 1);
    }
  }
});
// Check if anything pasted inside will exceed tweet length maximum, prevent if so
$tweet.on('paste', (e) => {
  tweetLength = $tweet.val().length;

  clipboardData = e.clipboardData || window.clipboardData;
  if (140 - (tweetLength + e.clipboardData.getData('Text').length) <= 0) {
    e.preventDefault();
  }
});