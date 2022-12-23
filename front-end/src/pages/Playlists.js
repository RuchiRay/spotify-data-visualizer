import React, { useState,useEffect } from "react";
import Loader from "../components/Loader";
import { getUserPlaylists } from "../spotify";
import { catchErrors, formatTime } from "../utils";
const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const userPlaylists = await getUserPlaylists();
      setPlaylists(userPlaylists.data.items);

      setLoading(false);
    };
    catchErrors(fetchData());
  }, []);
  console.log(playlists);
  if (loading)
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  return (
    <div className="w-full ">
      <p className="text-gray-100 text-2xl mb-12 font-semibold">Your Playlist</p>
     <div className="grid gap-6 lg:gap-10 grid-cols-custom">
      {
        playlists.map((item)=>{
          const {id,images,name,tracks} = item
          return <div key={id} className='bg-[rgba(256,256,256,0.07)] cursor-pointer rounded-md   px-6 py-5'>
               <div>
                <img className="rounded-md" src={images[0].url} alt="" />
               </div>
               <p className="mt-4 text-gray-200 text-center">{name}</p>
               <p className="text-sm text-center mt-2">{tracks.total} TRACKS</p>
            </div>
        })
      }
     </div>
    </div>
  );
};

export default Playlists;
