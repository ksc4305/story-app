import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/system';

const VoiceSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');

  const [selectedVoice, setSelectedVoice] = useState('');
  const [voiceList] = useState([
    { image: 'https://via.placeholder.com/150?text=Voice+1', audio: 'voice1.mp3' },
    { image: 'https://via.placeholder.com/150?text=Voice+2', audio: 'voice2.mp3' },
    { image: 'https://via.placeholder.com/150?text=Voice+3', audio: 'voice3.mp3' },
    { image: 'https://via.placeholder.com/150?text=Voice+4', audio: 'voice4.mp3' },
    { image: 'https://via.placeholder.com/150?text=Voice+5', audio: 'voice5.mp3' },
    { image: 'https://via.placeholder.com/150?text=Voice+6', audio: 'voice6.mp3' }
  ]);

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handlePrevious = () => {
    navigate(`/finalCover?story_id=${storyId}`);
  };

  const handleComplete = () => {
    navigate(`/writeStory/${storyId}`);
  };

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 500, mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          그림책을 읽어줄 목소리를 선택하세요!
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, mb: 4 }}>
          {voiceList.map((voice, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                cursor: 'pointer',
                border: selectedVoice === voice ? '2px solid lightgreen' : '2px solid transparent',
                transition: 'border 0.3s',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => handleVoiceSelect(voice)}
            >
              <img src={voice.image} alt={`voice-${index}`} style={{ width: '100px', height: 'auto' }} />
              <IconButton onClick={() => new Audio(voice.audio).play()}>
                <PlayArrowIcon sx={{ color: 'purple' }} />
              </IconButton>
            </Paper>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="contained"
            onClick={handlePrevious}
            sx={{
              bgcolor: 'lightgreen',
              '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
              '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
            }}
          >
            이전
          </Button>
          <Button
            variant="contained"
            onClick={handleComplete}
            disabled={!selectedVoice}
            sx={{
              bgcolor: 'lightgreen',
              '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
              '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
            }}
          >
            완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VoiceSelection;
