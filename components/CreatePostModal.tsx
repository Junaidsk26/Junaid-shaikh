import React, { useState } from 'react';
import { SparklesIcon } from './Icons';
import { generateMagicCaption } from '../services/geminiService';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageDescription, setImageDescription] = useState('');

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (!imageDescription) return;
    setIsGenerating(true);
    const magicCaption = await generateMagicCaption(imageDescription);
    setCaption(magicCaption);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-3xl rounded-xl overflow-hidden border border-gray-800 flex flex-col md:flex-row h-[70vh] md:h-[600px]">
        
        {/* Left Side: Image Upload/Preview */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-800 relative">
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
          ) : (
             <div className="text-center p-6">
                 <svg className="mx-auto h-16 w-16 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl mb-4">Drag photos and videos here</h3>
                <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition-colors">
                    Select from computer
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
             </div>
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-1/3 flex flex-col bg-gray-900">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <button onClick={onClose} className="text-red-500 font-semibold hover:text-red-400">Cancel</button>
                <span className="font-bold text-white">Create new post</span>
                <button onClick={onClose} className="text-blue-500 font-bold hover:text-blue-400">Share</button>
            </div>
            
            <div className="p-4 flex-1 flex flex-col gap-4">
                <div className="flex items-center space-x-3 mb-2">
                    <img src="https://picsum.photos/id/64/50/50" alt="User" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-sm">you</span>
                </div>

                <textarea 
                    className="bg-transparent text-white w-full resize-none focus:outline-none h-32" 
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                ></textarea>

                {/* AI Feature */}
                <div className="mt-auto border-t border-gray-800 pt-4">
                    <label className="text-xs text-gray-400 mb-2 block">Describe your photo for AI Caption:</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            placeholder="e.g., sunset at the beach"
                            className="bg-gray-800 text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-600"
                        />
                        <button 
                            onClick={handleGenerateCaption}
                            disabled={isGenerating || !imageDescription}
                            className={`p-2 rounded-lg ${isGenerating ? 'bg-gray-700' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'} text-white`}
                        >
                           {isGenerating ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <SparklesIcon />}
                        </button>
                    </div>
                     <p className="text-[10px] text-gray-500 mt-2">Powered by Gemini ✨</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;