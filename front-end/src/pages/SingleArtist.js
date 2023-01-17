import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import SongList from "../components/SongList";
import {
  checkFollow,
  getArtist,
  getArtistsTopSongs,
  getRelatedArtists,
} from "../spotify";
import { catchErrors, formatNumber } from "../utils";
 const SingleArtist = () => {
  let { artistId } = useParams();
  const [artist, setArtist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);
  const [show, setShow] = useState(false);
  const [showValue, setShowValue] = useState(5);
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const data = await getArtist(artistId);
      const val = await checkFollow(data.data.id);
      let songdata = await getArtistsTopSongs(data.data.id);
      const related = await getRelatedArtists(data.data.id);
      console.log(related.data);
      setRelatedArtists(related.data.artists);
      songdata = songdata.data.tracks;
      const newsongdata = songdata.slice(0, 5);
      setArtist(data.data);
      setFollow(val);
      setSongs(newsongdata);
      setLoading(false);
    };
    catchErrors(fetchData());
  }, [artistId]);
  const toggleArtists = () => {
    setShow(!show);
  };
  useEffect(() => {
   if(show)
   setShowValue(20)
   else
   setShowValue(5)
  }, [show])
  
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="-m-4 lg:-m-8 xl:-m-16">
      <div className="p-4 lg:p-8 xl:p-16 w-full flex items-end  gap-8 bg-gradient-to-r from-black to-gray-400">
        <div className=" w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 shrink-0">
          {artist.images[0]?.url ? (
            <img src={artist.images[0].url} alt="" />
          ) : (
            <div>
              <FaUser />
            </div>
          )}
        </div>
        <div>
          <p className="text-gray-100 text-3xl md:text-6xl lg:text-8xl font-semibold">{artist.name}</p>
          <div className="text-gray-100 text-lg">
            <span>{formatNumber(artist.followers.total)} </span>
            <span>Followers</span>
          </div>
        </div>
      </div>
      <div className="p-4 lg:p-8 xl:px-16">
        <div className="flex items-center flex-wrap gap-4 my-12 ">
          <p>
            <span>Popularity</span>{" "}
            <span className="text-xl text-gray-200">{artist.popularity}%</span>
          </p>

          <button className="border text-green-500 text-sm uppercase border-green-500 px-4 py-2 rounded-md ">
            {follow ? "following" : "follow"}
          </button>

          <div className="flex items-center flex-wrap gap-4 ">
            <p>Genre</p>
            <ul className="flex flex-wrap gap-8 ml-4">
              {artist.genres.map((item, index) => {
                return (
                  <li
                    className="list-disc capitalize text-gray-200"
                    key={index}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-gray-100 text-lg md:text-2xl mb-12  font-semibold">
            Popular songs
          </p>
          <ul>
            {songs.map((item) => {
              const { album, artists, duration_ms, id, name } = item;
              return <SongList key={id} props={item} />;
            })}
          </ul>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="text-gray-100 text-lg md:text-2xl my-12  font-semibold">
              Fans also like
            </p>
            <button
              onClick={toggleArtists}
              className="hover:underline text-sm lg:text-base text-gray-300 hover:text-gray-100 cursor-pointer"
            >
              {show?'See less':'See more'}
            </button>
          </div>
          <div className="grid gap-8 grid-cols-custom2">
            {relatedArtists.map((item, index) => {
              const { id, images, name } = item;
              return (
                <Link
                  className={
                    index < showValue
                      ? "flex bg-[rgba(256,256,256,0.05)] hover:bg-[rgba(256,256,256,0.09)] py-4 px-4 justify-center hover:shadow-lg transition-all rounded-md duration-300  text-gray-200  items-center cursor-pointer min-w-[11rem] "
                      : "hidden"
                  }
                  key={id}
                  to={`/artist/${id}`}
                >
                  <div className="">
                    <div className="w-40 rounded-full h-40">
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
                    <div className="mt-4">
                      <p className="text-gray-200 ">{name}</p>
                      <p className="text-gray-400 text-xs">Artist</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleArtist