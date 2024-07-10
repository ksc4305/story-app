// src/pages/ReadPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './ReadPage.css';

function ReadPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStoryClick = (storyId) => {
    navigate(`/read/${storyId}`);
  };

  const handleSearchClick = () => {
    // Add any specific search functionality here if needed
  };

  const handleLikeClick = (storyId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [storyId]: (prevLikes[storyId] || 0) + 1,
    }));
  };

  const stories = [
    { id: 1, title: '동화 제목 1', author: '사용자 1', clicks: 5 },
    { id: 2, title: '동화 제목 2', author: '사용자 2', clicks: 3 },
    { id: 3, title: '동화 제목 3', author: '사용자 3', clicks: 10 },
    { id: 4, title: '동화 제목 4', author: '사용자 4', clicks: 1 },
    { id: 5, title: '동화 제목 5', author: '사용자 5', clicks: 7 },
    { id: 6, title: '동화 제목 6', author: '사용자 6', clicks: 2 },
    { id: 7, title: '동화 제목 7', author: '사용자 7', clicks: 4 },
    { id: 8, title: '동화 제목 8', author: '사용자 8', clicks: 9 },
    { id: 9, title: '동화 제목 9', author: '사용자 9', clicks: 6 },
    { id: 10, title: '동화 제목 10', author: '사용자 10', clicks: 8 },
    { id: 11, title: '동화 제목 11', author: '사용자 11', clicks: 11 },
    { id: 12, title: '동화 제목 12', author: '사용자 12', clicks: 12 },
  ];

  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="read-page">
      <div className="search-input-container">
        <TextField
          label="책의 제목을 입력하세요"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchClick} className="search-icon">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Grid container spacing={2} className="story-grid">
        {filteredStories.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <Box className="story-box" onClick={() => handleStoryClick(story.id)}>
              <Typography variant="h6">{story.title}</Typography>
              <Typography variant="subtitle1">{story.author}</Typography>
              <Box className="icon-container">
                <Box className="icon">
                  <VisibilityIcon />
                  <span>{story.clicks}</span>
                </Box>
                <Box className="icon">
                  <FavoriteIcon
                    className={`heart ${likes[story.id] ? 'filled' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering story click
                      handleLikeClick(story.id);
                    }}
                  />
                  <span>{likes[story.id] || 0}</span>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ReadPage;
