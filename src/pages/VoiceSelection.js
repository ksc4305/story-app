import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import axios from 'axios';

const VoiceSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceList, setVoiceList] = useState([]);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/voices');
        setVoiceList(response.data);
      } catch (error) {
        console.error('Error fetching voices:', error);
      }

      // 더미 데이터를 사용
      // setVoiceList([
      //   {
      //     id: 1,
      //     name: 'Voice 1',
      //     image: 'https://via.placeholder.com/100?text=Voice+1',
      //     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      //   },
      //   {
      //     id: 2,
      //     name: 'Voice 2',
      //     image: 'https://via.placeholder.com/100?text=Voice+2',
      //     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      //   },
      //   {
      //     id: 3,
      //     name: 'Voice 3',
      //     image: 'https://via.placeholder.com/100?text=Voice+3',
      //     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      //   },
      //   {
      //     id: 4,
      //     name: 'Voice 4',
      //     image: 'https://via.placeholder.com/100?text=Voice+4',
      //     audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
      //   }
      // ]);
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

    // 더미 데이터로 완료 작업을 표시합니다.
    // if (selectedVoice) {
    //   console.log('Voice selected:', selectedVoice);
    //   alert('음성이 성공적으로 저장되었습니다.');
    //   navigate(`/writeStory/${storyId}`);
    // }
  };

  const handlePlayPause = (voice) => {
    if (playingVoiceId === voice.id) {
      audioRef.current.pause();
      setPlayingVoiceId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(voice.audio);
      audioRef.current = audio;
      audio.play();
      setPlayingVoiceId(voice.id);
      audio.onended = () => {
        setPlayingVoiceId(null);
      };
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 600, mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          그림책을 읽어줄 목소리를 선택하세요!
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 4 }}>
          {voiceList.map((voice, index) => (
            <Box
              key={index}
              sx={{
                p: 1,
                cursor: 'pointer',
                border: selectedVoice === voice ? '2px solid lightgreen' : '2px solid transparent',
                borderRadius: '10px', // 테두리를 둥글게 만듦
                transition: 'border 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onClick={() => handleVoiceSelect(voice)}
            >
              <img
                src={voice.image}
                alt={`voice-${index}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '20%' // 이미지 테두리 둥글게
                }}
              />
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {voice.name}
              </Typography>
              <IconButton onClick={(e) => { e.stopPropagation(); handlePlayPause(voice); }}>
                {playingVoiceId === voice.id ? (
                  <PauseIcon sx={{ color: 'lightgreen' }} /> // 일시 정지 아이콘
                ) : (
                  <PlayArrowIcon sx={{ color: 'lightgreen' }} /> // 재생 아이콘
                )}
              </IconButton>
            </Box>
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
