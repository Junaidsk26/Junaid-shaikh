import React, { useState } from 'react';
import { Reel } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, MoreIcon } from './Icons';

interface ReelsViewProps {
  reels: Reel[];
}

const ReelItem: React.FC<{ reel: Reel }> = ({ reel }) => {
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likesCount, setLikesCount] = useState(reel.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative w-full h-[calc(100vh-60px)] md:h-[calc(100vh-40px)] snap-start shrink-0 border-b border-gray-800 md:border-none bg-gray-900 md:rounded-lg overflow-hidden flex justify-center">
      {/* Video/Image Content */}
      <img 
        src={reel.videoUrl} 
        alt="Reel content" 
        className="h-full w-full md:w-auto object-cover md:aspect-[9/16]" 
      />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 md:w-auto md:left-1/2 md:-translate-x-1/2 md:aspect-[9/16] pointer-events-none"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-4 md:w-auto md:left-1/2 md:-translate-x-1/2 md:aspect-[9/16]">
        <div className="flex items-end justify-between">
          
          {/* Bottom Left Info */}
          <div className="flex flex-col space-y-3 mb-4 w-[85%]">
            <div className="flex items-center space-x-3">
              <img src={reel.user.avatar} alt={reel.user.username} className="w-8 h-8 rounded-full border border-white" />
              <span className="font-semibold text-white drop-shadow-md">{reel.user.username}</span>
              <button className="border border-white/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">Follow</button>
            </div>
            <p className="text-sm text-white drop-shadow-md line-clamp-2">{reel.description}</p>
            <div className="flex items-center space-x-2 text-xs text-white">
               <svg fill="white" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>
               <span className="marquee">Original Audio - {reel.user.username}</span>
            </div>
          </div>

          {/* Right Sidebar Actions */}
          <div className="flex flex-col items-center space-y-6 mb-4 w-[15%] pointer-events-auto">
            <div className="flex flex-col items-center space-y-1">
              <button onClick={handleLike} className="transition-transform active:scale-90">
                <HeartIcon filled={isLiked} />
              </button>
              <span className="text-xs font-semibold">{likesCount.toLocaleString()}</span>
            </div>
            
            <div className="flex flex-col items-center space-y-1">
              <button className="transition-transform active:scale-90">
                <CommentIcon />
              </button>
              <span className="text-xs font-semibold">{reel.comments}</span>
            </div>

            <button className="transition-transform active:scale-90">
              <ShareIcon />
            </button>

            <button>
              <MoreIcon />
            </button>

            <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden">
                <img src={reel.user.avatar} alt="music" className="w-full h-full object-cover animate-spin-slow" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ReelsView: React.FC<ReelsViewProps> = ({ reels }) => {
  return (
    <div className="h-[calc(100vh-60px)] md:h-screen w-full flex justify-center bg-black">
        <div className="h-full w-full md:max-w-[400px] overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth">
        {reels.map(reel => (
            <ReelItem key={reel.id} reel={reel} />
        ))}
        </div>
    </div>
  );
};

export default ReelsView;