/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text:
        'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

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

const createTweetElement = function (tweetData) {
  //put in the html for the entire tweet
  const $tweet = $('<article>').addClass('tweet');
  const html = `<header>
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
  const result = $tweet.append(html);
  return result;
};

const renderTweets = function (tweets) {
  const container = $('.tweet-container').html('');
  tweets.forEach((tweet) => {
    const tweetElement = createTweetElement(tweet);
    container.prepend(tweetElement);
  });
};

$(document).ready(() => renderTweets(data));
//once doc is loaded then render function

$('form').on('submit', (event) => {
  event.preventDefault();
  console.log($('form').serialize());

  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $('form').serialize(),
  }).then((res) => console.log(res));
});

const loadTweets = function () {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'JSON',
  })
  .then((results) => {
    console.log(results);
    renderTweets(results);
  });
};

loadTweets();
