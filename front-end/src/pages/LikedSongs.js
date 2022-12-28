import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getUserTracks } from "../spotify";
import { catchErrors ,formatTime} from "../utils";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
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
            <li key={id}>
              <Link to="top-tracks" className="mb-6 first-grid">
                {/* first div for pic */}
                <div>
                  <div className="inline-block relative w-16 h-16 mr-5">
                    {album?.images[0]?.url ? (
                      <img src={album.images[0].url} alt="" />
                    ) : (
                      <div>
                        <FaUser />
                      </div>
                    )}
                  </div>
                </div>
                {/* second div for info */}
                <div className="second-grid">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap pr-[1px]">
                    <span className="mb-[5px] text-gray-200 text-sm md:text-base">
                      {name}
                    </span>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap pr-[1px]text-gray-400 text-sm mt-[3px]">
                      {artists.map((item, index) => {
                        return (
                          <span key={item.id}>
                            {item.name}
                            {index === artists.length - 1 ? "" : ","}&nbsp;{" "}
                          </span>
                        );
                      })}
                      | {album.name}
                    </div>
                  </span>
                  <span>{formatTime(duration_ms)}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Recent;
