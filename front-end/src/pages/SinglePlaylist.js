import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { SongChart } from "../components/SongChart";
import SongList from "../components/SongList";
import {
  getAudioFeature,
  getPlaylist,
  getPlaylistTracks,
  getTrackDetails,
  getTracksFeature,
} from "../spotify";
import { catchErrors, findYear, formatTime } from "../utils";

export const SinglePlaylist = () => {
  let { playlistId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlaylist(playlistId);
      const featureData = await getTracksFeature(data.data.tracks.items);
      const tracks = await getPlaylistTracks(playlistId);
      const featureArray = featureData.data.audio_features;
      const sum = featureArray.reduce(sum_reducer, 0);
      const properties = [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "speechiness",
        "valence",
      ];
      let featureObj = {};
      if(data.data.tracks.items.length>0){
        const avgArray = properties.map((property) => {
          const propertyArr = featureArray.map((item) => {
            return item[property];
          });
          const sum = propertyArr.reduce(sum_reducer, 0);
          const avg = sum / featureArray.length;
          featureObj = { ...featureObj, [property]: avg };
          return { [property]: avg };
        });
      }
     
      setDetails(data.data);
      setTracks(tracks.data.items);
      setFeatures(featureObj);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, []);
console.log(tracks);
  const sum_reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="w-full flex items-center sm:items-end flex-col sm:flex-row  gap-8 ">
        <div className="w-64 h-64 lg:w-72 lg:h-72 shrink-0">
          {details.images[0]?.url ? (
            <img src={details.images[0].url} alt="" />
          ) : (
            <div>
              <FaUser />
            </div>
          )}
        </div>
        <div className="flex items-center sm:items-start flex-col gap-3">
          <p className="text-gray-100 text-xl md:text-2xl lg:text-3xl  font-semibold">
            {details.name}
          </p>
          <p className="text-gray-300 text-xl md:text-lg  capitalize  ">
            by {details.owner.display_name}
          </p>

          {details.description.length > 0 ? (
            <p className="w-5/6 lg:w-[27rem] text-center sm:text-left">
              {details.description}
            </p>
          ) : (
            ""
          )}
          <p className="text-gray-200   capitalize  ">
            {details.tracks.items.length} tracks
          </p>
          <Link
            to={`/recommendation/${details.id}`}
            className="text-white w-max text-sm md:text-base rounded-md px-4 py-2 bg-green-600 hover:bg-green-500"
          >
            Get Recommendations
          </Link>
        </div>
      </div>
      <div className="w-full flex-col sm:flex-row justify-between flex gap-12 my-12">
        <div>
          <SongChart features={features} page="playlist" />
        </div>
        <div className="w-full">
          <ul>
            {tracks.map((item) => {
              return <SongList key={item.track.id} props={item.track} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
