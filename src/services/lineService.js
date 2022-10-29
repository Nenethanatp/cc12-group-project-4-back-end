const axios = require('axios');
const subscriptionService = require('../services/subscribeService');

exports.login = async (code) => {
  const formdata = {
    grant_type : 'authorization_code',
    code : code,
    redirect_uri : process.env.LINE_REDIRECT_URI,
    client_id : process.env.LINE_CLIENT_ID,
    client_secret : process.env.LINE_CLIENT_SECRET
  };

  const params = Object.keys(formdata).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(formdata[key]);
  }).join('&');

  // console.log(params)
  const res = await axios.post('https://notify-bot.line.me/oauth/token', params, {
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
  });

  // console.log(res.data)
  return res.data.access_token

  // return '555'
}

exports.notify = async (user, post) => {

  const hasSubscription = await subscriptionService.hasSubscription(user.id);
  console.log(hasSubscription);
  if (!hasSubscription) {
    console.log('no subscription');
    return;
  }

  const formdata = {
    message: `${post.content} - ${process.env.WEBSITE_URL}/post/${post.id}`,
    // imageFullsize: post.PostImages[0]?.imageUrl
  };

  const params = Object.keys(formdata).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(formdata[key]);
  }).join('&');

  const resp = await axios.post('https://notify-api.line.me/api/notify', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${user.lineAccessToken}`
    },
  })

  return resp.data.message;
}
