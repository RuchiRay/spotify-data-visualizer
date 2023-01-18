import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getUserPlaylists } from "../spotify";
import { catchErrors } from "../utils";
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
  if (loading) return <Loader />;
  return (
    <div className="w-full ">
      <p className="text-gray-100 text-2xl mb-12 font-semibold">
        Your Playlist
      </p>
      <div className="grid gap-6 lg:gap-10 grid-cols-custom">
        {playlists.map((item) => {
          const { id, images, name, tracks } = item;
          return (
            <Link
              key={id}
              to={`/playlist/${id}`}
              className="bg-[rgba(256,256,256,0.07)] flex flex-col items-center cursor-pointer rounded-md   px-6 py-5"
            >
              <div className="w-[15rem] h-[15rem]">
                {images[0]?.url ? (
                    <img src={images[0].url} alt="" className="rounded-md" />
                  ) : (
                    <div>
                      <FaUser />
                    </div>
                  )}
              </div>
              <p className="mt-4 text-gray-200 text-center">{name}</p>
              <p className="text-sm text-center mt-2">{tracks.total} TRACKS</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
