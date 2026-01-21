import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUpdateUser: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentUser, onUpdateUser }) => {
  const [formData, setFormData] = useState(currentUser);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (event) => {
              if (event.target?.result) {
                  setPreviewImage(event.target.result as string);
                  setFormData(prev => ({ ...prev, avatar: event.target?.result as string }));
              }
          };
          reader.readAsDataURL(e.target.files[0]);
      }
  };

  const handleSubmit = () => {
    onUpdateUser(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-xl rounded-xl border border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <button onClick={onClose} className="text-white">Cancel</button>
            <span className="font-bold text-white">Edit Profile</span>
            <button onClick={handleSubmit} className="text-blue-500 font-bold">Done</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
             <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border border-gray-700">
                    <img src={previewImage || formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <label className="text-blue-500 font-semibold text-sm cursor-pointer hover:text-blue-400">
                    Change profile photo
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
             </div>

             <div className="space-y-4">
                 <div>
                     <label className="block text-gray-400 text-xs mb-1">Name</label>
                     <input 
                        type="text" 
                        name="name"
                        value={formData.name || ''} 
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-800 rounded px-3 py-2 text-white focus:border-gray-600 focus:outline-none"
                     />
                 </div>
                 <div>
                     <label className="block text-gray-400 text-xs mb-1">Username</label>
                     <input 
                        type="text" 
                        name="username"
                        value={formData.username} 
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-800 rounded px-3 py-2 text-white focus:border-gray-600 focus:outline-none"
                     />
                 </div>
                 <div>
                     <label className="block text-gray-400 text-xs mb-1">Bio</label>
                     <textarea 
                        name="bio"
                        value={formData.bio || ''} 
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-black border border-gray-800 rounded px-3 py-2 text-white focus:border-gray-600 focus:outline-none resize-none"
                     />
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;