import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/apiFetch";

import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";

const RelatedVideos = ({ param }) => {
  const [relatedvideoss, setrelatedvideoss] = useState(null);
  useEffect(() => {
    fetchData(`video/related-contents/?id=${param}`).then((res) =>
      setrelatedvideoss(res?.contents)
    );
  }, [param]);

  return (
    <div className="flex flex-col   gap-2 items-center w-[100%]  self-center md:w-fit p-3 ">
      <span className=" text-center text-white">Related Videos</span>

      {relatedvideoss ? (
        relatedvideoss?.map((item) => {
          return (
            <VideoCard
              eachvideo={item?.video}
              pageName="video"
              key={item?.video?.videoId}
            />
          );
        })
      ) : (
        <VideoCardShimmer />
      )}
    </div>
  );
};

export default RelatedVideos;
