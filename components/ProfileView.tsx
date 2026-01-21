import React from 'react';
import { Post, User } from '../types';
import { ReelsIcon, BookmarkIcon, HeartIcon } from './Icons';

interface ProfileViewProps {
  posts: Post[];
  user: User;
  onEditProfile: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ posts, user, onEditProfile }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 w-full">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 mb-12">
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-700 mb-6 md:mb-0 bg-gray-800">
           <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h2 className="text-xl font-normal text-white">{user.username}</h2>
                <div className="flex space-x-2">
                    <button 
                        onClick={onEditProfile}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                        Edit profile
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                        View archive
                    </button>
                </div>
                <button className="text-white ml-auto md:ml-0">
                    <svg aria-label="Options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </button>
            </div>

            <div className="flex justify-around md:justify-start space-x-10 mb-4 text-sm">
                <span><span className="font-bold text-white">12</span> posts</span>
                <span><span className="font-bold text-white">4.5k</span> followers</span>
                <span><span className="font-bold text-white">892</span> following</span>
            </div>

            <div className="hidden md:block">
                <div className="font-semibold text-white">{user.name}</div>
                <div className="text-gray-300">Digital Creator</div>
                <div className="text-gray-300 whitespace-pre-wrap">{user.bio}</div>
                <div className="text-blue-400 font-semibold cursor-pointer">next-app.com</div>
            </div>
        </div>
      </div>

       {/* Mobile Bio */}
       <div className="md:hidden px-4 mb-6 text-sm">
            <div className="font-semibold text-white">{user.name}</div>
            <div className="text-gray-300">Digital Creator</div>
            <div className="text-gray-300 whitespace-pre-wrap">{user.bio}</div>
            <div className="text-blue-400 font-semibold cursor-pointer">next-app.com</div>
        </div>

      {/* Highlights */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar mb-8 pb-2">
          {[1, 2, 3].map((i) => (
               <div key={i} className="flex flex-col items-center space-y-1 min-w-[70px]">
                <div className="w-16 h-16 rounded-full border border-gray-700 p-1">
                    <div className="w-full h-full bg-gray-800 rounded-full"></div>
                </div>
                <span className="text-xs text-white">Highlight</span>
            </div>
          ))}
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-800 flex justify-center space-x-12 text-xs font-semibold tracking-widest uppercase mb-4">
          <div className="flex items-center space-x-1 py-4 border-t border-white text-white cursor-pointer">
              <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
              <span>Posts</span>
          </div>
          <div className="flex items-center space-x-1 py-4 text-gray-500 cursor-pointer hover:text-white transition-colors">
              <ReelsIcon />
              <span>Reels</span>
          </div>
          <div className="flex items-center space-x-1 py-4 text-gray-500 cursor-pointer hover:text-white transition-colors">
               <BookmarkIcon />
              <span>Saved</span>
          </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {posts.map((post) => (
            <div key={post.id} className="relative aspect-square group cursor-pointer bg-gray-800">
                <img src={post.imageUrl} alt="post" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center space-x-6 text-white">
                    <div className="flex items-center font-bold">
                        <HeartIcon filled /> <span className="ml-1">{post.likes}</span>
                    </div>
                     <div className="flex items-center font-bold">
                        <svg aria-label="Comment" className="fill-white" height="19" role="img" viewBox="0 0 24 24" width="19"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="white"></path></svg> 
                        <span className="ml-1">{post.comments}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;