import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../lib/utils.js";
import { X } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  // To make the chat scroll automatically for a new message
  const messageEndRef = useRef(null);

  // State for full-screen image modal
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
//for handling image full screen
  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Run this useEffect if a new message arrives
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-center ${
              message.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Profile Picture */}
            {message.senderId !== authUser._id && (
              <div className="flex-shrink-0 mr-2">
                <div className="w-10 h-10 rounded-full border border-base-300">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Chat Bubble */}
            <div
              className={`flex flex-col max-w-[75%] ${
                message.senderId === authUser._id ? "items-end" : "items-start"
              }`}
            >
              {/* Message Header */}
              <div className="text-sm font-medium text-neutral-content flex items-center">
                {message.senderId === authUser._id ? authUser.name : selectedUser.name}
                <time className="text-xs opacity-50 ml-2">{formatTime(message.createdAt)}</time>
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3 rounded-lg shadow-md ${
                  message.senderId === authUser._id
                    ? "bg-primary text-primary-content" // Current user's message bubble color
                    : "bg-base-200 text-base-content" // Other user's message bubble color
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
                    onClick={() => openImageModal(message.image)}
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>

            {/* Profile Picture for Current User */}
            {message.senderId === authUser._id && (
              <div className="flex-shrink-0 ml-2">
                <div className="w-10 h-10 rounded-full border border-base-300">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile pic"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />

      {/* Full-Screen Image Modal */}
      {isImageModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={closeImageModal} // Close modal when clicking outside the popup
  >
    <div
      className="relative bg-white p-4 rounded-lg shadow-lg max-w-[90%] max-h-[90%]"
      onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside the popup
    >
      <img
        src={selectedImage}
        alt="Full Screen"
        className="max-w-full max-h-[80vh] rounded-md"
      />
      <button
        onClick={closeImageModal}
        className="absolute top-2 right-2 text-white bg-gray-800 p-1 rounded-full hover:bg-gray-600 transition"
      >
       <X size={22}/>
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ChatContainer;
