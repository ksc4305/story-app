// src/components/WritePageComponent.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useStory } from '../contexts/StoryContext';

const WritePageComponent = ({ currentPage, nextPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const { selectedOptions, setSelectedOptions } = useStory();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/stories/${storyId}/contents/${currentPage}`);
        setOptions(response.data.options || [
          `이것은 ${currentPage}번째 문장의 첫 번째 선택지입니다.`,
          `이것은 ${currentPage}번째 문장의 두 번째 선택지입니다.`,
          `이것은 ${currentPage}번째 문장의 세 번째 선택지입니다.`,
        ]); // 예시 선택지 제공
      } catch (error) {
        console.error('Error fetching story content:', error);
        setOptions([
          `이것은 ${currentPage}번째 문장의 첫 번째 선택지입니다.`,
          `이것은 ${currentPage}번째 문장의 두 번째 선택지입니다.`,
          `이것은 ${currentPage}번째 문장의 세 번째 선택지입니다.`,
        ]); // 예시 선택지 제공
      }
    };

    fetchData();
  }, [storyId, currentPage]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    try {
      await axios.post(`http://127.0.0.1:8000/api/stories/${storyId}/contents/${currentPage}`, { sentence: selectedOption });
      setSelectedOptions(prevOptions => [...prevOptions, selectedOption]);
      setSelectedOption(''); // 다음 페이지로 넘어갈 때 선택지 초기화
      navigate(`/write/${nextPage}?story_id=${storyId}`);
    } catch (error) {
      console.error('Error saving story content:', error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setSelectedOptions(prevOptions => prevOptions.slice(0, -1));
      setSelectedOption(''); // 이전 페이지로 돌아갈 때 선택지 초기화
      navigate(`/write/${currentPage - 1}?story_id=${storyId}`);
    }
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Page.{currentPage}</Typography>
        {options.map((option, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              mb: 2,
              p: 2,
              cursor: 'pointer',
              bgcolor: selectedOption === option ? 'primary.main' : 'background.paper'
            }}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Paper>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handlePrevious} disabled={currentPage === 1}>
            이전
          </Button>
          <Button variant="contained" onClick={handleNext} disabled={!selectedOption}>
            다음
          </Button>
        </Box>
      </Paper>
      <Typography sx={{ mt: 2 }}>페이지: {currentPage} / 10</Typography>
    </Box>
  );
};

export default WritePageComponent;
