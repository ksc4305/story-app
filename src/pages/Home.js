import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StoryBox from '../components/StoryBox';
import './Home.css';
import useLikes from '../hooks/useLikes';
import { setStories } from '../store/storySlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const { likes, likedStories, handleLikeClick } = useLikes(stories);

  useEffect(() => {
    // 실제 서버에서 데이터를 가져올 때 주석 해제
    // axios.get('/api/stories')
    //   .then(response => {
    //     dispatch(setStories(response.data));
    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the stories!', error);
    //   });

    // 더미 데이터 사용
    const mockStories = [
      { _id: '1', cover_image_url: '/gg1.jpg', title: '동화 제목 1', author: '사용자 1', clicks: 5 },
      { _id: '2', cover_image_url: '/gg2.jpg', title: '동화 제목 2', author: '사용자 2', clicks: 3 },
      { _id: '3', cover_image_url: '/gg3.jpg', title: '동화 제목 3', author: '사용자 3', clicks: 10 },
      { _id: '4', cover_image_url: '/gg4.jpg', title: '동화 제목 4', author: '사용자 4', clicks: 1 },
      { _id: '5', cover_image_url: '/gg5.jpg', title: '동화 제목 5', author: '사용자 5', clicks: 7 },
      { _id: '6', cover_image_url: '/gg6.jpg', title: '동화 제목 6', author: '사용자 6', clicks: 2 },
    ];
    dispatch(setStories(mockStories));
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
          {stories.map((story) => (
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
