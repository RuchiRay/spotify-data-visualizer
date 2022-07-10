import React,{useEffect,useState} from 'react'
import Loader from '../components/Loader';
import { getCurrentUserProfile } from '../spotify'
import { catchErrors } from '../utils'
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCurrentUserProfile();
      setProfile(response.data);
      console.log(response);
    };
    catchErrors(fetchData());
  }, [])
  

  if(isLoading){
    return (
      <div className='w-full h-screen flex items-center justify-center'><Loader/></div>
    )
  }
  return (
    <div>loaded</div>
  )
}

export default Profile