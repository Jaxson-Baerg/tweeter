// Hide and show scroll to top button when user scrolls past the profile section
const $page = $('html, body');
const $window = $(window);
$window.scroll(() => {
  if ($window.scrollTop() > 400) {
      $('#toTop:hidden').removeAttr('hidden');
      $('#toTop').click(() => {
        scrollToTopOfPage($page);
      });
  } else {
      $('#toTop').attr('hidden', 'true');
  }
});

// Run scroll animation and stop it either during or after finishing
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