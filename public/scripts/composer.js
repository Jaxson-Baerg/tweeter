/* --- Hide and show scroll to top button when user scrolls past the profile section --- */
const $page = $('html, body');
const $window = $(window);
$window.scroll(() => {
  let scrollVal;
  $window.width() > 1024 ? scrollVal = 100 : scrollVal = 400;
  if ($window.scrollTop() > scrollVal) {
      $('#toTop:hidden').removeAttr('hidden');
      $('#toTop').click(() => {
        scrollToTopOfPage($page);
      });
  } else {
      $('#toTop').attr('hidden', 'true');
  }
});

/* --- Run scroll animation and stop it either during or after finishing --- */
const scrollToTopOfPage = (page) => {
  page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', () => {
    page.stop();
  });
  page.animate({scrollTop: page.position().top}, 'slow', () => {
    page.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
    page.stop(true, true);
  });
  return false;
};

/* --- Append tweet to tweet list on main page --- */
const createTweetElement = (tweetObj) => {
  $list = $('.tweet-container');

  /* --- Calculate the time from now to when the tweet was created *not using the timeago package* --- */
  let timeAgo = "";
  const secondsAgo = Math.round(((((Date.now()) - tweetObj.created_at)) / 1000));
  const daysAgo = Math.round(secondsAgo / 86400);
  const hoursAgo = Math.round(secondsAgo / 3600);
  const minutesAgo = Math.round(secondsAgo / 60);
  if (daysAgo === 0) {
    if (hoursAgo === 0) {
      if (minutesAgo === 0) {
        timeAgo = secondsAgo + " second(s) ago";
      } else {
        timeAgo = minutesAgo + " minute(s) ago";
      }
    } else {
      timeAgo = hoursAgo + " hour(s) ago";
    }
  } else {
    timeAgo = daysAgo + " day(s) ago";
  }

  $list.prepend(`<article class="tweet-article"><header><div class="tweet-name"><img src="${tweetObj.user.avatars}"><h4>${tweetObj.user.name}</h4></div><span>${tweetObj.user.handle}</span></header><p id="safe-text"></p><footer><span>${timeAgo}</span><div><button type="button"><i class="fa-solid fa-font-awesome"></i></button><button type="button"><i class="fa-solid fa-retweet"></i></button><button type="button"><i class="fa-regular fa-heart"></i></button></div></footer></article>`);
  $('#safe-text').text(tweetObj.content.text); // Ensure safe text for any scripts in tweet text
};

/* --- Take list of tweets and append each one --- */
const renderTweets = (tweetArray) => {
  $('.tweet-article').remove();
  for (let tweet of tweetArray) {
    createTweetElement(tweet);
  }
};

/* --- Load all tweets from server database and send them to be rendered --- */
const loadTweets = () => {
  $.get('/tweets/', (res, req) => {
    renderTweets(res);
  });
};

/* --- Display initial tweets when page loads for first time --- */
loadTweets();