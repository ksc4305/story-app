import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Typography } from '@mui/material';
import './CoverSelection.css';

function CoverSelection() {
  const [title, setTitle] = useState('제목을 입력하세요!');
  const [selectedCover, setSelectedCover] = useState(null);
  const navigate = useNavigate();

  const covers = [
    'Cover 1',
    'Cover 2',
    'Cover 3',
    'Cover 4',
    'Cover 5',
    'Cover 6',
  ];

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTitleFocus = () => {
    if (title === '제목을 입력하세요!') {
      setTitle('');
    }
  };

  const handleTitleBlur = () => {
    if (title === '') {
      setTitle('제목을 입력하세요!');
    }
  };

  const handleCoverClick = (cover) => {
    setSelectedCover(cover);
  };

  const handleApplyClick = () => {
    navigate('/story-edit', { state: { title, cover: selectedCover } });
  };

  return (
    <div className="cover-selection">
      <TextField
        variant="outlined"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        onFocus={handleTitleFocus}
        onBlur={handleTitleBlur}
        className="title-input"
      />
      <Typography variant="h5" className="subtitle">표지를 선택하세요!</Typography>
      <Grid container spacing={2} className="cover-grid">
        {covers.map((cover, index) => (
          <Grid item xs={6} key={index}>
            <div
              className={`cover ${selectedCover === cover ? 'selected' : ''}`}
              onClick={() => handleCoverClick(cover)}
            >
              <Typography variant="h6" className="cover-text">{cover}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      <div className="button-container">
        <Button variant="contained" color="primary" onClick={handleApplyClick} className="apply-button">
          적용하기
        </Button>
      </div>
    </div>
  );
}

export default CoverSelection;
