import React from 'react';

export const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg aria-label="Home" className={active ? "scale-110" : ""} fill={active ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M22 10.188L13.416 2.709a2.167 2.167 0 0 0-2.833 0L2 10.188V21a1 1 0 0 0 1 1h6v-6h6v6h6a1 1 0 0 0 1-1V10.188z" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "0" : "2"} />
  </svg>
);

export const SearchIcon = ({ active }: { active?: boolean }) => (
  <svg aria-label="Search" className={active ? "scale-110" : ""} fill={active ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="16.511" x2="22" y1="16.511" y2="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
  </svg>
);

export const ReelsIcon = ({ active }: { active?: boolean }) => (
  <svg aria-label="Reels" className={active ? "scale-110" : ""} fill={active ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24">
    <rect height="18" rx="2" ry="2" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} width="18" x="3" y="3" />
    <line x1="7.5" x2="7.5" y1="3" y2="21" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="16.5" x2="16.5" y1="3" y2="21" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="3" x2="21" y1="11.5" y2="11.5" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="3" x2="7.5" y1="7.5" y2="7.5" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="16.5" x2="21" y1="7.5" y2="7.5" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="3" x2="7.5" y1="16" y2="16" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="16.5" x2="21" y1="16" y2="16" stroke="currentColor" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
  </svg>
);

export const MessageIcon = ({ active }: { active?: boolean }) => (
  <svg aria-label="Direct" className={active ? "scale-110" : ""} fill={active ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24">
    <line x1="22" x2="9.218" y1="2" y2="10.083" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const HeartIcon = ({ active, filled }: { active?: boolean; filled?: boolean }) => (
  <svg aria-label="Notifications" className={active ? "scale-110" : ""} fill={filled ? "#ff3040" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175 2.133 1.176 2.976-.006 1.031-1.46 2.305-1.941 2.933-1.941z" stroke={filled ? "none" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const PlusSquareIcon = ({ active }: { active?: boolean }) => (
  <svg aria-label="New Post" className={active ? "scale-110" : ""} fill={active ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="6.545" x2="17.455" y1="12.001" y2="12.001" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="12.003" x2="12.003" y1="6.545" y2="17.455" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const CommentIcon = () => (
  <svg aria-label="Comment" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const ShareIcon = () => (
  <svg aria-label="Share Post" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24">
    <line x1="22" x2="9.218" y1="2" y2="10.083" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const BookmarkIcon = ({ filled }: { filled?: boolean }) => (
  <svg aria-label="Save" fill={filled ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24">
    <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const MoreIcon = () => (
  <svg aria-label="More" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="6" cy="12" r="1.5" />
    <circle cx="18" cy="12" r="1.5" />
  </svg>
);

export const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);
