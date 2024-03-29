import React, { useEffect, useState } from "react";
import { getUserTracks } from "../spotify";
import { catchErrors } from "../utils";
import {SongList,Loader} from "../components";
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
          const { track } = item;
          const {id} = track
          return (
           <SongList key={id} props = {track} />
          );
        })}
      </ul>
    </div>
  );
};

export default Recent;
