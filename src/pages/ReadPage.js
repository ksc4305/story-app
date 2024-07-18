import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoryBox from '../components/StoryBox';
import './ReadPage.css';
import useLikes from '../hooks/useLikes';
import { useDispatch, useSelector } from 'react-redux';
import { setStories } from '../store/storySlice';
import axios from 'axios';

function ReadPage() {
  const [searchTerm, setSearchTerm] = useState('');
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
                <IconButton className="search-icon">
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
    </div>
  );
}

export default ReadPage;
