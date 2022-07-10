import React,{useEffect,useState} from 'react'
import { getCurrentUserProfile } from '../spotify'
import { catchErrors } from '../utils'
const Profile = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCurrentUserProfile();
      setProfile(response.data);
      console.log(response);
    };
    catchErrors(fetchData());
  }, [])
  
  return (
    <div>Profile</div>
  )
}

export default Profile