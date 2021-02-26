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

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(() => {
  //to bring user to new-tweet form
  $('#scroll-button').click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('.new-tweet').offset().top,
      },
      0
    );
  });

  $('#error-box').hide(); //hiding error on default

  $('#tweet-text').on('input', function () {
    $('#error-box').hide();
  });

  $('.send-tweet').on('submit', (event) => {
    event.preventDefault();
    const text = $('#tweet-text').val();
    if (text.length > 140) {
      //if text is over character limit pop up error
      $('#error-box')
        .slideDown()
        .prepend($('<div>').addClass('error-message'))
        .text('Your tweet is too long, please remove some text!');
    } else if (text.length === 0) {
      //if text is zero pop up error
      $('#error-box')
        .slideDown()
        .prepend($('<div>').addClass('error-message'))
        .text('Your tweet is empty, please enter text!');
    } else {
      //if all else is correct then submit tweet
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('form').serialize(),
      }).then((res) => {
        loadTweets();
      });
    }
  });

  const renderTweets = function (tweets) {
    const container = $('.tweet-container').html('');
    tweets.forEach((tweet) => {
      const tweetElement = createTweetElement(tweet);
      container.prepend(tweetElement);
      console.log(tweetElement);
    });
  };

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

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'JSON',
    }).then((results) => {
      console.log(results);
      renderTweets(results);
    });
    $('#tweet-text').val('');
  };

  loadTweets();
});
