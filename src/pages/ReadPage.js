import React, { useState } from 'react';
import { TextField, Grid, Typography, Box } from '@mui/material';
import './ReadPage.css';

function ReadPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const stories = [
    { title: '동화 제목 1', author: '사용자 1' },
    { title: '동화 제목 2', author: '사용자 2' },
    { title: '동화 제목 3', author: '사용자 3' },
    { title: '동화 제목 4', author: '사용자 4' },
    { title: '동화 제목 5', author: '사용자 5' },
    { title: '동화 제목 6', author: '사용자 6' },
    { title: '동화 제목 7', author: '사용자 7' },
    { title: '동화 제목 8', author: '사용자 8' },
    { title: '동화 제목 9', author: '사용자 9' },
    { title: '동화 제목 10', author: '사용자 10' },
    { title: '동화 제목 11', author: '사용자 11' },
    { title: '동화 제목 12', author: '사용자 12' },
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
        {filteredStories.map((story, index) => (
          <Grid item xs={4} key={index}>
            <Box className="story-box">
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
