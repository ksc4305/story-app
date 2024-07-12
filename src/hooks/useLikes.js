import { useState, useEffect } from 'react';

function useLikes() {
  const [likes, setLikes] = useState({});
  const [likedStories, setLikedStories] = useState({});

  useEffect(() => {
    // 로컬 스토리지에서 사용자 하트 상태를 불러옵니다.
    const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    const storedLikedStories = JSON.parse(localStorage.getItem('likedStories')) || {};

    setLikes(storedLikes);
    setLikedStories(storedLikedStories);
  }, []);

  useEffect(() => {
    // 사용자 하트 상태를 로컬 스토리지에 저장합니다.
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('likedStories', JSON.stringify(likedStories));
  }, [likes, likedStories]);

  const handleLikeClick = (storyId) => {
    setLikes((prevLikes) => {
      const newLikes = {
        ...prevLikes,
        [storyId]: likedStories[storyId] ? (prevLikes[storyId] || 1) - 1 : (prevLikes[storyId] || 0) + 1,
      };
      localStorage.setItem('likes', JSON.stringify(newLikes));
      return newLikes;
    });

    setLikedStories((prevLikedStories) => {
      const newLikedStories = {
        ...prevLikedStories,
        [storyId]: !prevLikedStories[storyId],
      };
      localStorage.setItem('likedStories', JSON.stringify(newLikedStories));
      return newLikedStories;
    });
  };

  return { likes, likedStories, handleLikeClick };
}

export default useLikes;
