import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Login, Home, Playlists, Profile } from "./pages";
import { BsSpotify } from "react-icons/bs";
function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      const response = await getCurrentUserProfile();
      setProfile(response.data);
      console.log(response);
    };
    catchErrors(fetchData());
  }, []);
  console.log(profile);
  return (
    // <div className="App text-4xl text-red-600">
    //   <a href="http://localhost:8000/login">log in to spotify</a>
    //   <button onClick={logout}>log out</button>
    // </div>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={token?<Home/>:<Login/>} /> */}
        <Route path="/" element={token ? <Home /> : <Login />}>
          <Route index element={<Profile />} />
          <Route path="playlist" element={<Playlists />} />
          {/* <Route path="activity" element={<Activity />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
