import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Loader, SongList } from "../components";
import {
  addItemsToPlaylist,
  getCurrentUserProfile,
  createPlaylist,
  getRecommendationFromSongs,
  getTrackDetails,
} from "../spotify";
import { catchErrors } from "../utils";

export const RecommendationFromSong = () => {
  let { recSongId } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [tracks, setTracks] = useState([]);
  const [userId, setUserId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [recPlaylistId, setRecPlaylistId] = useState("");
  const [showLinkButton, setShowLinkButton] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackDetails(recSongId);
      const seed_artists = getArtistId(data.data.artists);
      const seed_tracks = data.data.id;
      const songs = await getRecommendationFromSongs(seed_artists, seed_tracks);
      const user = await getCurrentUserProfile();
      setUserId(user.data.id);
      setName(data.data.name);
      setTracks(songs.data.tracks);
      setLoading(false);
      console.log(songs.data.tracks);
    };
    catchErrors(fetchData());
    const getArtistId = (array) => {
      console.log(array);
      let newArray = [...array];
      if (array.length >= 5) newArray = array.slice(0, 4);
      console.log(array);
      const arr = newArray.map((item) => {
        return item.id;
      });
      return arr.join(",");
    };
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
    let uris = tracks.map((item) => {
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
        {tracks.map((item) => {
          return <SongList key={item.id} props={item} />;
        })}
      </ul>
    </div>
  );
};
