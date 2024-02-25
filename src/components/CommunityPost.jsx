import React from "react";
import { getUrlandText } from "../utils/geturl";
import { abbreviateNumber } from "js-abbreviation-number";

const CommunityPost = ({ post}) => {
  return (
    post &&
    post?.post && (
      <a
        href={getUrlandText(post?.post?.text).urls}
        target="_blank"
        className={`w-full `}
      >
        <div className="border-2 border-slate-500 h-fit p-2 flex  gap-3 w-[80%] sm:w-full flex-col sm:flex-row">
          {Array.isArray(post?.post?.attachment?.images) && (
            <img
              src={
                post?.post?.attachment?.images[0]?.source[0]?.url ||
                post?.post?.attachment?.images[0]?.source[1]?.url ||
                post?.post?.attachment?.images[0]?.source[2]?.url ||
                post?.post?.attachment?.images[0]?.source[3]?.url ||
                post?.post?.attachment?.images[0]?.source[4]?.url
              }
              alt=""
              className="h-[200px] rounded-md"
            />
          )}

          <div className="flex flex-col gap-2">
            <p className="text-white font-bold text-sm underline sm:text-xl  ">
              {getUrlandText(post?.post?.text).textWithoutUrls.trim()}
            </p>
            <p className="font-[700] text-2xl text-slate-700">
              {post?.post?.author?.title}
            </p>
            <p className="text-white font-semibold">
              {post?.post?.publishedTimeText}
            </p>
            <div className="flex gap-2 ">
              <p className="text-white">
                Likes: {abbreviateNumber(post?.post?.stats?.likes)}
              </p>
              <p className="text-white">
                Comments: {abbreviateNumber(post?.post?.stats?.comments)}
              </p>
            </div>
          </div>
        </div>
      </a>
    )
  );
};

export default CommunityPost;
