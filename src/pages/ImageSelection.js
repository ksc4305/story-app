import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedImage } from '../store/storySlice';
import axios from "axios";

const ImageSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const initialPage = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1;
  const dispatch = useDispatch();
  const selectedImages = useSelector((state) => state.story.selectedImages);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [story, setStory] = useState('');
  const [image, setImage] = useState('');
  // const [selectedImage, setSelectedImage] = useState(selectedImages[currentPage - 1] || '');

  useEffect(() => {
    const fetchData = async () => {
      // 실제 서버 요청 부분
      try {
        const response = await axios.get(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/images`);
        setStory(response.data.content);
        setImage(response.data.images[0]); // 이미지 하나만 설정
      } catch (error) {
        console.error('Error fetching content:', error);
      }

      // 더미 데이터를 사용
      // setStory(`이것은 ${currentPage}번째 페이지의 이야기입니다.`);
      // setImage('https://via.placeholder.com/150?text=Image+1');
    };

    fetchData();
  }, [currentPage, storyId]);

  const handleNext = () => {
    // 현재 페이지의 이미지를 selectedImages 배열에 업데이트
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages[currentPage - 1] = image;
    dispatch(updateSelectedImage({ page: currentPage, image: image }));

    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
      navigate(`/imageSelection?story_id=${storyId}&page=${currentPage + 1}`);
    } else {
      const data = {
        selected_images: updatedSelectedImages // 선택된 이미지 배열을 서버로 전송
      };
      axios.post(`http://localhost:8000/api/sse/stories/${storyId}/images`, data)
          .then(res => {
            navigate(`/finalCover?story_id=${storyId}`);
          })
          .catch(err => {
            console.log(err);
          });
      // console.log('Story images saved:', data);
      // navigate(`/finalCover?story_id=${storyId}`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(updateSelectedImage({ page: currentPage, image: image }));
      setCurrentPage(currentPage - 1);
      navigate(`/imageSelection?story_id=${storyId}&page=${currentPage - 1}`);
    }
  };

  const handleStart = () => {
    setCurrentPage(1);
    navigate(`/imageSelection?story_id=${storyId}&page=1`);
  };

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      {currentPage === 0 ? (
        <>
          <Typography variant="h4" sx={{ mb: 4 }}>
            지금부터 내용에 어울리는 이미지를 선택하세요!
          </Typography>
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
            onClick={handleStart}
          >
            시작
          </Button>
        </>
      ) : (
        <Box sx={{ width: '80%', maxWidth: 800, mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">{story}</Typography>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Paper
              sx={{
                p: 1,
                height: '250px', // 이미지 박스 높이를 줄임
              }}
            >
              <img src={image} alt="story" style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
            </Paper>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Button
              variant="contained"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              sx={{
                bgcolor: 'lightgreen',
                '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
                '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
              }}
            >
              이전
            </Button>
            <Typography>{currentPage} / 10</Typography>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                bgcolor: 'lightgreen',
                '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
                '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
              }}
            >
              다음
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageSelection;
