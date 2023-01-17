import React, { useState, useEffect } from "react";
import { getFollowingArtist } from "../spotify";
import { catchErrors } from "../utils";
import Loader from "../components/Loader";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArtistFollowing = () => {
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const artist = await getFollowingArtist();
      setFollowing(artist.data.artists.items);
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, []);
  console.log(following);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <p className="text-gray-100 text-lg md:text-2xl mb-12 font-semibold">
        Artists You Follow
      </p>

      <div className="grid gap-8 grid-cols-custom2">
        {following.map((item) => {
          const { id, images, name } = item;
          return (
            <Link
              className="flex bg-[rgba(256,256,256,0.05)] py-4 px-4 justify-center  text-gray-200  items-center cursor-pointer min-w-[11rem] "
              key={id}
              to={`/artist/${id}`}
            >
              <div className="">
                <div className="w-40 rounded-full h-40">
                  {images[0]?.url ? (
                    <img src={images[0].url} alt="" className="rounded-full" />
                  ) : (
                    <div>
                      <FaUser />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-gray-200 ">{name}</p>
                  <p className="text-gray-400 text-xs">Artist</p>
                </div>
              </div>
            </Link>
          );
        })}
        {following.length === 0 ? <div>No data to be displayed</div> : ""}
      </div>
    </div>
  );
};

export default ArtistFollowing;
