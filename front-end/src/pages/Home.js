import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { BsSpotify } from "react-icons/bs";
import { FaUser, FaMusic } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { GiMusicalScore, GiMicrophone } from "react-icons/gi";
import { logout } from "../spotify";
const Home = () => {
  return (
    <div className="flex w-full text-gray-400">
      <div className="bg-black h-screen min-h-[550px] flex flex-col items-center justify-between py-8 w-28  sticky shrink-0 top-0 left-0 text-sm">
        <div>
          <BsSpotify className="text-green-500 text-6xl" />
        </div>
        <div className="flex flex-col gap-2 w-full items-center">
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
            <p> Top Tracks</p>
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
            <p> Top Artists</p>
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
        </div>
        <div>
          <button  onClick={logout}>LOGOUT</button>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
