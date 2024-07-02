import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Typography } from '@mui/material';
import './CoverSelection.css';

function CoverSelection() {
  const [title, setTitle] = useState('');
  const [selectedCover, setSelectedCover] = useState(null);
  const navigate = useNavigate();

  const covers = [
    'path/to/image1.jpg',
    'path/to/image2.jpg',
    'path/to/image3.jpg',
    'path/to/image4.jpg',
    'path/to/image5.jpg',
    'path/to/image6.jpg',
  ];

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCoverClick = (cover) => {
    setSelectedCover(cover);
  };

  const handleApplyClick = () => {
    // title과 selectedCover를 state로 전달하며 다음 페이지로 이동
    navigate('/story-edit', { state: { title, cover: selectedCover } });
  };

  return (
    <div className="cover-selection">
      <Typography variant="h4" className="title">제목을 입력하세요!</Typography>
      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        className="title-input"
      />
      <Typography variant="h5" className="subtitle">표지를 선택하세요!</Typography>
      <Grid container spacing={2} className="cover-grid">
        {covers.map((cover, index) => (
          <Grid item xs={4} key={index}>
            <div
              className={`cover ${selectedCover === cover ? 'selected' : ''}`}
              onClick={() => handleCoverClick(cover)}
            >
              <img src={cover} alt={`Cover ${index + 1}`} className="cover-image" />
            </div>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleApplyClick} className="apply-button">
        표지 적용
      </Button>
    </div>
  );
}

export default CoverSelection;
