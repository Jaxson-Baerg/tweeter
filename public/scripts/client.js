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

/* --- Show and hide tweet prompt when clicking button on navbar --- */
const $errorContainer = $('.error-container');
const $tweetForm = $('#write-tweet');
const $tweetText = $('#tweet-text');

$('#show-prompt').on('click focus', (e) => {

  $errorContainer.slideUp();
  $tweetText.removeAttr('class');
  $tweetForm.is(':hidden') && e.type === "click" ? $tweetForm.slideDown() : $tweetForm.slideUp();
});
/* --- Hide tweet prompt when hide button is clicked --- */
$('#hide-button').on('click', () => {
  $errorContainer.slideUp();
  $tweetForm.slideUp();
  $tweetText.removeAttr('class');
});
/* --- Hide error msg when user focuses on text box --- */
// $tweetText.on('focus', () => {
//   $errorContainer.slideUp();
//   $tweetText.removeAttr('class');
// });

/* --- Submits user entered tweet to json database? --- */
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
    $tweetText.attr('class', 'invalid');
    return false;
  }
  $errorContainer.slideUp();
  $tweetText.removeAttr('class');

  $.post('/tweets/', $tweetForm.serialize(), () => {
    $tweetForm[0].childNodes[3].value = '';
    $tweetForm[0].childNodes[11].innerHTML = 140;
    $tweetForm.slideUp();
    loadTweets();
  });
});