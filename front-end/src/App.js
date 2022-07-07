import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      const response = await getCurrentUserProfile();
      setProfile(response.data);
      console.log(response.data);
    };
    catchErrors(fetchData());
  }, []);
  console.log('access token',accessToken );
  return (
    <div className="App text-4xl text-red-600">
      <a href="http://localhost:8000/login">log in to spotify</a>
      <button onClick={logout}>log out</button>
    </div>
  );
}

export default App;
