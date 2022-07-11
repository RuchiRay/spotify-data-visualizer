import axios from "axios";

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_expire_time",
  timestamp: "spotify_timestamp",
};

const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export const logout = () => {
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  window.location = window.location.origin;
};

const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) return false;
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

const refreshToken = async () => {
  console.log("refresh");
  try {
    if (
      !LOCALSTORAGE_VALUES.accessToken ||
      LOCALSTORAGE_VALUES === "undefined" ||
      Date.now() - LOCALSTORAGE_VALUES.timestamp < 1000
    ) {
      console.error("no refresh token found");
      logout();
    }
    else
    {
      const { data } = await axios.get(
        `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
      );
      window.localStorage.setItem(
        LOCALSTORAGE_KEYS.accessToken,
        data.access_token
      );
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      reloadPage()
    }
  } catch (error) {
    console.error(error);
  }
};

const reloadPage = () => {
  console.log("page reloaded");
  window.location.reload();
};

const getAccessTokens = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };
  const hasError = urlParams.get("error");
  // if there is an error or the token in local storage has expired
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // when there are tokens in url param which means user has logged in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // setting the query params in local storage
    console.log("hahahah");
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }
  return false;
};
export const accessToken = getAccessTokens();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

export const getCurrentUserProfile = () => {
  return axios.get("/me");
};

export const getFollowingArtist = ()=>{
  return axios.get('/me/following?type=artist')
}

export const getUserPlaylists = ()=>{
  return axios.get('/me/playlists')
}
export const getUserEpisodes = ()=>{
  return axios.get('/me/episodes')
}
export const getUserAlbums = ()=>{
  return axios.get('/me/albums')
}
export const getUserTracks = ()=>{
  return axios.get('/me/tracks')
}