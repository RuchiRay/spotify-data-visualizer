import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SongList from "../components/SongList";
import { getRecommendationFromSongs, getTrackDetails } from "../spotify";
import { catchErrors } from "../utils";

export const RecommendationFromSong = () => {
  let { recSongId } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [tracks, setTracks] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackDetails(recSongId);
      const seed_artists = getArtistId(data.data.artists);
      const seed_tracks = data.data.id
      const songs = await getRecommendationFromSongs(seed_artists,seed_tracks)
      setName(data.data.name);
      setTracks(songs.data.tracks)
      setLoading(false);
      console.log(songs.data.tracks);
    
    };
    catchErrors(fetchData());
    const getArtistId = (array) => {
      const arr = array.map((item) => {
        return item.id;
      });
      return arr.join(',');
    };
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {" "}
      <p className="text-xl font-semibold text-gray-100 mb-12">
        Recommendation based on{" "}
        <span className="text-green-500 text-2xl">{name}</span>
      </p>
      <ul>
        {tracks.map((item) => {
          return <SongList key={item.id} props={item} />;
        })}
      </ul>
    </div>
  );
};
