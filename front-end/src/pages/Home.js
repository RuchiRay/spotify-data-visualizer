import React from "react";
import { Outlet } from "react-router-dom";
import { BsSpotify } from "react-icons/bs";
import { logout } from "../spotify";
const Home = () => {
  return (
    <div className="flex text-gray-400">
      <div className="bg-black h-screen flex flex-col items-center justify-between py-8 w-28  sticky shrink-0 top-0 left-0">
        <div>
          <BsSpotify className="text-green-500 text-6xl" />
        </div>
        <div className="flex flex-col ">
          <div>profile</div>
          <div>top-artist</div>
          <div>top tracks</div>
          <div>playlist</div>
          <div>recent</div>
        </div>
        <div>
          <button onClick={logout}>LOGOUT</button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
