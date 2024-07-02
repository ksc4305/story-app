import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid } from '@mui/material';
import './StorySummary.css';

function StorySummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, cover, paragraphs } = location.state;

  const handleCreateClick = () => {
    navigate('/voice-selection', { state: { title, cover, paragraphs } });
  };

  return (
    <div className="story-summary">
      <Typography variant="h4" className="title">{title}</Typography>
      <div className="cover-container">
        <img src={cover} alt="Cover" className="cover-image" />
      </div>
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="paragraph-container">
          <Typography variant="body1" className="paragraph-text">{paragraph.text}</Typography>
          <div className="image-container">
            <img src={paragraph.image} alt={`Paragraph ${index + 1}`} className="paragraph-image" />
          </div>
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleCreateClick} className="create-button">
        만들기
      </Button>
    </div>
  );
}

export default StorySummary;
