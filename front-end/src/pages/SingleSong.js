import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { SongChart,Loader } from "../components";
import { getAudioFeature, getTrackDetails } from "../spotify";
import { catchErrors, findYear, formatTime } from "../utils";

 const SingleSong = () => {
  let { songId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackDetails(songId);
      const featureData = await getAudioFeature(songId);
      setDetails(data.data);
      setFeatures(featureData.data);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, []);
  // console.log(features);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="-m-4 lg:-m-8 xl:-m-16">
      <div className="p-4 lg:p-8 xl:p-16 w-full flex items-end  gap-8 bg-gradient-to-r from-black to-green-800">
        <div className="w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 shrink-0">
          {details.album.images[0]?.url ? (
            <img src={details.album.images[0].url} alt="" />
          ) : (
            <div>
              <FaUser />
            </div>
          )}
        </div>
        <div>
          <p className="text-gray-100 text-xl md:text-3xl lg:text-5xl font-semibold">
            {details.name}
          </p>
          <div className="flex gap-2 my-1">
            {details.artists.map((item, index) => {
              const { id, name } = item;
              return (
                <p className="text-xl font-semibold text-gray-300" key={id}>
                  {name}
                  {index < details.artists.length - 1 ? "," : ""}
                </p>
              );
            })}
          </div>
          <div className="flex gap-2 font-semibold">
            <span>{details.album.name}</span>
            &middot;
            <span>{formatTime(details.duration_ms)}</span>
            &middot;
            <span>{findYear(details.album.release_date)}</span>
          </div>
          <div className="flex mt-4 gap-6 flex-wrap">
            <a
              href={details.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white rounded-md px-4 py-2"
            >
              Play on spotify
            </a>
            <Link to={`/recSong/${details.id}`} className="text-white text-sm md:text-base rounded-md px-4 py-2 border border-gree">
              Get Recommendations
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-12">
        <div className="w-full md:w-max px-10">
          <p className="text-gray-200 text-xl text-center mb-8">
            Tracks's Audio Features{" "}
          </p>
          <SongChart features={features} page="song" />
        </div>
      </div>
    </div>
  );
};
export default SingleSong