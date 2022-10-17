const $errorContainer = $('.error-container');
const $tweetForm = $('#write-tweet');
const $tweetText = $('#tweet-text');

/* --- Keep track of tweet length and display characters left --- */
$tweetText.on('input', () => composerCharacterCounter());

/* --- Show and hide tweet prompt when clicking button on navbar --- */
$('#show-prompt').on('click', () => {
  $errorContainer.slideUp();
  $tweetText.removeAttr('class');
  if ($tweetForm.is(':hidden')) {
    $tweetForm.slideDown();
    scrollToTopOfPage($('html, body'));
  } else {
    $tweetForm.slideUp();
  }
  $tweetText.focus();
});
/* --- Hide tweet prompt when hide button is clicked --- */
$('#hide-button').on('click', () => {
  $errorContainer.slideUp();
  $tweetForm.slideUp();
  $tweetText.removeAttr('class');
});
/* --- Hide error msg when user focuses on text box --- */
$tweetText.on('focus', () => {
  $errorContainer.slideUp();
  $tweetText.removeAttr('class');
});