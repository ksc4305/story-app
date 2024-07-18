import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Paper } from '@mui/material';
import { updateSelectedOption } from '../store/storySlice';
import axios from "axios";

const WritePageComponent = ({ currentPage, nextPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const fromFinalParam = queryParams.get('fromFinal');
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.story.selectedOptions);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(currentPage === 1 ? 0 : null);
  const [fromFinal, setFromFinal] = useState(false);

  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = useCallback(async () => {
    setIsLoading(true);
    setOption1('');
    setOption2('');
    setOption3('');

    const response = await fetch(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/contents`, {
      method: 'GET'
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            setIsLoading(false);
            return;
          } else {
            try {
              const jsonData = JSON.parse(data);
              if ('option1' in jsonData) {
                setOption1(prev => prev + jsonData.option1);
              } else if ('option2' in jsonData) {
                setOption2(prev => prev + jsonData.option2);
              } else if ('option3' in jsonData) {
                setOption3(prev => prev + jsonData.option3);
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
        }
      }
    }
  }, [currentPage, storyId]);

  useEffect(() => {
    generateContent();
    if (fromFinalParam) {
      setFromFinal(true);
    }
  }, [currentPage, storyId, fromFinalParam, generateContent]);

  const handleOptionSelect = (option, index) => {
    setSelectedOption(option);
    setSelectedOptionIndex(index);
  };

  const handleNext = () => {
    if (!selectedOption && currentPage !== 1) return;
    dispatch(updateSelectedOption({ page: currentPage, option: selectedOption }));
    setSelectedOption('');

    setOption1('');
    setOption2('');
    setOption3('');

    const data = {
      options: [option1, option2, option3],
      selected_option_index: selectedOptionIndex
    };

    axios.post(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/contents`, data)
      .then(res => {
        console.log(res);

        if (currentPage === 10) {
          navigate(`/final?story_id=${storyId}`);
        } else {
          navigate(`/write/${nextPage}?story_id=${storyId}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleComplete = () => {
    dispatch(updateSelectedOption({ page: currentPage, option: selectedOption }));
    navigate(`/final?story_id=${storyId}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setSelectedOption('');
      navigate(`/write/${currentPage - 1}?story_id=${storyId}`);
    }
  };

  return (
    <Box sx={{ width: '80%', maxWidth: 800, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Page.{currentPage}</Typography>
        {currentPage === 1 ? (
          <Paper
            key={0}
            elevation={3}
            sx={{
              mb: 2,
              p: 2,
              cursor: 'pointer',
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'rgba(144,238,144,0.5)',
              },
              '&:active': {
                bgcolor: 'rgba(144,238,144,0.8)',
              },
              transition: 'background-color 0.3s',
            }}
            onClick={() => handleOptionSelect(option1, 0)}
          >
            {option1}
          </Paper>
        ) : (
          <>
            <Paper
              key={0}
              elevation={3}
              sx={{
                mb: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'rgba(144,238,144,0.5)',
                },
                '&:active': {
                  bgcolor: 'rgba(144,238,144,0.8)',
                },
                transition: 'background-color 0.3s',
              }}
              onClick={() => handleOptionSelect(option1, 0)}
            >
              {option1}
            </Paper>
            <Paper
              key={1}
              elevation={3}
              sx={{
                mb: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'rgba(144,238,144,0.5)',
                },
                '&:active': {
                  bgcolor: 'rgba(144,238,144,0.8)',
                },
                transition: 'background-color 0.3s',
              }}
              onClick={() => handleOptionSelect(option2, 1)}
            >
              {option2}
            </Paper>
            <Paper
              key={2}
              elevation={3}
              sx={{
                mb: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'rgba(144,238,144,0.5)',
                },
                '&:active': {
                  bgcolor: 'rgba(144,238,144,0.8)',
                },
                transition: 'background-color 0.3s',
              }}
              onClick={() => handleOptionSelect(option3, 2)}
            >
              {option3}
            </Paper>
          </>
        )}
        {fromFinal ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleComplete}
              sx={{
                bgcolor: 'lightgreen',
                '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
                '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
              }}
            >
              완료
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: currentPage === 1 ? 'center' : 'space-between', mt: 2 }}>
            {currentPage !== 1 && (
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
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!selectedOption && currentPage !== 1}
              sx={{
                bgcolor: 'lightgreen',
                '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
                '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
              }}
            >
              {currentPage === 10 ? '완료' : '다음'}
            </Button>
          </Box>
        )}
      </Paper>
      <Typography sx={{ mt: 2 }}>페이지: {currentPage === 'final' ? '완료' : `${currentPage} / 10`}</Typography>
      <Button onClick={generateContent} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Generate Content'}
      </Button>
    </Box>
  );
};

export default WritePageComponent;
