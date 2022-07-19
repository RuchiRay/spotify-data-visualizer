import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  getCurrentUserProfile,
  getFollowingArtist,
  getUserPlaylists,
  getUserEpisodes,
  getUserAlbums,
  getUserTracks,
  getTopArtists,
  getTopTracks,
  getMorePlaylists
} from "../spotify";
import { catchErrors, formatTime } from "../utils";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUserProfile();
      const followingArtists = await getFollowingArtist();
      const userPlaylists = await getUserPlaylists();
      const userEpisodes = await getUserEpisodes();
      const userAlbums = await getUserAlbums();
      const userTracks = await getUserTracks();
      const userTopTracks = await getTopTracks("short_term", 4);
      const userTopArtists = await getTopArtists();
      const morePlaylists = await getMorePlaylists(user.data.id)
      setPlaylists(userPlaylists.data);
      setProfile(user.data);
      setFollowing(followingArtists.data.artists.total);
      setEpisodes(userEpisodes.data);
      setAlbums(userAlbums.data);
      setLikedSongs(userTracks.data);
      setTopTracks(userTopTracks.data.items);
      setTopArtists(userTopArtists.data.items);

      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, []);
 
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
        <p className="text-5xl semi-bold my-12 text-green-500">
          {profile.display_name}
        </p>
        <div className="flex gap-8 text-2xl">
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
        <div className="flex mt-16 gap-16 justify-between w-full">
          <div className="w-[500px] shrink-0  ">
            <div className="flex mb-8 text-gray-100 justify-between items-center w-full">
              <p className="text-2xl  font-medium">Top artists this month</p>
              <Link
                to="top-artists"
                className="hover:underline text-gray-300 hover:text-gray-100 cursor-pointer"
              >
                See all
              </Link>
            </div>
            <div className="-ml-4 flex flex-col">
              {topArtists.map((item) => {
                const { id, images, name } = item;
                return (
                  <div
                    className="flex py-3 px-4 hover:bg-black/40 text-gray-200  items-center cursor-pointer"
                    
                    key={id}
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
                    <p className="ml-4">{name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            <div className="flex mb-8 text-gray-100 justify-between items-center w-full">
              <p className="text-2xl  font-medium">Top tracks this month</p>
              <Link
                to="top-artists"
                className="hover:underline text-gray-300 hover:text-gray-100 cursor-pointer"
              >
                See all
              </Link>
            </div>
            <div className="-ml-4 flex flex-col">
              {topTracks.map((item) => {
                const { album, artists, duration_ms, id, name } = item;
                return (
                  <div
                    className="flex justify-between py-3 px-4 hover:bg-black/40 text-gray-200  items-center cursor-pointer"
                    key={id}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16">
                        {album?.images[0]?.url ? (
                          <img src={album.images[0].url} alt="" />
                        ) : (
                          <div>
                            <FaUser />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-200 ">{name}</p>
                        <div className="text-gray-400 text-sm flex gap-2">
                          {artists.map((item, index) => {
                            return <p key={item.id}>{item.name}{index===artists.length-1?'':','}</p>;
                          })}
                          <p>.{album.name}</p>
                        </div>
                      </div>
                    </div>
                    <div>{formatTime(duration_ms)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className="flex w-full">
            <p className="text-2xl font-medium text-gray-100">Playlists</p>
          </div>
         <div className="flex gap-5 mt-10">
         {
          playlists.items.map((item)=>{
            const {id,images,name} = item
            return <div key={id} className='bg-black/40 w-56 h-72 p-4'>
               <div>
                <img src={images[0].url} alt="" />
               </div>
               <p className="mt-4 text-gray-200">{name}</p>
            </div>
          })
         }
         </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
