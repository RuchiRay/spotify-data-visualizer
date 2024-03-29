import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { Alert, Loader, SongList } from "../components";
import {
  addItemsToPlaylist,
  createPlaylist,
  getCurrentUserProfile,
  getPlaylist,
  getPlaylistTracks,
  getRecommendationFromPlaylist,
} from "../spotify";
import { catchErrors } from "../utils";

 const RecommendationFromPlaylist = () => {
  let { recId } = useParams();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [userId, setUserId] = useState("");
  const [recPlaylistId, setRecPlaylistId] = useState("");
  const [showLinkButton, setShowLinkButton] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const tracks = await getPlaylistTracks(recId);
      const playlist = await getPlaylist(recId);
      const recData = await getRecommendationFromPlaylist(tracks.data.items);
      const user = await getCurrentUserProfile();
      setUserId(user.data.id);
      setSongs(recData.data.tracks);
      setName(playlist.data.name);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, []);

  const addPlaylist = async () => {
    console.log("click");
    const req = {
      name: `Recommended tracks based on ${name}`,
      description: ``,
    };
    const createdPlaylist = await createPlaylist(req, userId);
    const playlistId = createdPlaylist.data.id;
    setRecPlaylistId(playlistId);
    let uris = songs.map((item) => {
      return item.uri;
    });
    uris = uris.join(",");
    const added = await addItemsToPlaylist(uris, playlistId);
    setShowAlert(true);
    setShowLinkButton(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    console.log(added);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="relative">
      <div className="flex gap-4 mb-12 flex-wrap w-full justify-between">
        {showAlert ? <Alert /> : ""}
        <p className="text-base lg:text-xl font-semibold text-gray-100 ">
          Recommendation based on{" "}
          <span className="text-green-500 text-lg lg:text-2xl">{name}</span>
        </p>
        {showLinkButton ? (
          <a
            href={`https://open.spotify.com/playlist/${recPlaylistId}`}
            className="border border-white px-4 py-2 rounded-md h-max text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Spotify
          </a>
        ) : (
          <button
            onClick={addPlaylist}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md h-max text-white"
          >
            Save this playlist
          </button>
        )}
      </div>

      <ul>
        {songs.map((item) => {
          return <SongList key={item.id} props={item} />;
        })}
      </ul>
    </div>
  );
};
export default RecommendationFromPlaylist