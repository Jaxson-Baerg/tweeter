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

  // Keep track of tweet length and display characters left, and prevent typing after reaching maximum
  document.getElementById('tweet-text').addEventListener('keypress', (e) => {
    tweet = document.getElementById('tweet-text');
    tweetTracker = document.getElementById('tweet-counter');
    tweetLength = tweet.value.length;
    tweetLength === 140 ? tweetTracker.innerHTML = 140 - tweetLength : tweetTracker.innerHTML = 140 - tweetLength - 1;
  
    console.log(e.ctrlKey);

    if (140 - tweetLength === 0) {
      e.preventDefault();
    }
  });
  // Check if tweet length is maximum and allow deleting to lower tweet length
  document.getElementById('tweet-text').addEventListener('keydown', (e) => {
    tweet = document.getElementById('tweet-text');
    tweetTracker = document.getElementById('tweet-counter');
    tweetLength = tweet.value.length;

    if (e.ctrlKey && e.key === 'Backspace') {
      tweetTracker.innerHTML = 140;
    } else {
      if (e.key === 'Backspace') {
        tweetLength === 0 ? tweetTracker.innerHTML = 140 - tweetLength : tweetTracker.innerHTML = 140 - tweetLength + 1;
      }
    }
  });
  // Check if anything pasted inside will exceed tweet length maximum, prevent if so
  document.getElementById('tweet-text').addEventListener('paste', (e) => {
    tweet = document.getElementById('tweet-text');
    tweetLength = tweet.value.length;

    clipboardData = e.clipboardData || window.clipboardData;
    if (140 - (tweetLength + e.clipboardData.getData('Text').length) <= 0) {
      e.preventDefault();
    }
  });

  // For tweet buttons hover styling
  // document.querySelectorAll('i').forEach((i) => {
  //   console.log(i);
  //   i.onmouseover = () => {
  //     this.setStyle = '#576fd9';
  //   }
  // });
}