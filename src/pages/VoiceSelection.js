import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid } from '@mui/material';
import './VoiceSelection.css';

function VoiceSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, cover, paragraphs } = location.state;
  const [selectedVoice, setSelectedVoice] = useState(null);

  const voices = [
    { id: 1, name: 'Voice 1' },
    { id: 2, name: 'Voice 2' },
    { id: 3, name: 'Voice 3' },
  ];

  const handleVoiceClick = (voice) => {
    setSelectedVoice(voice);
  };

  const handleFinishClick = () => {
    // 이야기를 완성하는 로직 추가
    // 예를 들어, title, cover, paragraphs, selectedVoice를 저장하고 다음 페이지로 이동할 수 있습니다.
    console.log('이야기 완성:', { title, cover, paragraphs, selectedVoice });
    // navigate('/finished-page'); // 완료 페이지로 이동
  };

  return (
    <div className="voice-selection">
      <Typography variant="h4" className="title">목소리를 선택하세요!</Typography>
      <Grid container spacing={2} className="voice-grid">
        {voices.map((voice) => (
          <Grid item xs={4} key={voice.id}>
            <div
              className={`voice ${selectedVoice === voice ? 'selected' : ''}`}
              onClick={() => handleVoiceClick(voice)}
            >
              <Typography variant="body1">{voice.name}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleFinishClick} className="finish-button">
        음성 선택
      </Button>
    </div>
  );
}

export default VoiceSelection;
