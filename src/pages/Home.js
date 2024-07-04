import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import StoryList from '../components/StoryList';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/write');
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>그림책 생성</h1>
        <p>나만의 이야기를 삽화와 함께 만들어보세요</p>
        <Button variant="contained" color="inherit" onClick={handleStartClick}>Start Now</Button>
      </div>
      <div className="image-section">
        {/* 이미지 추가 공간 */}
        <img src={`${process.env.PUBLIC_URL}/Blue.jpg`} alt="logo" className="hero-image" />
      </div>
      <div className="read-section">
        <h2>READ</h2>
        <p>이야기를 그림책으로 만나보세요</p>
        <StoryList />
        <Button variant="outlined" color="primary">+ More</Button>
      </div>
    </div>
  );
}

export default Home;
