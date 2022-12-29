import React, { useState, useEffect } from "react";
import { getTopTracks } from "../spotify";
import { catchErrors ,formatTime} from "../utils";
import Loader from "../components/Loader";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import SongList from "../components/SongList";

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
        <Loader />
    );
  return (
    <div className="w-full">
      <div className="flex gap-4 mb-12 flex-wrap justify-between items-baseline">
        <p className="text-gray-100 text-lg md:text-2xl  font-semibold">
          Your Playlist
        </p>
        <div className="flex gap-2 flex-wrap md:gap-8 text-gray-100">
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
      <ul>
              {tracks.map((item) => {
                const { album, artists, duration_ms, id, name } = item;
                return (
                <SongList key={id} props ={item}/>
                );
              })}
            </ul>
    </div>
  );
};

export default TopTracks;
