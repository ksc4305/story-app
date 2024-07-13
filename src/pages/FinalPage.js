import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// import axios from 'axios';

const FinalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const selectedOptions = useSelector((state) => state.story.selectedOptions);
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    // 서버에서 선택한 항목들을 가져오는 코드 (주석 처리)
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/stories/${storyId}/contents`);
    //     setSentences(response.data.sentences);
    //   } catch (error) {
    //     console.error('Error fetching story content:', error);
    //   }
    // };

    // fetchData();

    // 예시 데이터를 사용하여 10가지 내용을 출력
    const initialSentence = "이것은 첫 번째 페이지의 문장입니다."; // 첫 번째 페이지 문장 추가
    const allSentences = [initialSentence, ...Object.values(selectedOptions)];
    setSentences(allSentences);
  }, [selectedOptions]);

  const handleBack = () => {
    navigate(`/write/10?story_id=${storyId}`);
  };

  const handleCreate = async () => {
    // 서버에 선택한 항목들을 최종 저장하는 코드 (주석 처리)
    // try {
    //   await axios.post(`http://127.0.0.1:8000/api/stories/${storyId}/contents/final`, { sentences });
    //   alert('이야기가 성공적으로 저장되었습니다.');
    // } catch (error) {
    //   console.error('Error finalizing story:', error);
    // }
    alert('이야기가 성공적으로 저장되었습니다.'); // 예시용 알림
  };

  const handleClick = (index) => {
    navigate(`/write/${index + 1}?story_id=${storyId}&fromFinal=true`);
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {sentences[0]}
        </Typography>
        {sentences.slice(1).map((sentence, index) => (
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
              bgcolor: 'rgba(144,238,144,0.8)', // 클릭 시 효과
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
