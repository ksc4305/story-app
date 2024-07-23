import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Button, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from 'axios';

function ReadStoryPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
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

  const totalPages = 12;

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
    if (story.voices && story.voices[currentPage - 1]) {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(story.voices[currentPage - 1]);
      setAudio(newAudio);
      newAudio.play();
    }
  };

  const handleExit = () => {
    navigate('/read');
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
          position: 'relative',
          gap: '50px' // 요소 간 간격 추가
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
                    objectFit: 'contain',
                    borderRadius: '10px' // 이미지 테두리 둥글게
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
        {currentPage > 0 && currentPage < 11 && (
          <>
            <Divider orientation="vertical" flexItem style={{ borderColor: 'lightgrey', height: '300px', marginTop: '70px' }} />
            <img 
              src={story.images[currentPage - 1]} 
              alt="Story" 
              style={{ 
                width: '45%', 
                height: 'auto', 
                marginBottom: '16px',
                borderRadius: '10px' // 이미지 테두리 둥글게
              }} 
            />
          </>
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
            onClick={handleExit}
            sx={{
              bgcolor: 'lightgreen',
              '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
              '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
            }}
          >
            나가기
          </Button>
        )}
      </Box>
    </div>
  );
}

export default ReadStoryPage;
