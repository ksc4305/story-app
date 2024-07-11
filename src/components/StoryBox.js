// src/components/StoryBox.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

function StoryBox({ story, likes, onClick, onLikeClick }) {
  return (
    <Box className="story-box" onClick={onClick}>
      <img src={story.cover_image_url} alt={story.title} className="cover-image" />
      <Typography variant="h6">{story.title}</Typography>
      <Typography variant="subtitle1">{story.author}</Typography>
      <Box className="icon-container">
        <Box className="icon">
          <VisibilityIcon />
          <span>{story.clicks}</span>
        </Box>
        <Box className="icon">
          <FavoriteIcon
            className={`heart ${likes[story._id] ? 'filled' : ''}`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering story click
              onLikeClick(story._id);
            }}
          />
          <span>{likes[story._id] || 0}</span>
        </Box>
      </Box>
    </Box>
  );
}

export default StoryBox;
