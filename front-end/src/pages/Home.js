import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { BsSpotify,BsFillEmojiHeartEyesFill,BsFillHeartFill } from "react-icons/bs";
import { FaUser, FaMusic } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { GiMusicalScore, GiMicrophone } from "react-icons/gi";
import { logout } from "../spotify";
const Home = () => {
  return (
    <div className="flex flex-col-reverse w-full text-gray-400">
      <div className="bg-black md:h-screen md:min-h-[650px] flex md:flex-col items-center justify-between md:py-8 md:w-28  sticky shrink-0 bottom-0 md:top-0 md:left-0 text-sm w-full">
        <div className="hidden">
          <BsSpotify className="text-green-500 text-5xl" />
        </div>
        <div className="flex text-center md:flex-col text-[0.65rem] md:text-xs justify-between w-full items-baseline">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` flex flex-col items-center justify-center w-20 h-20 ${
                isActive &&
                "bg-[#181818] border-b-6 border-b-green-500 rounded-md text-white"
              }`
            }
           
          >
            <div className="pb-1">
              <FaUser />
            </div>
            <p>Profile</p>
          </NavLink>
          <NavLink
            to="playlists"
            className={({ isActive }) =>
              ` flex flex-col items-center justify-center w-20 h-20 ${
                isActive &&
                "bg-[#181818] border-b-6 border-b-green-500 rounded-md text-white"
              }`
            }
          >
            <div className="pb-1 text-xl">
              <FaMusic />
            </div>
            <p>Playlists</p>
          </NavLink>

          <NavLink
            to="top-tracks"
            className={({ isActive }) =>
              ` flex flex-col items-center justify-center w-20 h-20 ${
                isActive &&
                "bg-[#181818] border-b-6 border-b-green-500 rounded-md text-white"
              }`
            }
          >
            <div className="text-2xl pb-1">
              <GiMusicalScore />
            </div>
            <p className="leading-4"> Top Tracks</p>
          </NavLink>
          <NavLink
            to="top-artists"
            className={({ isActive }) =>
            ` flex flex-col items-center justify-center w-20 h-20 ${
              isActive &&
              "bg-[#181818] border-b-6 border-b-green-500 rounded-md text-white"
            }`
          }
          >
            <div className="text-3xl pb-1">
              <GiMicrophone />
            </div>
            <p className="leading-4"> Top Artists</p>
          </NavLink>
          <NavLink
            to="recent"
            className={({ isActive }) =>
            ` flex flex-col items-center justify-center w-20 h-20 ${
              isActive &&
              "bg-[#181818] border-b-6 border-b-green-500 rounded-md text-white"
            }`
          }
          >
            <div className="text-2xl pb-1">
              <BiTime />
            </div>
            <p>Recent</p>
          </NavLink>
          <NavLink
            to="artists-following"
            className={({ isActive }) =>
            ` flex flex-col items-center justify-center w-20 h-20 ${
              isActive &&
              "bg-[#181818] border-b-6 border-b-green-500 rounded-md text-white"
            }`
          }
          >
            <div className="text-2xl pb-1">
              <BsFillEmojiHeartEyesFill />
            </div>
            <p className="text-center leading-4">Artist Following</p>
          </NavLink>
          <NavLink
            to="liked-songs"
            className={({ isActive }) =>
            ` flex flex-col items-center justify-center w-20 h-20 ${
              isActive &&
              "bg-[#181818] border-b-6 border-b-green-500 rounded-md text-white"
            }`
          }
          >
            <div className="text-2xl pb-1">
              <BsFillHeartFill />
            </div>
            <p className="text-center leading-4">Liked Songs</p>
          </NavLink>
        </div>
        {/* <div>
          <button  onClick={logout}>LOGOUT</button>
        </div> */}
      </div>
      <div className="w-full p-4 lg:p-8 xl:p-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
