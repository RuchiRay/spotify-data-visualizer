import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  getCurrentUserProfile,
  getFollowingArtist,
  getUserPlaylists,
  getUserAlbums,
  getUserTracks,
  getTopArtists,
  getTopTracks,
  logout,
} from "../spotify";
import { catchErrors } from "../utils";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import SongList from "../components/SongList";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUserProfile();
      const followingArtists = await getFollowingArtist();
      const userPlaylists = await getUserPlaylists();
      const userAlbums = await getUserAlbums();
      const userTracks = await getUserTracks();
      const userTopTracks = await getTopTracks("long_term", 10);
      const userTopArtists = await getTopArtists("long_term", 10);
      // const morePlaylists = await getMorePlaylists(user.data.id);
      setPlaylists(userPlaylists.data);
      setProfile(user.data);
      setFollowing(followingArtists.data.artists.total);
      setAlbums(userAlbums.data);
      setLikedSongs(userTracks.data);
      setTopTracks(userTopTracks.data.items);
      setTopArtists(userTopArtists.data.items);
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mt-8 md:mt-0 w-36 h-36 sm:w-48 sm:h-48  lg:w-64 lg:h-64 rounded-full bg-[rgba(256,256,256,0.07)] shadow-5xl flex justify-center items-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-60 lg:h-60">
            {profile.images[0].url ? (
              <img
                src={profile.images[0].url}
                alt=""
                className="rounded-full"
              />
            ) : (
              <div>
                <FaUser />
              </div>
            )}
          </div>
        </div>
        <p className="text-3xl md:text-5xl semi-bold my-6 md:my-6 text-green-500">
          {profile.display_name}
        </p>
        <button
          onClick={() => logout()}
          className="rounded-md border border-green-500 text-white px-8 hover:bg-green-500 py-1 mb-6"
        >
          Logout
        </button>
        <div className="flex flex-wrap justify-center gap-8 text-lg md:text-2xl">
          <div className="bg-[rgba(256,256,256,0.07)] flex flex-col justify-center items-center  w-28 h-20 md:w-36 md:h-24">
            <p className="text-green-400">{profile.followers.total}</p>
            <p className="text-base">Followers</p>
          </div>
          <div className="bg-[rgba(256,256,256,0.07)] flex flex-col justify-center items-center w-28 h-20 md:w-36 md:h-24">
            <p className="text-green-400">{following}</p>
            <p className="text-base">Following</p>
          </div>
          <div className="bg-[rgba(256,256,256,0.07)] flex flex-col justify-center items-center w-28 h-20 md:w-36 md:h-24">
            <p className="text-green-400">{playlists.total}</p>
            <p className="text-base">Playlists</p>
          </div>
          {/* <div className="bg-[rgba(256,256,256,0.07)] flex flex-col justify-center items-center w-28 h-20 md:w-36 md:h-24">
            <p className="text-green-400">{episodes.total}</p>
            <p className="text-base">Episodes</p>
          </div> */}
          <div className="bg-[rgba(256,256,256,0.07)] flex flex-col justify-center items-center w-28 h-20 md:w-36 md:h-24">
            <p className="text-green-400">{albums.total}</p>
            <p className="text-base">Albums</p>
          </div>
          <div className="bg-[rgba(256,256,256,0.07)] flex flex-col justify-center items-center w-28 h-20 md:w-36 md:h-24">
            <p className="text-green-400">{likedSongs.total}</p>
            <p className="text-base">Liked Songs</p>
          </div>

          {/* <div className=" bg-[#5E2F39]  border-2 border-red-400 w-48 h-32"></div>
          <div className=" bg-[#3F305E]  border-2 border-purple-400 w-48 h-32"></div>
          <div className=" bg-[#214258]  border-2 border-blue-400 w-48 h-32"></div> */}
        </div>
        <div className="flex w-full flex-col md:flex-row mt-16 gap-16  justify-center">
          <div className="md:w-3/5 lg:min-w-[24rem] ">
            <div className="flex mb-8 text-gray-100 justify-between items-center w-full">
              <p className="text-lg lg:text-2xl  font-medium">
                Top artists of all time
              </p>
              <Link
                to="top-artists"
                className="hover:underline text-sm lg:text-base text-gray-300 hover:text-gray-100 cursor-pointer"
              >
                See all
              </Link>
            </div>
            <div className="-ml-4 flex flex-col">
              {topArtists.map((item) => {
                const { id, images, name } = item;
                return (
                  <Link
                    className="flex py-3 px-4 hover:bg-[rgba(256,256,256,0.07)] text-gray-200  items-center cursor-pointer"
                    key={id}
                    to={`artist/${id}`}
                  >
                    <div className="w-16 h-16">
                      {images[0]?.url ? (
                        <img
                          src={images[0].url}
                          alt=""
                          className="rounded-full"
                        />
                      ) : (
                        <div>
                          <FaUser />
                        </div>
                      )}
                    </div>
                    <p className="ml-4 text-sm md:text-base">{name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            <div className="flex mb-8 text-gray-100 justify-between items-center">
              <p className="text-lg lg:text-2xl  font-medium">
                Top tracks of all time
              </p>
              <Link
                to="top-tracks"
                className="hover:underline text-sm lg:text-base text-gray-300 hover:text-gray-100 cursor-pointer"
              >
                See all
              </Link>
            </div>
            <ul>
              {topTracks.map((item) => {
                const {  id } = item;
                return <SongList key={id} props={item} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
