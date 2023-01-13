import React from 'react'
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { catchErrors ,formatTime} from "../utils";

const SongList = ({props}) => {
    const {album,artists,duration_ms,name,id} = props
    return (
        <li className=''>
          <Link to={`/songs/${id}`} className="mb-6 first-grid hover:bg-[rgba(256,256,256,0.09)]">
            {/* first div for pic */}
            <div>
              <div className="inline-block relative w-14 h-14 mr-5">
                {album?.images[0]?.url ? (
                  <img src={album.images[0].url} alt="" />
                ) : (
                  <div>
                    <FaUser />
                  </div>
                )}
              </div>
            </div>
            {/* second div for info */}
            <div className="second-grid">
              <span className="overflow-hidden text-ellipsis whitespace-nowrap pr-[1px]">
                <span className="mb-[5px] text-gray-200 text-sm md:text-base">
                  {name}
                </span>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap pr-[1px]text-gray-400 text-sm mt-[3px]">
                  {artists.map((item, index) => {
                    return (
                      <span  key={item.id}>
                        {item.name}
                        {index === artists.length - 1 ? "" : ","}&nbsp;{" "}
                      </span>
                    );
                  })}
                  | {album.name}
                </div>
              </span>
              <span>{formatTime(duration_ms)}</span>
            </div>
          </Link>
        </li>
      );
}

export default SongList