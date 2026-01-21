import React from 'react';
import { Story } from '../types';

interface StoriesProps {
  stories: Story[];
}

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="w-full border-b border-gray-800 bg-black pt-4 pb-2">
      <div className="flex space-x-4 overflow-x-auto no-scrollbar px-4 pb-2">
        {/* Your Story */}
        <div className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer">
          <div className="relative">
            <div className="w-16 h-16 rounded-full p-[2px] border-2 border-gray-700 overflow-hidden">
                <img 
                    src={`https://picsum.photos/id/64/150/150`} 
                    alt="Your Story" 
                    className="w-full h-full rounded-full object-cover" 
                />
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                <span className="text-white text-xs font-bold">+</span>
            </div>
          </div>
          <span className="text-xs text-gray-300 truncate w-16 text-center">Your story</span>
        </div>

        {/* Other Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer group">
            <div className={`w-16 h-16 rounded-full p-[2px] ${story.hasUnseen ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' : 'border border-gray-700'}`}>
              <div className="w-full h-full bg-black rounded-full p-[2px]">
                <img 
                  src={story.user.avatar} 
                  alt={story.user.username} 
                  className="w-full h-full rounded-full object-cover group-hover:opacity-90 transition-opacity" 
                />
              </div>
            </div>
            <span className="text-xs text-gray-300 truncate w-16 text-center">{story.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;