import React, { createContext, useContext, useState } from "react";

const VideoEditContext = createContext();

export function useVideoEditContext() {
  return useContext(VideoEditContext);
}

export function VideoEditProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);

  const startEditing = (video) => {
    setIsEditing(true);
    setVideoToEdit(video);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setVideoToEdit(null);
  };



  return (
    <VideoEditContext.Provider
      value={{
        isEditing,
        videoToEdit,
        startEditing,
        stopEditing,
      }}
    >
      {children}
    </VideoEditContext.Provider>
  );
}
