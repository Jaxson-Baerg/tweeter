/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* --- Keep track of tweet length and display characters left, and prevent typing after reaching maximum --- */
const $tweet = $('#tweet-text');
const $tweetTracker = $('#tweet-counter');
$tweet.on('keypress', (e) => {
  const tweetLength = $tweet.val().length;
  tweetLength === 140 ? $tweetTracker.text(140 - tweetLength) : $tweetTracker.text(140 - tweetLength - 1);

  if (140 - tweetLength === 0) {
    e.preventDefault();
  }
});

/* --- Check if tweet length is maximum and allow deleting to lower tweet length --- */
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

/* --- Check if anything pasted inside will exceed tweet length maximum, prevent if so --- */
$tweet.on('paste', (e) => {
  const tweetLength = $tweet.val().length;

  const clipboardData = e.clipboardData || window.clipboardData;
  if (140 - (tweetLength + e.clipboardData.getData('Text').length) <= 0) {
    e.preventDefault();
  }
});

// Show tweet prompt when clicked
const $errorContainer = $('.error-container');
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