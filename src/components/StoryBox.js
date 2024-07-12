import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './StoryBox.css';

function StoryBox({ story, likes, likedStories, onClick, onLikeClick }) {
  return (
    <Box className="story-box" onClick={onClick}>
      {/* 이미지 URL을 사용하여 커버 이미지를 표시합니다 */}
      <img src={story.cover_image_url} alt={story.title} className="cover-image" />
      <Typography variant="h6">{story.title}</Typography>
      <Typography variant="subtitle1">{story.author}</Typography>
      <Box className="icon-container">
        <Box className="icon">
          <VisibilityIcon />
          <span>{story.clicks}</span>
        </Box>
        <Box className="icon">
          <IconButton
            className={`heart ${likedStories[story._id] ? 'filled' : ''}`}
            onClick={(e) => {
              e.stopPropagation(); // 스토리 클릭 이벤트를 방지합니다
              onLikeClick(story._id);
            }}
          >
            {likedStories[story._id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <span>{likes[story._id] || 0}</span>
        </Box>
      </Box>
    </Box>
  );
}

export default StoryBox;
