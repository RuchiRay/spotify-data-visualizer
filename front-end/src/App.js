import { useEffect,useState } from "react";
import { access_token,logout } from './spotify'
function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(access_token)
  }, []);
console.log(Date.now());
  return (
    <div className="App text-4xl text-red-600">
      <a href="http://localhost:8000/login">log in to spotify</a>
      <button onClick={logout}>log out</button>
    </div>
  );
}

export default App;
