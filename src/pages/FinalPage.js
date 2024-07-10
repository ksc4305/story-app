import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const FinalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/stories/${storyId}/contents`);
        setSentences(response.data.sentences);
      } catch (error) {
        console.error('Error fetching story content:', error);
      }
    };

    fetchData();
  }, [storyId]);

  const handleBack = () => {
    navigate(`/write/10?story_id=${storyId}`);
  };

  const handleCreate = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/stories/${storyId}/contents/final`, { sentences });
      alert('이야기가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Error finalizing story:', error);
    }
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h4">이야기 완성!</Typography>
      <Box sx={{ mt: 2 }}>
        {sentences.map((sentence, index) => (
          <Paper key={index} sx={{ mb: 2, p: 2 }}>
            {sentence}
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" onClick={handleBack}>
          이전
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          만들기
        </Button>
      </Box>
    </Box>
  );
};

export default FinalPage;
