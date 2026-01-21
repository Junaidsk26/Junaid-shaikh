import React, { useState } from 'react';
import { HomeIcon, SearchIcon, ReelsIcon, MessageIcon, HeartIcon, PlusSquareIcon, MoreIcon } from './components/Icons';
import Stories from './components/Stories';
import Post from './components/Post';
import ProfileView from './components/ProfileView';
import CreatePostModal from './components/CreatePostModal';
import EditProfileModal from './components/EditProfileModal';
import MessagesView from './components/MessagesView';
import ReelsView from './components/ReelsView';
import { Post as PostType, Story, User, ViewState, Reel } from './types';

// Mock Data
const INITIAL_USER: User = {
  id: 'u1',
  username: 'alex_next_gen',
  name: 'Alex Doe',
  avatar: 'https://picsum.photos/id/64/150/150',
  bio: 'Building the Next big thing. 🚀',
};

const MOCK_STORIES: Story[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `s${i}`,
  user: {
    id: `u${i + 2}`,
    username: `user_${i + 1}`,
    avatar: `https://picsum.photos/id/${100 + i}/150/150`,
  },
  hasUnseen: Math.random() > 0.3,
}));

const MOCK_POSTS: PostType[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `p${i}`,
  user: {
    id: `u${i + 20}`,
    username: `creative_soul_${i}`,
    avatar: `https://picsum.photos/id/${200 + i}/150/150`,
  },
  imageUrl: `https://picsum.photos/id/${300 + i}/600/600`,
  caption: `Living the #Next life! checking out this amazing view. 🌟 #${i}`,
  likes: 120 + i * 15,
  comments: 4 + i,
  timestamp: `${i + 1}h`,
  isLiked: false,
  isSaved: false,
}));

// Mock Reels Data - 10 Nature Reels
const MOCK_REELS: Reel[] = [
    {
        id: 'r1',
        user: { id: 'r_u1', username: 'nature_explorer', avatar: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&h=1000&fit=crop',
        description: 'Lost in the deep forest 🌲✨ #forest #nature',
        likes: 12400,
        comments: 342,
        isLiked: false
    },
    {
        id: 'r2',
        user: { id: 'r_u2', username: 'ocean_life', avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&h=1000&fit=crop',
        description: 'Waves crashing 🌊💙 #ocean #beachvibes',
        likes: 8900,
        comments: 120,
        isLiked: true
    },
    {
        id: 'r3',
        user: { id: 'r_u3', username: 'mountain_hiker', avatar: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&h=1000&fit=crop',
        description: 'Top of the world 🏔️ #mountains #hiking',
        likes: 25000,
        comments: 800,
        isLiked: false
    },
    {
        id: 'r4',
        user: { id: 'r_u4', username: 'waterfall_chaser', avatar: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=600&h=1000&fit=crop',
        description: 'Nature’s shower 💦 #waterfall #peace',
        likes: 15600,
        comments: 450,
        isLiked: false
    },
    {
        id: 'r5',
        user: { id: 'r_u5', username: 'desert_nomad', avatar: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=600&h=1000&fit=crop',
        description: 'Golden sands 🌵☀️ #desert #travel',
        likes: 5600,
        comments: 89,
        isLiked: false
    },
    {
        id: 'r6',
        user: { id: 'r_u6', username: 'winter_wonder', avatar: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=600&h=1000&fit=crop',
        description: 'Frozen beauty ❄️🌨️ #snow #winter',
        likes: 32000,
        comments: 1200,
        isLiked: true
    },
    {
        id: 'r7',
        user: { id: 'r_u7', username: 'jungle_vibes', avatar: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=600&h=1000&fit=crop',
        description: 'Green paradise 🌿🦜 #jungle #green',
        likes: 18000,
        comments: 670,
        isLiked: false
    },
    {
        id: 'r8',
        user: { id: 'r_u8', username: 'sunset_lover', avatar: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600&h=1000&fit=crop',
        description: 'Chasing sunsets 🌅🧡 #sunset #goldenhour',
        likes: 45000,
        comments: 2000,
        isLiked: true
    },
    {
        id: 'r9',
        user: { id: 'r_u9', username: 'floral_dreams', avatar: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=600&h=1000&fit=crop',
        description: 'Blooming season 🌸🌷 #flowers #spring',
        likes: 11000,
        comments: 300,
        isLiked: false
    },
    {
        id: 'r10',
        user: { id: 'r_u10', username: 'aurora_borealis', avatar: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=150&h=150&fit=crop' },
        videoUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=600&h=1000&fit=crop',
        description: 'Northern lights magic 🌌✨ #aurora #nightsky',
        likes: 55000,
        comments: 2500,
        isLiked: true
    }
];

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // --- Sidebar Component (defined here for props access) ---
  const SidebarItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive?: boolean, onClick: () => void }) => (
    <div onClick={onClick} className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? 'font-bold' : 'hover:bg-white/10'}`}>
      <div className="group-hover:scale-105 transition-transform">{icon}</div>
      <span className={`hidden md:block text-md ${isActive ? 'text-white' : 'text-gray-100'}`}>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[72px] md:w-[245px] h-screen fixed left-0 top-0 border-r border-gray-800 z-40 bg-black px-3 py-5">
        <div className="px-3 mb-8 pt-2">
            {/* Logo */}
          <h1 className="hidden md:block text-2xl font-bold italic tracking-wider cursor-pointer font-serif" onClick={() => setView('home')}>Next</h1>
          <div className="md:hidden flex justify-center text-xl font-serif">N</div>
        </div>

        <div className="flex-1 flex flex-col space-y-2">
          <SidebarItem icon={<HomeIcon active={view === 'home'} />} label="Home" isActive={view === 'home'} onClick={() => setView('home')} />
          <SidebarItem icon={<SearchIcon active={view === 'search'} />} label="Search" isActive={view === 'search'} onClick={() => setView('search')} />
          <SidebarItem icon={<ReelsIcon active={view === 'reels'} />} label="Reels" isActive={view === 'reels'} onClick={() => setView('reels')} />
          <SidebarItem icon={<MessageIcon active={view === 'messages'} />} label="Messages" isActive={view === 'messages'} onClick={() => setView('messages')} />
          <SidebarItem icon={<HeartIcon active={view === 'notifications'} />} label="Notifications" isActive={view === 'notifications'} onClick={() => setView('notifications')} />
          <SidebarItem icon={<PlusSquareIcon />} label="Create" onClick={() => setIsCreateModalOpen(true)} />
          <SidebarItem 
            icon={<img src={currentUser.avatar} alt="Profile" className={`w-6 h-6 rounded-full object-cover ${view === 'profile' ? 'border-2 border-white' : ''}`} />} 
            label="Profile" 
            isActive={view === 'profile'} 
            onClick={() => setView('profile')} 
          />
        </div>

        <div className="mt-auto">
            <SidebarItem icon={<MoreIcon />} label="More" onClick={() => {}} />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[72px] lg:ml-[245px] min-h-screen flex justify-center">
        
        {/* View Switcher */}
        <div className="w-full max-w-[935px] flex flex-col">
            
            {/* Mobile Top Bar */}
            <div className="md:hidden sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 py-3">
                <h1 className="text-xl font-bold italic font-serif cursor-pointer" onClick={() => setView('home')}>Next</h1>
                <div className="flex items-center space-x-5">
                    <div onClick={() => setView('notifications')}><HeartIcon /></div>
                    <div onClick={() => setView('messages')}><MessageIcon /></div>
                </div>
            </div>

            {/* Content Logic */}
            {view === 'home' && (
              <div className="w-full max-w-[630px] mx-auto">
                <Stories stories={MOCK_STORIES} />
                <div className="flex flex-col w-full max-w-[470px] mx-auto mt-4">
                    {MOCK_POSTS.map(post => <Post key={post.id} post={post} />)}
                </div>
              </div>
            )}

            {view === 'profile' && (
              <ProfileView 
                posts={MOCK_POSTS} 
                user={currentUser} 
                onEditProfile={() => setIsEditProfileOpen(true)} 
              />
            )}
            
            {view === 'messages' && <MessagesView />}

            {view === 'reels' && <ReelsView reels={MOCK_REELS} />}

            {(view === 'search' || view === 'notifications') && (
                 <div className="h-[80vh] flex items-center justify-center text-gray-500">
                    <p>This is a demo of the {view} view.</p>
                 </div>
            )}
        </div>

        {/* Right Sidebar (Suggestions) - Desktop Only & Home Only */}
        {view === 'home' && (
            <div className="hidden lg:block w-[380px] pl-16 pt-8 pr-4 sticky top-0 h-screen">
                {/* Current User Switch */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('profile')}>
                        <img src={currentUser.avatar} alt="me" className="w-11 h-11 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">{currentUser.username}</span>
                            <span className="text-gray-500 text-sm">{currentUser.name}</span>
                        </div>
                    </div>
                    <button className="text-xs font-semibold text-blue-500 hover:text-white">Switch</button>
                </div>

                {/* Suggestions Header */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 font-semibold text-sm">Suggested for you</span>
                    <button className="text-xs font-semibold text-white hover:text-gray-400">See All</button>
                </div>

                {/* Suggestion List */}
                <div className="flex flex-col space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                         <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img src={`https://picsum.photos/id/${50+i}/50/50`} alt="sug" className="w-8 h-8 rounded-full" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm hover:underline cursor-pointer">user_suggestion_{i}</span>
                                    <span className="text-gray-500 text-xs">Followed by user_{i+10} + 2 more</span>
                                </div>
                            </div>
                            <button className="text-xs font-semibold text-blue-500 hover:text-white">Follow</button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 text-xs text-gray-500 space-y-4">
                    <p className="flex flex-wrap gap-x-2 gap-y-1">
                        {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified'].map(link => (
                            <span key={link} className="cursor-pointer hover:underline">{link}</span>
                        ))}
                    </p>
                    <p className="uppercase">© 2025 NEXT FROM GEMINI</p>
                </div>
            </div>
        )}

      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-3 flex justify-between items-center z-50">
           <div onClick={() => setView('home')}><HomeIcon active={view === 'home'} /></div>
           <div onClick={() => setView('search')}><SearchIcon active={view === 'search'} /></div>
           <div onClick={() => setView('reels')}><ReelsIcon active={view === 'reels'} /></div>
           <div onClick={() => setIsCreateModalOpen(true)}><PlusSquareIcon /></div>
           <div onClick={() => setView('profile')}>
               <img src={currentUser.avatar} alt="Profile" className={`w-6 h-6 rounded-full border-2 object-cover ${view === 'profile' ? 'border-white' : 'border-transparent'}`} />
           </div>
      </div>

      <CreatePostModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
        currentUser={currentUser}
        onUpdateUser={setCurrentUser}
      />
    </div>
  );
}