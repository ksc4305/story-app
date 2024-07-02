import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Typography } from '@mui/material';
import './StoryEdit.css';

function StoryEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, cover } = location.state;
  const [paragraphs, setParagraphs] = useState(['첫 번째 문단 텍스트']);  // 초기 문단 텍스트
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'path/to/image1.jpg',
    'path/to/image2.jpg',
    'path/to/image3.jpg',
    'path/to/image4.jpg',
    'path/to/image5.jpg',
    'path/to/image6.jpg',
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleApplyClick = () => {
    const newParagraphs = [...paragraphs];
    newParagraphs[currentParagraph] = {
      text: paragraphs[currentParagraph],
      image: selectedImage,
    };
    setParagraphs(newParagraphs);
    if (currentParagraph < paragraphs.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
      setSelectedImage(null);
    } else {
      navigate('/story-summary', { state: { title, cover, paragraphs: newParagraphs } });
    }
  };

  return (
    <div className="story-edit">
      <Typography variant="h5" className="title">{title}</Typography>
      <Typography variant="h6" className="subtitle">문단 {currentParagraph + 1}</Typography>
      <TextField
        label="문단 텍스트"
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={paragraphs[currentParagraph].text}
        className="paragraph-input"
        disabled
      />
      <Typography variant="h6" className="subtitle">그림을 선택하세요!</Typography>
      <Grid container spacing={2} className="image-grid">
        {images.map((image, index) => (
          <Grid item xs={4} key={index}>
            <div
              className={`image ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => handleImageClick(image)}
            >
              <img src={image} alt={`Image ${index + 1}`} className="image-thumbnail" />
            </div>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleApplyClick} className="apply-button">
        그림 적용
      </Button>
    </div>
  );
}

export default StoryEdit;
