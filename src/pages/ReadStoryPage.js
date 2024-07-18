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
  const [audio, setAudio] = useState(null);

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
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlayVoice = () => {
    if (story.voices && story.voices[currentPage]) {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(story.voices[currentPage]);
      setAudio(newAudio);
      newAudio.play();
    }
  };

  return (
    <div className="read-story-page">
      <Box className="story-page">
        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '80%', margin: '0 auto', position: 'relative' }}>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 16px', width: '50%' }}>
            <Typography variant="body1" className="story-content">
              {story.contents[currentPage]}
            </Typography>
          </Box>
          <div style={{ borderLeft: '2px solid #ccc', height: '100%' }}></div>
          {story.images[currentPage] && (
            <img src={story.images[currentPage]} alt="Story" className="story-image" />
          )}
        </Box>
      </Box>
      <Typography variant="body1" className="page-number">
        {currentPage + 1}/{totalPages}
      </Typography>
      <Box className="navigation-controls">
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box className="play-button">
        <IconButton onClick={handlePlayVoice} style={{ fontSize: '3rem' }}>
          <PlayCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </div>
  );
}

export default ReadStoryPage;
