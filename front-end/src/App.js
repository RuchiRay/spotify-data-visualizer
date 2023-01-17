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
  SingleArtist,
  RecommendationFromPlaylist,
  RecommendationFromSong,
  SingleSong,
  SinglePlaylist
} from "./pages";
import { ScrollToTop } from "./components";
function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />}>
          <Route index element={<Profile />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="recent" element={<Recent />} />
          <Route path="top-artists" element={<TopArtists />} />
          <Route path="top-tracks" element={<TopTracks />} />
          <Route path="artists-following" element={<ArtistFollowing />} />
          <Route path="liked-songs" element={<LikedSongs />} />
          <Route path="artist/:artistId" element={<SingleArtist />} />
          <Route path="songs/:songId" element={<SingleSong />} />
          <Route path="playlist/:playlistId" element={<SinglePlaylist />} />
          <Route path="recommendation/:recId" element={<RecommendationFromPlaylist />} />
          <Route path="recSong/:recSongId" element={<RecommendationFromSong />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
