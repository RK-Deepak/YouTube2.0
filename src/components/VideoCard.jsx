import React from "react";

import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const VideoCard = ({ eachvideo, pageName }) => {
  return (
    eachvideo && (
      <Link to={`/video/${eachvideo?.videoId}`}>
        <div
          className={`p-2 border rounded-md flex overflow-hidden gap-1 ${
            pageName !== "video"
              ? "w-[320px] h-[250px] flex-col"
              : "w-[320px]  flex-row "
          } `}
        >
          <img
            src={eachvideo?.thumbnails[0]?.url}
            className={`${
              pageName !== "video"
                ? "w-[320px] h-[140px] rounded-md mb-2"
                : "w-[190px] aspect-auto rounded-md mb-2"
            } `}
          />
          <div className=" flex flex-col gap-1">
            <div className="flex gap-2 flex-start">
              {pageName !== "video" && (
                <img
                  src={eachvideo?.author?.avatar[0]?.url}
                  className="w-[25px] h-[20px] rounded-full "
                />
              )}
              <span className="text-xs text-white">{eachvideo?.title}</span>
            </div>
            <div className="flex gap-1 items-center ">
              <span
                className={`${
                  pageName !== "video"
                    ? "font-bold text-xs text-slate-500"
                    : "font-semibold text-[10px] text-slate-500"
                }`}
              >
                {eachvideo?.author?.title}
              </span>
              <span
                className={`${
                  pageName !== "video"
                    ? "font-bold text-xs text-slate-500"
                    : "font-semibold text-[10px] text-slate-500"
                }`}
              >
                {" "}
                {eachvideo?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill />
                )}
              </span>
            </div>
            <div
              className={` flex gap-1 text-white text-[10px]  ${
                pageName !== "video"
                  ? "flex-row items-center"
                  : "flex-col justify-start gap-0"
              }`}
            >
              <span>{`${abbreviateNumber(
                eachvideo?.stats?.views ? eachvideo?.stats?.views : 35000
              )} views`}</span>
              <span className="truncate">{eachvideo?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

export default VideoCard;
