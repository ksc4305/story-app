import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedImage } from '../store/storySlice'; // 이미지 선택을 저장하는 리덕스 액션

const FinalPageWithCover = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storyId = queryParams.get('story_id');
  const dispatch = useDispatch();
  const selectedImages = useSelector((state) => state.story.selectedImages);

  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [coverImages, setCoverImages] = useState([]);
  const [selectedCover, setSelectedCover] = useState('');

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
    setSelectedCover(cover);
  };

  const handlePrevious = () => {
    navigate(`/imageSelection?story_id=${storyId}&page=10`);
  };

  const handleComplete = () => {
    // 완료 버튼 클릭 시 음성 선택 페이지로 이동
    navigate(`/voiceSelection?story_id=${storyId}`);
  };

  return (
    <Box sx={{ width: '100%', minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: 500, mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TextField
          label="제작자"
          fullWidth
          variant="outlined"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="제목"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
                border: selectedCover === cover ? '2px solid lightgreen' : '2px solid transparent',
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
            disabled={!creator || !title || !selectedCover}
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
