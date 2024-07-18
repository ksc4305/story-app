import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from "axios";

const FinalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const selectedOptions = useSelector((state) => state.story.selectedOptions);
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    // 예시 데이터를 사용하여 10가지 내용을 출력
    const allSentences = [...Object.values(selectedOptions)];
    setSentences(allSentences);
  }, [selectedOptions]);

  const handleBack = () => {
    navigate(`/write/10?story_id=${storyId}`);
  };

  const handleCreate = async () => {
    const data = {
      contents: sentences
    }
    try {
      await axios.post(`http://127.0.0.1:8000/api/sse/stories/${storyId}/contents`, data);
      alert('이야기가 성공적으로 저장되었습니다.');
      navigate(`/imageSelection?story_id=${storyId}`);
    } catch (error) {
      console.error('Error finalizing story:', error);
    }
  };

  const handleClick = (index) => {
    navigate(`/write/${index + 1}?story_id=${storyId}&fromFinal=true`);
  };

  return (
    <Box sx={{ width: '80%', maxWidth: 800, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Box sx={{ mt: 2 }}>
        {sentences.map((sentence, index) => (
          <Paper
            key={index + 1}
            sx={{
              mb: 2,
              p: 2,
              cursor: 'pointer',
              bgcolor: 'white',
              '&:hover': {
                bgcolor: 'rgba(144,238,144,0.5)',
              },
              '&:active': {
                bgcolor: 'rgba(144,238,144,0.8)',
              },
              transition: 'background-color 0.3s',
              width: '100%'
            }}
            onClick={() => handleClick(index)}
          >
            {sentence}
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'lightgreen',
            '&:hover': {
              bgcolor: 'rgba(144,238,144,0.5)',
            },
            '&:active': {
              bgcolor: 'rgba(144,238,144,0.8)',
            },
          }}
          onClick={handleCreate}
        >
          만들기
        </Button>
      </Box>
    </Box>
  );
};

export default FinalPage;
