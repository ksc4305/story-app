// src/pages/ReadPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, Typography, Box } from '@mui/material';
import './ReadPage.css';

function ReadPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStoryClick = (storyId) => {
    navigate(`/read/${storyId}`);
  };

  const stories = [
    { id: 1, title: '동화 제목 1', author: '사용자 1' },
    { id: 2, title: '동화 제목 2', author: '사용자 2' },
    { id: 3, title: '동화 제목 3', author: '사용자 3' },
    { id: 4, title: '동화 제목 4', author: '사용자 4' },
    { id: 5, title: '동화 제목 5', author: '사용자 5' },
    { id: 6, title: '동화 제목 6', author: '사용자 6' },
    { id: 7, title: '동화 제목 7', author: '사용자 7' },
    { id: 8, title: '동화 제목 8', author: '사용자 8' },
    { id: 9, title: '동화 제목 9', author: '사용자 9' },
    { id: 10, title: '동화 제목 10', author: '사용자 10' },
    { id: 11, title: '동화 제목 11', author: '사용자 11' },
    { id: 12, title: '동화 제목 12', author: '사용자 12' },
  ];

  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="read-page">
      <Typography variant="h4" className="title">동화 검색</Typography>
      <TextField
        label="검색"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <Grid container spacing={2} className="story-grid">
        {filteredStories.map((story) => (
          <Grid item xs={4} key={story.id}>
            <Box className="story-box" onClick={() => handleStoryClick(story.id)}>
              <Typography variant="h6">{story.title}</Typography>
              <Typography variant="subtitle1">{story.author}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ReadPage;
