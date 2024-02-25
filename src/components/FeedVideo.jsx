import React, { useEffect } from "react";
import useApp from "../context/AppContext";
import VideoCard from "./VideoCard";

import { scrollbtns } from "../utils/constant";
import VideoCardShimmer from "./VideoCardShimmer";
import { useLocation, useNavigate } from "react-router-dom";



const FeedVideo = () => {
  const {searchResults, setselectedcategory, setsearchquery,setisfocused } =
    useApp();
  const { pathname } = useLocation();
  const navigatee = useNavigate();


  const pageName = pathname.split("/").filter(Boolean)?.[0];

  function handlesearch(e) {
    setselectedcategory(e.target.textContent);
    setsearchquery(e.target.textContent);
    navigatee(`/search/${e.target.textContent}`);
    setisfocused(false)
    
  }

  useEffect(() => {
    setselectedcategory("new");
    setsearchquery("");
    setisfocused(false)
  }, []);

  return searchResults ? (
    <div className="flex gap-1 flex-col w-full  p-2 min-h-screen bg-black">
      <div className="flex gap-4 overflow-x-scroll my-2 max-w-[74%] scrollbtns mx-auto">
        {scrollbtns.map((eachbtn, index) => (
          <button
            key={index}
            className="text-white h-fit min-w-fit px-4 py-1 bg-slate-500 rounded-full"
            onClick={handlesearch}
          >
            {eachbtn}
          </button>
        ))}
      </div>

      <div className="flex  justify-evenly w-full gap-4 flex-wrap">
        {searchResults &&
          searchResults?.map((eachvideo, index) => {
            return (
              <VideoCard
                eachvideo={eachvideo?.video}
                key={eachvideo?.video?.videoId + index.toString()}
                pageName={pageName}
              />
            );
          })}
      </div>
    </div>
  ) : (
    <div className="flex gap-1 justify-evenly flex-wrap p-2 min-h-screen">
      <VideoCardShimmer />
    </div>
  );
};

export default FeedVideo;
