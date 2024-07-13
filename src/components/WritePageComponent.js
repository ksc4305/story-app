import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Paper } from '@mui/material';
import { updateSelectedOption } from '../store/storySlice';

// 더미 데이터 함수
const fetchStoryContent = async (storyId, page) => {
  if (page === 1) {
    return ["이것은 첫 번째 페이지의 문장입니다."];
  }

  return [
    `이것은 ${page}번째 문장의 첫 번째 선택지입니다.`,
    `이것은 ${page}번째 문장의 두 번째 선택지입니다.`,
    `이것은 ${page}번째 문장의 세 번째 선택지입니다.`,
  ];
};

const fetchFinalStoryContent = async (storyId) => {
  return ["이것은 첫 번째 페이지의 문장입니다."];
};

const WritePageComponent = ({ currentPage, nextPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const fromFinalParam = queryParams.get('fromFinal');
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.story.selectedOptions);
  const [options, setOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(currentPage === 1 ? 0 : null);
  const [fromFinal, setFromFinal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const options = await fetchStoryContent(storyId, currentPage);
      setOptions(options);

      if (currentPage === 1) {
        setSelectedOption(options[0]);
      }
    };

    loadData();
    if (fromFinalParam) {
      setFromFinal(true);
    }
  }, [currentPage, storyId, fromFinalParam]);

  const handleOptionSelect = (option, index) => {
    setSelectedOption(option);
    setSelectedOptionIndex(index);
  };

  const handleNext = () => {
    if (!selectedOption && currentPage !== 1) return;
    dispatch(updateSelectedOption({ page: currentPage, option: selectedOption }));
    setSelectedOption('');

    // 더미 데이터를 사용하여 서버 요청 부분 주석 처리
    // const data = {
    //   options: options,
    //   selected_option_index: selectedOptionIndex
    // };
    // axios.post(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/contents`, data)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    if (currentPage === 10) {
      navigate(`/final?story_id=${storyId}`);
    } else {
      navigate(`/write/${nextPage}?story_id=${storyId}`);
    }
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
    <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Page.{currentPage}</Typography>
        {currentPage === 1 ? (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {options[0]}
          </Typography>
        ) : (
          options.map((option, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                mb: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: selectedOption === option ? 'rgba(144,238,144,0.8)' : 'background.paper',
                '&:hover': {
                  bgcolor: 'rgba(144,238,144,0.5)',
                },
                '&:active': {
                  bgcolor: 'rgba(144,238,144,0.8)',
                },
                transition: 'background-color 0.3s',
              }}
              onClick={() => handleOptionSelect(option, index)}
            >
              {option}
            </Paper>
          ))
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
    </Box>
  );
};

export default WritePageComponent;
