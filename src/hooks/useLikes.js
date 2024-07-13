import { useState, useEffect } from 'react';

function useLikes(stories) {
  const [likes, setLikes] = useState({});
  const [likedStories, setLikedStories] = useState({});

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    const storedLikedStories = JSON.parse(localStorage.getItem('likedStories')) || {};

    setLikes(storedLikes);
    setLikedStories(storedLikedStories);
  }, []);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('likedStories', JSON.stringify(likedStories));
  }, [likes, likedStories]);

  const handleLikeClick = (storyId) => {
    setLikes((prevLikes) => {
      const newLikes = {
        ...prevLikes,
        [storyId]: likedStories[storyId] ? (prevLikes[storyId] || 1) - 1 : (prevLikes[storyId] || 0) + 1,
      };
      return newLikes;
    });

    setLikedStories((prevLikedStories) => {
      const newLikedStories = {
        ...prevLikedStories,
        [storyId]: !prevLikedStories[storyId],
      };
      return newLikedStories;
    });
  };

  return { likes, likedStories, handleLikeClick };
}

export default useLikes;
