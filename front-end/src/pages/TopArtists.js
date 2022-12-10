import React, { useState, useEffect } from "react";
import { getTopArtists } from "../spotify";
import { catchErrors, formatTime } from "../utils";
import Loader from "../components/Loader";
import { FaUser } from "react-icons/fa";

const TopArtists = () => {
  const [artists, setArtists] = useState(null);
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
      const TopArtists = await getTopArtists(term.range, 50);
      setArtists(TopArtists.data.items);
      console.log(TopArtists.data);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, [term]);
  console.log(artists);
  if (loading)
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline">
        <p className="text-gray-100 text-2xl mb-12 font-semibold">
          Your Top Artists
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
      <div className="flex flex-wrap">
        {artists.map((item) => {
          const { id, images, name } = item;
          return (
            <div
              className="flex  py-3  hover:bg-[rgba(256,256,256,0.07)] text-gray-200  items-center cursor-pointer w-32 h-32"
              key={id}
            >
              <div className="flex items-center">
                <div className="w-16 h-16">
                  {images[0]?.url ? (
                    <img src={images[0].url} alt="" />
                  ) : (
                    <div>
                      <FaUser />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-gray-200 ">{name}</p>
                </div>
              </div>
            </div>
          );
        })}
        {
          artists.length===0? <div>
            No data to be displayed
          </div>:""
        }
      </div>
    </div>
  );
};

export default TopArtists;
