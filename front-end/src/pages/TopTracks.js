import React, { useState, useEffect } from "react";
import { getTopTracks } from "../spotify";
import { catchErrors ,formatTime} from "../utils";
import Loader from "../components/Loader";
import { FaUser } from "react-icons/fa";

const TopTracks = () => {
  const [tracks, setTracks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState({ name: "All Time", range: "long_term" });
  const terms = [
    { id: "1", name: "All Time", range: "long_term" },
    { id: "2", name: "Last 6 months", range: "medium_term" },
    { id: "3", name: "Last 4 weeks", range: "short_term" },
  ];
  const handleTab = (item) => {
    setTerm(item);
  };
  useEffect(() => {
    const fetchData = async () => {
      const topTracks = await getTopTracks(term.range, 50);
      setTracks(topTracks.data.items);
      console.log(topTracks.data);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, [term]);
  if (loading)
    return (
      <div className="w-full flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline">
        <p className="text-gray-100 text-2xl mb-12 font-semibold">
          Your Playlist
        </p>
        <div className="flex gap-8 text-gray-100">
          {terms.map((item) => {
            return (
              <button
                key={item.id}
                className={`${
                  term.name === item.name && `bg-green-500`
                } border-0 cursor-pointer rounded-md border-gray-300 px-4 py-2 `}
                onClick={() => handleTab(item)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        {tracks.map((item) => {
          const { album, artists, duration_ms, id, name } = item;
          return (
            <div
              className="flex justify-between py-3  hover:bg-[rgba(256,256,256,0.07)] text-gray-200  items-center cursor-pointer overflow-hidden w-full"
              key={id}
            >
              <div className="flex items-center">
                <div className="w-16 h-16">
                  {album?.images[0]?.url ? (
                    <img src={album.images[0].url} alt="" />
                  ) : (
                    <div>
                      <FaUser />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-gray-200 ">{name}</p>
                  {/* <div className="text-gray-400 text-sm whitespace-nowrap"> */}
                  <div className="text-gray-400 text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-lg ">
                    {artists.map((item, index) => {
                      return (
                        <span key={item.id}>
                          {item.name}
                          {index === artists.length - 1 ? "" : ","}
                        </span>
                      );
                    })}
                    <span>|{album.name}</span>
                  </div>
                </div>
              </div>
              <div>{formatTime(duration_ms)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopTracks;
