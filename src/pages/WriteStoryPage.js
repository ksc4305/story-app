import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from 'axios';

function WriteStoryPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/stories/${storyId}`)
      .then(response => {
        setStory(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the story!', error);
      });
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }

  const totalPages = story.contents.length;

  const handleNextPage = () => {
    stopAudio();
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    stopAudio();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePublish = () => {
    alert('게시되었습니다!');
    navigate('/read');
  };

  const handlePlayVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (story.voices && story.voices[currentPage]) {
      const audio = new Audio(story.voices[currentPage]);
      audioRef.current = audio;
      audio.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '16px', maxWidth: '80%', position: 'relative' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 16px', width: '50%' }}>
          <Typography variant="body1" style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {story.contents[currentPage]}
          </Typography>
        </Box>
        <div style={{ borderLeft: '2px solid #ccc', height: '100%' }}></div>
        {story.images[currentPage] && (
          <img src={story.images[currentPage]} alt="Story" style={{ maxWidth: '45%', height: 'auto', marginBottom: '16px' }} />
        )}
      </Box>
      <Typography variant="body1" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        {currentPage + 1}/{totalPages}
      </Typography>
      <Box>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={handlePlayVoice} style={{ fontSize: '3rem' }}>
          <PlayCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        onClick={handlePublish}
        sx={{
          bgcolor: 'lightgreen',
          '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
          '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
        }}
      >
        게시하기
      </Button>
    </div>
  );
}

export default WriteStoryPage;
