/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// let domReady = (callback) => {
//   document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback);
// }

// domReady(() => {
//   console.log("Loaded");
//   document.body.removeAttribute('hidden');
// });

// $("#tweet-text").
window.onload = () => {
  document.getElementById('tweet-text').addEventListener('keyup', (e) => {
    tweet = document.getElementById('tweet-text');
    tweetTracker = document.getElementById('tweet-counter');
    tweetLength = tweet.value.length;
    tweetTracker.innerHTML = 140 - tweetLength;
  
    if (140 - tweetLength === 0 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  });
  document.getElementById('tweet-text').addEventListener('keydown', (e) => {
    tweet = document.getElementById('tweet-text');
    tweetTracker = document.getElementById('tweet-counter');
    tweetLength = tweet.value.length;
    tweetTracker.innerHTML = 140 - tweetLength;

    if (e.key === 'Backspace') {
      tweetTracker.innerHTML = 140 - tweetLength;
    }
  });
  document.getElementById('tweet-text').addEventListener('paste', (e) => {
    tweet = document.getElementById('tweet-text');
    tweetLength = tweet.value.length;

    clipboardData = e.clipboardData || window.clipboardData;
    if (140 - (tweetLength + e.clipboardData.getData('Text').length) <= 0) {
      e.preventDefault();
    }
  });
}