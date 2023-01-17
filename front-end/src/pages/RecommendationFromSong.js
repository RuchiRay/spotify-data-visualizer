import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SongList from "../components/SongList";
import { addItemsToPlaylist,getCurrentUserProfile ,createPlaylist, getRecommendationFromSongs, getTrackDetails } from "../spotify";
import { catchErrors } from "../utils";

export const RecommendationFromSong = () => {
  let { recSongId } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [tracks, setTracks] = useState([]);
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackDetails(recSongId);
      const seed_artists = getArtistId(data.data.artists);
      const seed_tracks = data.data.id;
      const songs = await getRecommendationFromSongs(seed_artists, seed_tracks);
      const user = await getCurrentUserProfile()
      setUserId(user.data.id)
      setName(data.data.name);
      setTracks(songs.data.tracks);
      setLoading(false);
      console.log(songs.data.tracks);
    };
    catchErrors(fetchData());
    const getArtistId = (array) => {
      console.log(array);
      let newArray = [...array];
      if (array.length>=5)
    newArray = array.slice(0,4)
      console.log(array);
      const arr = newArray.map((item) => {
        return item.id;
      });
      return arr.join(",");
    };
  }, []);

  const addPlaylist = async() => {
    console.log("click");
    const req = {
      name: `Recommended tracks based on ${name}`,
      description: ``,
    };
    const createdPlaylist = await createPlaylist(req,userId)
    const playlistId = createdPlaylist.data.id
    let uris = tracks.map((item)=>{
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
        {tracks.map((item) => {
          return <SongList key={item.id} props={item} />;
        })}
      </ul>
    </div>
  );
};
