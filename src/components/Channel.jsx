import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchData } from "../utils/apiFetch";
import { channelOptions } from "../utils/constant";
import VideoCard from "./VideoCard";
import CommunityPost from "./CommunityPost";

const Channel = () => {
  const params = useParams();

  const [channeldetails, setchanneldetails] = useState(null);
  const [channelvideos, setchannelvideos] = useState(null);
  const [otherchannel, setotherchannel] = useState(null);
  const [community, setcommunity] = useState(null);
  const [currentcontext, setcurrentcontext] = useState("videos");

  useEffect(() => {
    fetchData(`channel/details/?id=${params?.channelid}`).then((res) =>
      setchanneldetails(res)
    );
    fetchData(`channel/videos/?id=${params?.channelid}`).then((res) =>
      setchannelvideos(res)
    );
  }, [params?.channelid]);

  function handleChannelSearch(e) {
    let searchtype = e.target.textContent.toLowerCase();

    if (searchtype !== currentcontext) {
      fetchData(`channel/${searchtype}/?id=${params?.channelid}`).then(
        (res) => {
          if (searchtype === "channels") {
            setcurrentcontext("channels");

            setotherchannel(res);
          } else if (searchtype === "community") {
            setcurrentcontext("community");

            setcommunity(res);
          } else if (searchtype === "videos") {
            setcurrentcontext("videos");

            setchannelvideos(res);
          }
        }
      );
    }
  }

  return (
    <div className="flex flex-col w-full  p-3  gap-2  min-h-screen bg-black items-center">
      <div className="flex flex-col gap-3 w-full sm:w-[80%] items-center border-b-2 pb-2">
        <img
          src={channeldetails?.avatar[2]?.url || channeldetails?.avatar[0]?.url}
          alt=""
          className="w-[200px] h-[200px] rounded-full"
        />
        <p className="font-bold text-2xl text-white">{channeldetails?.title}</p>
        <p className="font-semibold text-sm text-slate-600">
          {channeldetails?.description}
        </p>
      </div>
      <div className="flex  gap-3 w-[80%] items-center  my-2 justify-center flex-wrap ">
        {channelOptions &&
          channelOptions.map((option, index) => {
            return (
              <NavLink>
                <button
                  key={index}
                  className="text-white px-2 py-1 bg-slate-500 rounded-full"
                  onClick={handleChannelSearch}
                >
                  {option}
                </button>
              </NavLink>
            );
          })}
      </div>
      <div className="flex  gap-3 w-full sm:w-[80%] items-center  my-2 justify-center flex-wrap mx-auto">
        {currentcontext === "videos" &&
          channelvideos &&
          channelvideos?.contents.map((eachvideo) => {
            return (
              <VideoCard
                eachvideo={eachvideo?.video}
                pageName="channel"
                key={eachvideo?.video?.videoId}
                currentcontext={currentcontext}
              />
            );
          })}
        {currentcontext === "community" &&
          community &&
          (community?.contents !== null &&
          community?.contents.length !== 0 ? (
            community.contents?.map((post) => (
              <CommunityPost
                post={post}
                key={post?.post?.postId}
                currentcontext={currentcontext}
              />
            ))
          ) : (
            <div
              className={`text-white text-xl px-3 py-2 bg-red-500 rounded-full ${
                currentcontext === "community" ? "block" : "hidden"
              }`}
            >
              No Community Post
            </div>
          ))}

        {currentcontext === "channels" &&
        otherchannel &&
        otherchannel?.collections.length > 0 ? (
          <div
            className={`text-white ${
              currentcontext === "channels" ? "block" : "hidden"
            } `}
          >
            Channels
          </div>
        ) : (
          <div
            className={`text-white text-xl px-3 py-2 bg-red-500 rounded-full ${
              currentcontext === "channels" ? "block" : "hidden"
            }`}
          >
            No other channel
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
