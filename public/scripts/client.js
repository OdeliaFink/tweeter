/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
    name: 'Newton',
    avatars: 'https://i.imgur.com/73hZDYK.png',
    handle: '@SirIsaac',
  },
  content: {
    text: 'If I have seen further it is by standing on the shoulders of giants',
  },
  created_at: 1461116232227,
};

$(document).ready(() => {
  $('.send-tweet').on('submit', (event) => {
    event.preventDefault();
    const text = $('#tweet-text').val().length;

    if (text > 140) {
      alert('Content is too long!');
    } else if (text === 0) {
      alert('No text present!');
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('form').serialize(),
      }).then((res) => {
        loadTweets();
      });
    }
  });

  const createTweetElement = function (tweetData) {
    let $tweet = $('<article>').addClass('tweet');

    let html = `<header>
      <div class="user-info">
        <img src=${tweetData.user.avatars}> 
        <h1>${tweetData.user.name}</h1>
       </div>
       <div>
        <h2>${tweetData.user.handle}</h2>
       </div>
    </header>
     <div class="tweet-text">
      <p>
        ${tweetData.content.text}
      </p>
    </div>
    <footer>
      <p>
        ${tweetData.created_at}
        </p>
    </footer>
    `;
    let result = $tweet.append(html);
    return result;
  };
  const renderTweets = function (tweets) {
    const container = $('.tweet-container').html('');
    tweets.forEach((tweet) => {
      const tweetElement = createTweetElement(tweet);
      container.prepend(tweetElement);
      console.log(tweetElement);
    });
  };

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
    }).then((results) => {
      console.log(results);
      renderTweets(results);
    });
  };

  loadTweets();
});
