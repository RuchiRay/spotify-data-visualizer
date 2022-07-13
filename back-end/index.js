require("dotenv").config();
const express = require("express");
const queryString = require("query-string");
const axios = require("axios");
const { response } = require("express");

const app = express();
const port = 8000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

// login route
app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email user-follow-read user-library-read user-top-read";

  const queryParams = queryString.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });
  console.log(queryParams);

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// callback route
app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: queryString.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token,expires_in } = response.data;
        const queryParams = queryString.stringify({
          access_token,
          refresh_token,
          expires_in
        })
        // redirect to react app and pass along the tokens in query params
       res.redirect(`http://localhost:3000/?${queryParams}`)
      } else {
        res.redirect(`/?${queryString.stringify({error:"invalid token"})}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

// get refresh token
app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;
  console.log('print refresh token',refresh_token);
  axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
