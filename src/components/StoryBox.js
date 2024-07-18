import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './StoryBox.css';

function StoryBox({ story, likes, likedStories, onClick, onLikeClick }) {
  return (
    <Box className="story-box" onClick={onClick}>
      <img src={story.cover_image_url} alt={story.title} className="cover-image" />
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1 }}>{story.title}</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>{story.author}</Typography>
      <Box className="icon-container">
        <Box className="icon">
          <VisibilityIcon />
          {/* <span>{story.clicks}</span> */}
        </Box>
        <Box className="icon">
          <IconButton
            className={`heart ${likedStories[story._id] ? 'filled' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
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
