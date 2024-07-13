import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
// import axios from 'axios';

const Write1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    // 서버에서 선택한 문장을 가져오는 코드 (주석 처리)
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/stories/${storyId}/contents/1`);
    //     const { options } = response.data;
    //     if (options && options.length > 0) {
    //       setSentence(options[0]);
    //     } else {
    //       setSentence("No content available.");
    //     }
    //   } catch (error) {
    //     console.error('Error fetching story content:', error);
    //     setSentence("Failed to fetch content.");
    //   }
    // };

    // fetchData();

    // 더미 데이터를 사용하여 첫 번째 문장 설정
    setSentence("이것은 첫 번째 페이지의 문장입니다.");
  }, [storyId]);

  const handleNext = () => {
    navigate(`/write/2?story_id=${storyId}`);
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Page.1</Typography>
        <Typography sx={{ mb: 2 }}>{sentence}</Typography>
        <Button variant="contained" onClick={handleNext}>다음</Button>
      </Paper>
      <Typography sx={{ mt: 2 }}>페이지: 1 / 10</Typography>
    </Box>
  );
};

export default Write1;
