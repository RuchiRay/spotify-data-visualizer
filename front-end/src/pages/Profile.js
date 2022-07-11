import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  getCurrentUserProfile,
  getFollowingArtist,
  getUserPlaylists,
  getUserEpisodes,
  getUserAlbums,
  getUserTracks,
} from "../spotify";
import { catchErrors } from "../utils";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUserProfile();
      const followingArtists = await getFollowingArtist();
      const userPlaylists = await getUserPlaylists();
      const userEpisodes = await getUserEpisodes();
      const userAlbums = await getUserAlbums();
      const userTracks = await getUserTracks();
      console.log(userTracks.data);
      setPlaylists(userPlaylists.data);
      setProfile(user.data);
      setFollowing(followingArtists.data.artists.total);
      setEpisodes(userEpisodes.data);
      setAlbums(userAlbums.data);
      setLikedSongs(userTracks.data);
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, []);

  // console.log(profile.images[0].url);
  console.log(likedSongs);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-64 h-64 rounded-full  shadow-5xl flex justify-center items-center">
          <div className="w-60 h-60">
            <img src={profile.images[0].url} alt="" className="rounded-full" />
          </div>
        </div>
        <p className="text-5xl semi-bold my-8 text-green-500">
          {profile.display_name}
        </p>
        <div className="flex gap-8 text-2xl">
          {/* <div className=" bg-black/40 border-b-6 border-b-green-500 w-48 h-32"></div> */}
          <div className="bg-black/40 flex flex-col justify-center items-center w-36 h-24">
            <p className="text-green-400">{profile.followers.total}</p>
            <p className="text-base">Followers</p>
          </div>
          <div className="bg-black/40 flex flex-col justify-center items-center w-36 h-24">
            <p className="text-green-400">{following}</p>
            <p className="text-base">Following</p>
          </div>
          <div className="bg-black/40 flex flex-col justify-center items-center w-36 h-24">
            <p className="text-green-400">{playlists.total}</p>
            <p className="text-base">Playlists</p>
          </div>
          <div className="bg-black/40 flex flex-col justify-center items-center w-36 h-24">
            <p className="text-green-400">{episodes.total}</p>
            <p className="text-base">Episodes</p>
          </div>
          <div className="bg-black/40 flex flex-col justify-center items-center w-36 h-24">
            <p className="text-green-400">{albums.total}</p>
            <p className="text-base">Albums</p>
          </div>
          <div className="bg-black/40 flex flex-col justify-center items-center w-36 h-24">
            <p className="text-green-400">{likedSongs.total}</p>
            <p className="text-base">Liked Songs</p>
          </div>

          {/* <div className=" bg-[#5E2F39]  border-2 border-red-400 w-48 h-32"></div>
          <div className=" bg-[#3F305E]  border-2 border-purple-400 w-48 h-32"></div>
          <div className=" bg-[#214258]  border-2 border-blue-400 w-48 h-32"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
