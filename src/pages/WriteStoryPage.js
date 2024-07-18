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

  const totalPages = 12;

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
    if (story.voices && story.voices[currentPage - 1]) {
      const audio = new Audio(story.voices[currentPage - 1]);
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
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      textAlign: 'center', 
      position: 'relative'
    }}>
      <Box 
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: currentPage === 0 || currentPage === 11 ? 'center' : 'flex-start', 
          maxWidth: '80%', 
          margin: '0 auto', 
          position: 'relative' 
        }}
      >
        <Box 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            margin: '0 16px', 
            width: currentPage === 0 || currentPage === 11 ? '100%' : '50%', 
            padding: '16px', 
            height: '100%' 
          }}
        >
          {currentPage === 0 ? (
            <>
              <Typography variant="h3" style={{ marginTop: '20px', textAlign: 'center' }}>
                {story.title}
              </Typography>
              {story.cover_image && (
                <img 
                  src={story.cover_image} 
                  alt="Cover" 
                  style={{ 
                    width: 'auto', 
                    height: '80vh', 
                    marginTop: '20px', 
                    objectFit: 'contain' 
                  }} 
                />
              )}
            </>
          ) : currentPage === 11 ? (
            <Typography variant="h4" style={{ marginTop: '20px', textAlign: 'center' }}>
              Created by {story.author}
            </Typography>
          ) : (
            <Typography variant="body1" style={{ marginTop: '20px', fontSize: '1.2rem', height: '100%' }}>
              {story.contents[currentPage - 1]}
            </Typography>
          )}
        </Box>
        {story.images[currentPage - 1] && currentPage > 0 && currentPage < 11 && (
          <img src={story.images[currentPage - 1]} alt="Story" style={{ width: '45%', height: 'auto', marginBottom: '16px' }} />
        )}
      </Box>
      <Box style={{ position: 'absolute', top: '50%', width: '100%', display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)' }}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0} style={{ fontSize: '4rem' }}>
          <ArrowBackIosIcon style={{ fontSize: 'inherit' }} />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1} style={{ fontSize: '4rem' }}>
          <ArrowForwardIosIcon style={{ fontSize: 'inherit' }} />
        </IconButton>
      </Box>
      <Typography variant="h5" style={{ marginTop: '20px', marginBottom: '20px' }}>
        {currentPage + 1}/{totalPages}
      </Typography>
      <Box>
        {currentPage > 0 && currentPage < 11 && (
          <IconButton onClick={handlePlayVoice} style={{ fontSize: '3rem', color: 'lightgreen' }}>
            <PlayCircleOutlineIcon fontSize="inherit" />
          </IconButton>
        )}
        {currentPage === 11 && (
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
        )}
      </Box>
    </div>
  );
}

export default WriteStoryPage;
