import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getUserTracks } from "../spotify";
import { catchErrors } from "../utils";
import SongList from "../components/SongList";
const Recent = () => {
  const [likedSongs, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const liked = await getUserTracks();
      setRecent(liked.data.items);
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, []);
  console.log(likedSongs);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <p className="text-gray-100 text-lg md:text-2xl mb-12  font-semibold">
      Your Songs
      </p>
      <ul>
        {likedSongs.map((item) => {
          const { track,played_at } = item;
          const {album,artists,duration_ms,name,id} = track
          return (
           <SongList key={id} props = {track} />
          );
        })}
      </ul>
    </div>
  );
};

export default Recent;
