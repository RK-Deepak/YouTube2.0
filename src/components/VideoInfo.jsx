import React, { useState } from "react";
// import { copiedObject } from '../utils/constant'
import { abbreviateNumber } from "js-abbreviation-number";
import { VscThumbsdown, VscThumbsup } from "react-icons/vsc";
import Linkify from "react-linkify";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const VideoInfo = ({ videodetail }) => {
  const [showmore, setshowmore] = useState(false);
  let copiedObject = videodetail;



  return (
    <div className="text-white p-2 flex flex-col gap-3">
      <p className=" text-sm sm:text-lg">{copiedObject?.title}</p>
      <div className="flex justify-between px-2 flex-col gap-[12px] sm:flex-row sm:gap-0">
        <div className="flex gap-3 w-fit items-center">
          <img
            src={copiedObject?.author?.avatar[0]?.url}
            className="w-[35px] h-fit rounded-full"
          />
          <Link to={`/channel/${copiedObject?.author?.channelId}`}>
            <div className="flex flex-col ">
              <span className="text-xs text-slate-500 font-bold ">
                {copiedObject?.author?.title}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold ">
                {abbreviateNumber(copiedObject?.author?.stats?.subscribers)}
              </span>
            </div>
          </Link>
          <button className="font-semibold px-2 py-1 text-sm bg-white text-black rounded-full ">
            Subscribe
          </button>
        </div>
        <div className="flex gap-2 items-center px-2  bg-slate-400 text-black font-semibold w-fit rounded-full">
          <div className="flex gap-1 items-center border-r-2 pr-2">
            <VscThumbsup />
            {abbreviateNumber(copiedObject?.stats?.likes)}
          </div>
          <div>
            <VscThumbsdown />
          </div>
        </div>
      </div>
      <div className="flex gap-1  text-xs text-slate-700 flex-col bg-slate-100 p-2 rounded-md">
        <div className="flex flex-row gap-1 ">
          <span>{abbreviateNumber(copiedObject?.stats?.views)} views , </span>
          {dayjs(copiedObject?.publishedDate).format("MMMM D, YYYY")}
        </div>
        <p
          onClick={() => setshowmore((prev) => !prev)}
          className="font-bold text-black"
        >
          {!showmore ? "Show More..." : "Show Less..."}
        </p>

        {showmore && (
          <div className=" text-justify custom_link ">
            <span className=" text-red-800 font-bold">Description:-</span>
            <Linkify>{copiedObject?.description}</Linkify>
            <br></br>
            <span className=" text-red-800 font-bold">Keywords:-</span>
            {Array.from(copiedObject?.keywords).map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInfo;
