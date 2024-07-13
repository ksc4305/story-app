import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoryBox from '../components/StoryBox';
import './ReadPage.css';
import useLikes from '../hooks/useLikes';
import { useDispatch, useSelector } from 'react-redux';
import { setStories } from '../store/storySlice';

function ReadPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const { likes, likedStories, handleLikeClick } = useLikes(stories);

  useEffect(() => {
    // axios.get('/api/stories') // 서버 사용 시 주석 해제
    //   .then(response => {
    //     dispatch(setStories(response.data));
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
      { _id: '7', cover_image_url: '/gg7.jpg', title: '동화 제목 7', author: '사용자 7', clicks: 4 },
      { _id: '8', cover_image_url: '/gg8.jpg', title: '동화 제목 8', author: '사용자 8', clicks: 9 },
      { _id: '9', cover_image_url: '/gg9.jpg', title: '동화 제목 9', author: '사용자 9', clicks: 6 },
      { _id: '10', cover_image_url: '/gg10.jpg', title: '동화 제목 10', author: '사용자 10', clicks: 8 },
      { _id: '11', cover_image_url: '/gg11.jpg', title: '동화 제목 11', author: '사용자 11', clicks: 11 },
      { _id: '12', cover_image_url: '/gg1.jpg', title: '동화 제목 12', author: '사용자 12', clicks: 12 },
    ];
    dispatch(setStories(mockStories));
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStoryClick = (storyId) => {
    navigate(`/read/${storyId}`);
  };

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
                <IconButton onClick={() => {}} className="search-icon">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
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
    </div>
  );
}

export default ReadPage;
