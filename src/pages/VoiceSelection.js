import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

const VoiceSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceList, setVoiceList] = useState([]);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/voices');
        setVoiceList(response.data);
      } catch (error) {
        console.error('Error fetching voices:', error);
      }
    };

    fetchVoices();
  }, []);

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handlePrevious = () => {
    navigate(`/finalCover?story_id=${storyId}`);
  };

  const handleComplete = async () => {
    if (selectedVoice) {
      try {
        await axios.post(`http://localhost:8000/api/stories/${storyId}/voices/${selectedVoice.id}`);
        alert('음성이 성공적으로 저장되었습니다.');
        navigate(`/writeStory/${storyId}`);
      } catch (error) {
        console.error('Error saving voice:', error);
      }
    }
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
              <IconButton onClick={(e) => { e.stopPropagation(); new Audio(voice.audio).play(); }}>
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
