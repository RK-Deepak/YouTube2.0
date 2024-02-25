import React, { useEffect } from "react";
import useApp from "../context/AppContext";
import { useParams } from "react-router-dom";
// import {searchResults} from "../utils/constant"
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const { searchResults } = useApp();
  const { pathname } = useLocation();
 
  const pageName = pathname.split("/").filter(Boolean)?.[0];

  return searchResults ? (
    <div className="flex gap-4 justify-evenly flex-wrap p-2 min-h-screen bg-black">
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
  ) : (
    <div className="flex gap-1 justify-evenly flex-wrap p-2 min-h-screen">
      <VideoCardShimmer />
    </div>
  );
};

export default SearchResults;
