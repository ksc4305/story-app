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
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(selectedImages[currentPage - 1] || '');

  useEffect(() => {
    const fetchData = async () => {
      // 실제 서버 요청 부분
      try {
        const response = await axios.get(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/images`);
        setStory(response.data.content);
        setImages(response.data.images.slice(0, 2)); // 이미지 배열을 2개로 제한
      } catch (error) {
        console.error('Error fetching content:', error);
      }

      // 더미 데이터를 사용
      // setStory(`이것은 ${currentPage}번째 페이지의 이야기입니다.`);
      // setImages([
      //   'https://via.placeholder.com/150?text=Image+1',
      //   'https://via.placeholder.com/150?text=Image+2'
      // ]);
    };

    fetchData();
  }, [currentPage, storyId]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleNext = () => {
    if (selectedImage) {
      // 현재 페이지의 이미지를 selectedImages 배열에 업데이트
      const updatedSelectedImages = [...selectedImages];
      updatedSelectedImages[currentPage - 1] = selectedImage;
      dispatch(updateSelectedImage({ page: currentPage, image: selectedImage }));
  
      if (currentPage < 10) {
        setCurrentPage(currentPage + 1);
        setSelectedImage('');
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
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(updateSelectedImage({ page: currentPage, image: selectedImage }));
      setCurrentPage(currentPage - 1);
      setSelectedImage('');
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
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
            {images.map((image, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  cursor: 'pointer',
                  border: selectedImage === image ? '2px solid lightgreen' : '2px solid transparent',
                  transition: 'border 0.3s',
                  height: '150px', // 이미지 박스 높이를 줄임
                }}
                onClick={() => handleImageSelect(image)}
              >
                <img src={image} alt={`option-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Paper>
            ))}
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
              disabled={!selectedImage}
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