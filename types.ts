export interface User {
  id: string;
  username: string;
  avatar: string;
  name?: string;
  bio?: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Story {
  id: string;
  user: User;
  hasUnseen: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface Reel {
  id: string;
  user: User;
  videoUrl: string; // Using image URLs for mock visualization
  description: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export type ViewState = 'home' | 'search' | 'reels' | 'messages' | 'notifications' | 'profile' | 'create';