import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SongList from "../components/SongList";
import {
  addItemsToPlaylist,
  createPlaylist,
  getCurrentUserProfile,
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
  const [showAlert, setShowAlert] = useState(false);
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const tracks = await getPlaylistTracks(recId);
      const playlist = await getPlaylist(recId);
      const recData = await getRecommendationFromPlaylist(tracks.data.items);
      const user = await getCurrentUserProfile()
      setUserId(user.data.id)
      setSongs(recData.data.tracks);
      setName(playlist.data.name);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, []);

  const addPlaylist = async() => {
    console.log("click");
    const req = {
      name: `Recommended tracks based on ${name}`,
      description: ``,
    };
    const createdPlaylist = await createPlaylist(req,userId)
    const playlistId = createdPlaylist.data.id
    let uris = songs.map((item)=>{
      return item.uri
    })
    uris = uris.join(',')
    const added = await addItemsToPlaylist(uris,playlistId)
    console.log(added);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold text-gray-100 mb-12">
          Recommendation based on{" "}
          <span className="text-green-500 text-2xl">{name}</span>
        </p>
        <button
          onClick={addPlaylist}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md h-max text-white"
        >
          Save this playlist
        </button>
      </div>

      <ul>
        {songs.map((item) => {
          return <SongList key={item.id} props={item} />;
        })}
      </ul>
    </div>
  );
};
