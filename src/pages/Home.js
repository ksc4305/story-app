import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
import { Button } from '@mui/material';
import StoryList from '../components/StoryList';
import './Home.css';

function Home() {
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleStartClick = () => {
    navigate('/write');  // 버튼 클릭 시 write 페이지로 이동
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>이야기 생성</h1>
        <p>나만의 이야기를 만들어보세요</p>
        <Button variant="contained" color="primary" onClick={handleStartClick}>Start Now</Button>
      </div>
      <div className="read-section">
        <h2>Read</h2>
        <p>이야기를 그림책으로 만나보세요</p>
        <StoryList />
        <Button variant="outlined" color="primary">+ More</Button>
      </div>
    </div>
  );
}

export default Home;
