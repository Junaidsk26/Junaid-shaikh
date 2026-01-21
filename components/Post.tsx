import React, { useState } from 'react';
import { Post as PostType } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, BookmarkIcon, MoreIcon } from './Icons';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="w-full border-b border-gray-800 pb-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[1.5px]`}>
            <div className="bg-black rounded-full p-[1.5px] w-full h-full">
                <img 
                    src={post.user.avatar} 
                    alt={post.user.username} 
                    className="w-full h-full rounded-full object-cover" 
                />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white hover:text-gray-300">{post.user.username}</span>
            <span className="text-xs text-gray-500">{post.timestamp}</span>
          </div>
        </div>
        <button className="text-white hover:text-gray-400">
          <MoreIcon />
        </button>
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-900 overflow-hidden" onDoubleClick={handleLike}>
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
      </div>

      {/* Actions */}
      <div className="flex justify-between px-4 pt-3 pb-2">
        <div className="flex space-x-4">
          <button onClick={handleLike} className="hover:scale-110 transition-transform active:scale-90">
            <HeartIcon filled={isLiked} />
          </button>
          <button className="hover:text-gray-400 hover:scale-110 transition-transform">
            <CommentIcon />
          </button>
          <button className="hover:text-gray-400 hover:scale-110 transition-transform">
            <ShareIcon />
          </button>
        </div>
        <button onClick={() => setIsSaved(!isSaved)} className="hover:text-gray-400 hover:scale-110 transition-transform">
          <BookmarkIcon filled={isSaved} />
        </button>
      </div>

      {/* Likes */}
      <div className="px-4">
        <span className="text-sm font-semibold">{likesCount.toLocaleString()} likes</span>
      </div>

      {/* Caption */}
      <div className="px-4 pt-1">
        <p className="text-sm">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.caption}
        </p>
      </div>

      {/* Comments Link */}
      <div className="px-4 pt-1">
        <button className="text-sm text-gray-500">View all {post.comments} comments</button>
      </div>
      
      {/* Add Comment */}
       <div className="px-4 pt-2 flex items-center justify-between">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="bg-transparent text-sm text-white w-full focus:outline-none" 
          />
          <button className="text-blue-500 text-sm font-semibold ml-2 hover:text-white">Post</button>
      </div>
    </div>
  );
};

export default Post;