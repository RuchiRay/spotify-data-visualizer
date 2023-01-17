import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getRecentlyPlayed } from "../spotify";
import { catchErrors } from "../utils";
import SongList from "../components/SongList";
const Recent = () => {
  const [recent, setRecent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const recently = await getRecentlyPlayed();
      setRecent(recently.data.items);
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, []);
  console.log(recent);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <p className="text-gray-100 text-lg md:text-2xl mb-12  font-semibold">
        Recently Played
      </p>
      <ul>
        {recent.map((item) => {
          const { track,played_at } = item;
          return (
           <SongList key={played_at} props={track}/>
          );
        })}
      </ul>
    </div>
  );
};

export default Recent;
