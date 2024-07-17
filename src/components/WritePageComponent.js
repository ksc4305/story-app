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
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(currentPage === 1 ? 0 : null);
  const [fromFinal, setFromFinal] = useState(false);


  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 선택한 옵션들 로그 표시
  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  // 페이지 로드 시 데이터를 가져옴
  useEffect(() => {
    const loadData = async () => {
      try {
        // GET 요청으로 스토리 컨텐츠를 가져옴
        const response = await axios.get(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/contents`);
        setOption1(response.data.options[0] || '');
        setOption2(response.data.options[1] || '');
        setOption3(response.data.options[2] || '');        
        if (currentPage === 1) {
          setSelectedOption(response.data.options[0]);  // 첫 번째 페이지일 경우 첫 번째 옵션을 자동으로 선택
        }
      } catch (error) {
        console.error('Error fetching story content:', error);
      }
    };

    loadData();
    if (fromFinalParam) {
      setFromFinal(true);  // fromFinal 파라미터가 있을 경우 설정
    }
  }, [currentPage, storyId, fromFinalParam]);

  // 콘텐츠를 생성하는 함수 ******************************여기가 페이지 렌더링 될 때 실행되야 하는 함수***********************************
  const generateContent = useCallback(async () => {
    setIsLoading(true);
    setOption1('');
    setOption2('');
    setOption3('');

    const response = await fetch(`http://localhost:8001/api/sse/stories/${storyId}/pages/${currentPage}/contents`, {
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

  // 옵션 선택 핸들러
  const handleOptionSelect = (option, index) => {
    setSelectedOption(option);    // 선택된 옵션 설정
    setSelectedOptionIndex(index);  // 선택된 옵션 인덱스 설정
  };

  // 다음 페이지로 이동하는 함수
  const handleNext = () => {
    if (!selectedOption && currentPage !== 1) return;
    dispatch(updateSelectedOption({ page: currentPage, option: selectedOption }));
    setSelectedOption('');  // 다음 페이지로 넘어갈 때 선택지 초기화

    const data = {
      options: options,
      selected_option_index: selectedOptionIndex
    };
    axios.post(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/contents`, data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    if (currentPage === 10) {
      navigate(`/final?story_id=${storyId}`);
    } else {
      navigate(`/write/${nextPage}?story_id=${storyId}`);
    }
  };

  // 최종 완료 핸들러
  const handleComplete = () => {
    dispatch(updateSelectedOption({ page: currentPage, option: selectedOption }));
    navigate(`/final?story_id=${storyId}`);
  };

  // 이전 페이지로 이동하는 함수
  const handlePrevious = () => {
    if (currentPage > 1) {
      setSelectedOption('');  // 이전 페이지로 돌아갈 때 선택지 초기화
      navigate(`/write/${currentPage - 1}?story_id=${storyId}`);
    }
  };

  return (

      <Box sx={{width: 300, mx: 'auto', mt: 4, textAlign: 'center'}}>
        <h3>Option 1:</h3>
        <p>{option1}</p>
        <h3>Option 2:</h3>
        <p>{option2}</p>
        <h3>Option 3:</h3>
        <p>{option3}</p>
        <Paper elevation={3} sx={{p: 2}}>
          <Typography variant="h5" sx={{mb: 2}}>Page.{currentPage}</Typography>
          {currentPage === 1 ? (
              <Typography variant="body1" sx={{mb: 2}}>
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
              <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                <Button
                    variant="contained"
                    onClick={handleComplete}
                    sx={{
                      bgcolor: 'lightgreen',
                      '&:hover': {bgcolor: 'rgba(144,238,144,0.5)'},
                      '&:active': {bgcolor: 'rgba(144,238,144,0.8)'}
                    }}
                >
                  완료
                </Button>
              </Box>
          ) : (
              <Box sx={{display: 'flex', justifyContent: currentPage === 1 ? 'center' : 'space-between', mt: 2}}>
                {currentPage !== 1 && (
                    <Button
                        variant="contained"
                        onClick={handlePrevious}
                        sx={{
                          bgcolor: 'lightgreen',
                          '&:hover': {bgcolor: 'rgba(144,238,144,0.5)'},
                          '&:active': {bgcolor: 'rgba(144,238,144,0.8)'}
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
                      '&:hover': {bgcolor: 'rgba(144,238,144,0.5)'},
                      '&:active': {bgcolor: 'rgba(144,238,144,0.8)'}
                    }}
                >
                  {currentPage === 10 ? '완료' : '다음'}
                </Button>
              </Box>
          )}
        </Paper>
        <Typography sx={{mt: 2}}>페이지: {currentPage === 'final' ? '완료' : `${currentPage} / 10`}</Typography>
        <Button onClick={generateContent} disabled={options.length > 0}>
          {options.length > 0 ? 'Loading...' : 'Generate Content'}
        </Button>
      </Box>
  );
};

export default WritePageComponent;
