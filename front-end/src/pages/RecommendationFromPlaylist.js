import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SongList from "../components/SongList";
import {
  getPlaylist,
  getPlaylistTracks,
  getRecommendationFromPlaylist,
} from "../spotify";
import { catchErrors } from "../utils";

export const RecommendationFromPlaylist = () => {
  let { recId } = useParams();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const tracks = await getPlaylistTracks(recId);
      const playlist = await getPlaylist(recId);
      const recData = await getRecommendationFromPlaylist(tracks.data.items);
      setSongs(recData.data.tracks);
      setName(playlist.data.name);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <p className="text-xl font-semibold text-gray-100 mb-12">
        Recommendation based on{" "}
        <span className="text-green-500 text-2xl">{name}</span>
      </p>
      <ul>
        {songs.map((item) => {
          return <SongList key={item.id} props={item} />;
        })}
      </ul>
    </div>
  );
};
