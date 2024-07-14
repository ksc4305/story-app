import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedImage, updateCoverImage, updateCreator, updateTitle } from '../store/storySlice'; // 추가된 리덕스 액션
import axios from 'axios';

const FinalPageWithCover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const dispatch = useDispatch();
  const selectedImages = useSelector((state) => state.story.selectedImages);
  const creator = useSelector((state) => state.story.creator);
  const title = useSelector((state) => state.story.title);
  const coverImage = useSelector((state) => state.story.coverImage);

  const [coverImages, setCoverImages] = useState([]);

  useEffect(() => {
    // 더미 데이터를 사용하여 표지 이미지를 설정합니다.
    setCoverImages([
      'https://via.placeholder.com/150?text=Cover+1',
      'https://via.placeholder.com/150?text=Cover+2',
      'https://via.placeholder.com/150?text=Cover+3',
      'https://via.placeholder.com/150?text=Cover+4'
    ]);
  }, []);

  const handleCoverSelect = (cover) => {
    dispatch(updateCoverImage(cover)); // 선택한 표지 이미지를 리덕스 상태에 저장
  };

  const handlePrevious = () => {
    navigate(`/imageSelection?story_id=${storyId}&page=10`);
  };

  const handleComplete = async () => {
    try {
      await axios.post(`/api/stories/${storyId}/final`, {
        title,
        author: creator,
        cover_image: coverImage
      });
      navigate(`/voiceSelection?story_id=${storyId}`);
    } catch (error) {
      console.error('Error saving final story data:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 500, mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TextField
          label="제작자"
          fullWidth
          variant="outlined"
          value={creator}
          onChange={(e) => dispatch(updateCreator(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          label="제목"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => dispatch(updateTitle(e.target.value))}
          sx={{ mb: 4 }}
        />
        <Typography variant="h6" sx={{ mb: 2 }}>표지</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 4 }}>
          {coverImages.map((cover, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                cursor: 'pointer',
                border: coverImage === cover ? '2px solid lightgreen' : '2px solid transparent',
                transition: 'border 0.3s',
              }}
              onClick={() => handleCoverSelect(cover)}
            >
              <img src={cover} alt={`cover-${index}`} style={{ width: '100%', height: 'auto' }} />
            </Paper>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <Button
            variant="contained"
            onClick={handleComplete}
            disabled={!creator || !title || !coverImage}
            sx={{
              bgcolor: 'lightgreen',
              '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
              '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
            }}
          >
            완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalPageWithCover;
