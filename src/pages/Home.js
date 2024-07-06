import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Grid } from '@mui/material';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/write');
  };

  const handleMoreClick = () => {
    navigate('/read');
  };

  const stories = [
    { title: '동화 제목 1', author: '사용자 1' },
    { title: '동화 제목 2', author: '사용자 2' },
    { title: '동화 제목 3', author: '사용자 3' },
    { title: '동화 제목 4', author: '사용자 4' },
    { title: '동화 제목 5', author: '사용자 5' },
    { title: '동화 제목 6', author: '사용자 6' },
  ];

  return (
    <div className="home">
      <div className="hero">
        <h1>그림책 생성</h1>
        <p>나만의 이야기를 삽화와 함께 만들어보세요</p>
        <Button variant="contained" color="primary" onClick={handleStartClick} style={{ backgroundColor: '#000' }}>Start Now</Button>      
      </div>
      <div className="read-section">
        <h2>READ</h2>
        <p>이야기를 그림책으로 만나보세요</p>
        <Grid container spacing={2} className="story-grid">
          {stories.map((story, index) => (
            <Grid item xs={4} key={index}>
              <Box className="story-box">
                <Typography variant="h6">{story.title}</Typography>
                <Typography variant="subtitle1">{story.author}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" color="primary" onClick={handleMoreClick}>+ More</Button>
      </div>
    </div>
  );
}

export default Home;


