import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StoryBox from '../components/StoryBox';
import './Home.css';
import useLikes from '../hooks/useLikes';
import { setStories } from '../store/storySlice';
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const { likes, likedStories, handleLikeClick } = useLikes(stories);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/stories');
        dispatch(setStories(response.data));
      } catch (error) {
        console.error('There was an error fetching the stories!', error);
      }
    };

    fetchStories();
  }, [dispatch]);

  const handleStartClick = () => {
    navigate('/write');
  };

  const handleMoreClick = () => {
    navigate('/read');
  };

  const handleStoryClick = (storyId) => {
    navigate(`/read/${storyId}`);
  };

  // 상위 6개의 이야기만 표시
  const topStories = stories.slice(0, 6);

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
          {topStories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story.id}>
              <StoryBox
                story={story}
                likes={likes}
                likedStories={likedStories}
                onClick={() => handleStoryClick(story.id)}
                onLikeClick={() => handleLikeClick(story.id)}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" color="primary" onClick={handleMoreClick} style={{ marginTop: '20px' }}>+ More</Button>
      </div>
    </div>
  );
}

export default Home;
