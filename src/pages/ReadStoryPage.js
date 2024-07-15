import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from 'axios';
import './ReadStoryPage.css';

function ReadStoryPage() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/stories/${storyId}`);
        setStory(response.data);
      } catch (error) {
        console.error('There was an error fetching the story!', error);
      }
    };

    fetchStory();
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }

  const totalPages = story.contents.length;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="read-story-page">
      <Box className="story-page">
        {story.images[currentPage] && (
          <img src={story.images[currentPage]} alt="Story" className="story-image" />
        )}
        <Typography variant="body1" className="story-content">
          {story.contents[currentPage]}
        </Typography>
        <Typography variant="body1" className="page-number">{currentPage + 1}/{totalPages}</Typography>
      </Box>
      <Box className="navigation-controls">
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box className="play-button">
        <IconButton>
          <PlayCircleOutlineIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default ReadStoryPage;
