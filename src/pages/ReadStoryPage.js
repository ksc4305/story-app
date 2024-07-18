import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from 'axios';

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
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      textAlign: 'center', 
      position: 'relative',
      backgroundImage: 'url(/path/to/your/book-background-image.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}>
      <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '80%', margin: '0 auto', position: 'relative' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 16px', width: '50%', padding: '16px' }}>
          <Typography variant="body1" style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {story.contents[currentPage]}
          </Typography>
        </Box>
        <div style={{ borderLeft: '4px solid grey', height: '100%', margin: '0 16px' }}></div>
        {story.images[currentPage] && (
          <img src={story.images[currentPage]} alt="Story" style={{ width: '45%', height: 'auto', marginBottom: '16px' }} />
        )}
      </Box>
      <Box style={{ position: 'absolute', top: '50%', width: '100%', display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)' }}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0} style={{ fontSize: '2rem' }}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1} style={{ fontSize: '2rem' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={handlePlayVoice} style={{ fontSize: '3rem', color: 'lightgreen' }}>
          <PlayCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Typography variant="body1" style={{ fontWeight: 'bold', position: 'absolute', top: 'calc(50% + 40px)', left: '50%', transform: 'translateX(-50%)' }}>
        {currentPage + 1}/{totalPages}
      </Typography>
    </div>
  );
}

export default ReadStoryPage;
