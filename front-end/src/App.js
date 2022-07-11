import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  Login,
  Home,
  Playlists,
  Profile,
  Recent,
  TopArtists,
  TopTracks,
  ArtistFollowing,
  LikedSongs,
} from "./pages";
function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />}>
          <Route index element={<Profile />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="recent" element={<Recent />} />
          <Route path="top-artists" element={<TopArtists />} />
          <Route path="top-tracks" element={<TopTracks />} />
          <Route path="artists-following" element={<ArtistFollowing />} />
          <Route path="liked-songs" element={<LikedSongs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
