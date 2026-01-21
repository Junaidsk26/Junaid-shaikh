import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from '../types';
import { MessageIcon } from './Icons';

// Mock users for chat functionality
const CHAT_USERS: User[] = Array.from({ length: 8 }).map((_, i) => ({
    id: `chat_user_${i}`,
    username: `friend_${i + 1}`,
    name: `Friend ${i + 1}`,
    avatar: `https://picsum.photos/id/${330 + i}/150/150`,
}));

const INITIAL_MESSAGES: Record<string, Message[]> = {};
CHAT_USERS.forEach(user => {
    INITIAL_MESSAGES[user.id] = [
        { id: 'm1', senderId: user.id, text: `Hey, it's ${user.username}!`, timestamp: '1h', isMine: false }
    ];
});

const MessagesView: React.FC = () => {
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [chats, setChats] = useState(INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chats, activeUser]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeUser) return;

        const msg: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text: newMessage,
            timestamp: 'Just now',
            isMine: true,
        };

        setChats(prev => ({
            ...prev,
            [activeUser.id]: [...(prev[activeUser.id] || []), msg]
        }));
        setNewMessage('');
        
        // Simulate a reply
        setTimeout(() => {
             const reply: Message = {
                id: (Date.now() + 1).toString(),
                senderId: activeUser.id,
                text: `That's interesting! tell me more about "${msg.text}"`,
                timestamp: 'Just now',
                isMine: false,
            };
             setChats(prev => ({
                ...prev,
                [activeUser.id]: [...(prev[activeUser.id] || []), reply]
            }));
        }, 1500);
    };

    return (
        <div className="flex h-[calc(100vh-60px)] md:h-screen w-full max-w-6xl mx-auto border-x border-gray-800 bg-black">
            {/* Sidebar List */}
            <div className={`w-full md:w-[350px] border-r border-gray-800 flex flex-col ${activeUser ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6 border-b border-gray-800 flex justify-between items-center h-[75px]">
                    <span className="font-bold text-xl flex items-center">
                        next_user
                        <svg className="ml-1" fill="none" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9a1 1 0 0 1 1.414 0l9 9A1 1 0 0 1 21 17.502Z" fill="white" transform="rotate(180 12 12)"></path></svg>
                    </span>
                    <svg aria-label="New Message" className="cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.209 5.207h.252c.23 0 .445.08.62.215l8.69 6.804a1.002 1.002 0 0 1 .002 1.574l-8.69 6.86a1.002 1.002 0 0 1-1.246-.002l-8.625-6.86a1.002 1.002 0 0 1 .003-1.572l8.692-6.804a1.002 1.002 0 0 1 .302-.215Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 flex items-center justify-between">
                         <span className="font-bold">Messages</span>
                         <span className="text-gray-500 text-sm font-semibold">Requests</span>
                    </div>
                    {CHAT_USERS.map(user => (
                        <div 
                            key={user.id} 
                            onClick={() => setActiveUser(user)}
                            className={`flex items-center space-x-3 p-4 cursor-pointer hover:bg-gray-900 ${activeUser?.id === user.id ? 'bg-gray-900' : ''}`}
                        >
                            <img src={user.avatar} alt={user.username} className="w-14 h-14 rounded-full object-cover" />
                            <div className="flex flex-col">
                                <span className="text-white font-normal">{user.name}</span>
                                <span className="text-gray-500 text-sm truncate">
                                    {chats[user.id] ? chats[user.id][chats[user.id].length - 1].text.substring(0, 25) + '...' : 'Start chatting'} • {chats[user.id] ? chats[user.id][chats[user.id].length - 1].timestamp : 'Now'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-black ${!activeUser ? 'hidden md:flex' : 'flex'}`}>
                {!activeUser ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                         <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center mb-4">
                            <MessageIcon active />
                         </div>
                        <h2 className="text-xl font-normal mb-2">Your Messages</h2>
                        <p className="text-gray-400 mb-4">Send private photos and messages to a friend or group.</p>
                        <button className="bg-blue-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors">Send Message</button>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="h-[75px] border-b border-gray-800 flex items-center px-6 justify-between shrink-0">
                            <div className="flex items-center space-x-3">
                                <button className="md:hidden mr-2 text-white" onClick={() => setActiveUser(null)}>
                                    <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9a1 1 0 0 1 1.414 0l9 9A1 1 0 0 1 21 17.502Z" transform="rotate(-90 12 12)"></path></svg>
                                </button>
                                <img src={activeUser.avatar} alt={activeUser.username} className="w-8 h-8 rounded-full object-cover" />
                                <span className="font-semibold">{activeUser.name}</span>
                            </div>
                            <svg aria-label="Details" className="cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {chats[activeUser.id]?.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl break-words ${msg.isMine ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 m-4 border border-gray-700 rounded-full flex items-center shrink-0">
                            <svg aria-label="Emoji" className="mr-3 cursor-pointer text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                            <form className="flex-1" onSubmit={handleSendMessage}>
                                <input 
                                    type="text" 
                                    placeholder="Message..." 
                                    className="w-full bg-transparent focus:outline-none text-white text-sm" 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                            </form>
                            {newMessage ? (
                                <button onClick={handleSendMessage} className="ml-3 text-blue-500 font-semibold text-sm hover:text-white">Send</button>
                            ) : (
                                <div className="flex space-x-3 ml-3 text-white">
                                    <svg aria-label="Image" className="cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 10.188L13.416 2.709a2.167 2.167 0 0 0-2.833 0L2 10.188V21a1 1 0 0 0 1 1h6v-6h6v6h6a1 1 0 0 0 1-1V10.188z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                    <svg aria-label="Like" className="cursor-pointer" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175 2.133 1.176 2.976-.006 1.031-1.46 2.305-1.941 2.933-1.941z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MessagesView;