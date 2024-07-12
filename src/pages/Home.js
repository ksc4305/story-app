import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
// import axios from 'axios'; // 서버 사용 시 주석 해제
import StoryBox from '../components/StoryBox';
import './Home.css';
import useLikes from '../hooks/useLikes';

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stories, setStories] = useState([]);
  const { likes, likedStories, handleLikeClick } = useLikes(stories);

  useEffect(() => {
    // axios.get('/api/stories') // 서버 사용 시 주석 해제
    //   .then(response => {
    //     setStories(response.data);
    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the stories!', error);
    //   });
    const mockStories = [
      { _id: '1', cover_image_url: '/gg1.jpg', title: '동화 제목 1', author: '사용자 1', clicks: 5 },
      { _id: '2', cover_image_url: '/gg2.jpg', title: '동화 제목 2', author: '사용자 2', clicks: 3 },
      { _id: '3', cover_image_url: '/gg3.jpg', title: '동화 제목 3', author: '사용자 3', clicks: 10 },
      { _id: '4', cover_image_url: '/gg4.jpg', title: '동화 제목 4', author: '사용자 4', clicks: 1 },
      { _id: '5', cover_image_url: '/gg5.jpg', title: '동화 제목 5', author: '사용자 5', clicks: 7 },
      { _id: '6', cover_image_url: '/gg6.jpg', title: '동화 제목 6', author: '사용자 6', clicks: 2 },

    ];
    setStories(mockStories);
  }, []);

  const handleStartClick = () => {
    navigate('/write');
  };

  const handleMoreClick = () => {
    navigate('/read');
  };

  const handleStoryClick = (storyId) => {
    navigate(`/read/${storyId}`);
  };

  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredStories.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story._id}>
              <StoryBox
                story={story}
                likes={likes}
                likedStories={likedStories}
                onClick={() => handleStoryClick(story._id)}
                onLikeClick={() => handleLikeClick(story._id)}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" color="primary" onClick={handleMoreClick}>+ More</Button>
      </div>
    </div>
  );
}

export default Home;
