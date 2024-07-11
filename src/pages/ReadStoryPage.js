// src/pages/ReadStoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import axios from 'axios'; // 서버 사용 시 주석 해제
import './ReadStoryPage.css';

function ReadStoryPage() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // axios.get(`/api/stories/${storyId}`) // 서버 사용 시 주석 해제
    //   .then(response => {
    //     setStory(response.data);
    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the story!', error);
    //   });
    const mockStory = {
      id: storyId,
      creator: '사용자 1', // 창작자 이름
      pages: [
        { image: '/path/to/cover.jpg', content: '' }, // Cover page
        { image: '/path/to/image1.jpg', content: '동화 내용 1' },
        { image: '/path/to/image2.jpg', content: '동화 내용 2' },
        { image: '/path/to/image3.jpg', content: '동화 내용 3' },
        { image: '/path/to/image4.jpg', content: '동화 내용 4' },
        { image: '/path/to/image5.jpg', content: '동화 내용 5' },
        { image: '/path/to/image6.jpg', content: '동화 내용 6' },
        { image: '/path/to/image7.jpg', content: '동화 내용 7' },
        { image: '/path/to/image8.jpg', content: '동화 내용 8' },
        { image: '/path/to/image9.jpg', content: '동화 내용 9' },
        { image: '/path/to/image10.jpg', content: '동화 내용 10' },
        { content: 'Created by 사용자 1' } // Last page with only content
      ]
    };
    setStory(mockStory);
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }

  const totalPages = story.pages.length;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="read-story-page">
      <Box className="story-page">
        {story.pages[currentPage].image && (
          <img src={story.pages[currentPage].image} alt="Story" className="story-image" />
        )}
        <Typography variant="body1" className="story-content">
          {story.pages[currentPage].content}
        </Typography>
      </Box>
      <Box className="navigation-controls">
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="body1" className="page-number">{currentPage + 1}/{totalPages}</Typography>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box className="play-button">
        <IconButton>
          <PlayCircleOutlineIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default ReadStoryPage;
