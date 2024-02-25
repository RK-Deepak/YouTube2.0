import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchData } from "../utils/apiFetch";
import ReactPlayer from "react-player";
import RelatedVideos from "./RelatedVideos";
import VideoInfo from "./VideoInfo";


const VideoDetails = () => {
  const param = useParams();
  
  const [videodetail, setvideodetail] = useState(null);

  useEffect(() => {
    fetchData(`video/details/?id=${param.id}`).then((res) =>
      setvideodetail(res)
    );
    
  }, [param?.id]);

  return (
    <>
      <div className="p-5 flex justify-between  min-h-screen  w-full  flex-col md:flex-row  gap-2 bg-black ">
        <div className="w-full">
          <div className="w-[100%] h-[47vh] sm:h-[90vh] border-2 border-slate-500 rounded-md  my-2  flex flex-col gap-1">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${param?.id}`}
              playing={true}
              controls
              className="react_player"
              width="100%"
              height="100%"
            />
          </div>
          <VideoInfo videodetail={videodetail} param={param?.id} />
       
        </div>

        <div className=" h-[100%]">
          <RelatedVideos param={param?.id} />
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
