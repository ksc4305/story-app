import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedImage } from '../store/storySlice'; // 이미지 선택을 저장하는 리덕스 액션

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
  const [selectedImage, setSelectedImage] = useState(selectedImages[currentPage] || '');

  useEffect(() => {
    const fetchData = async () => {
      // 서버 요청 부분 주석 처리
      // try {
      //   const storyResponse = await axios.get(`http://localhost:8000/api/stories/${storyId}/contents/${currentPage}`);
      //   const imageResponse = await axios.get(`http://localhost:8000/api/images/${currentPage}`);
      //   setStory(storyResponse.data.story);
      //   setImages(imageResponse.data.images);
      // } catch (error) {
      //   console.error('Error fetching content:', error);
      // }

      // 더미 데이터를 사용
      setStory(`이것은 ${currentPage}번째 페이지의 이야기입니다.`);
      setImages([
        'https://via.placeholder.com/150?text=Image+1',
        'https://via.placeholder.com/150?text=Image+2',
        'https://via.placeholder.com/150?text=Image+3',
        'https://via.placeholder.com/150?text=Image+4'
      ]);
    };

    fetchData();
  }, [currentPage, storyId]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleNext = () => {
    if (selectedImage) {
      dispatch(updateSelectedImage({ page: currentPage, image: selectedImage }));
      if (currentPage < 10) {
        setCurrentPage(currentPage + 1);
        setSelectedImage('');
        navigate(`/imageSelection?story_id=${storyId}&page=${currentPage + 1}`);
      } else {
        navigate(`/finalCover?story_id=${storyId}`);
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
    // '시작' 버튼 클릭 시 첫 번째 페이지로 이동
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
        <Box sx={{ width: '100%', maxWidth: 500, mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                }}
                onClick={() => handleImageSelect(image)}
              >
                <img src={image} alt={`option-${index}`} style={{ width: '100%', height: 'auto' }} />
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
