import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from 'axios';
import './ReadStoryPage.css';

function ReadStoryPage() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/stories/${storyId}`);
        setStory(response.data);
      } catch (error) {
        console.error('There was an error fetching the story!', error);
      }

      // 더미 데이터를 사용
      // const mockStory = {
      //   id: storyId,
      //   title: '동화 제목',
      //   author: '저자',
      //   contents: [
      //     '첫 번째 페이지 내용',
      //     '두 번째 페이지 내용',
      //     '세 번째 페이지 내용',
      //     // 추가 더미 데이터
      //   ],
      //   images: [
      //     '/image1.jpg',
      //     '/image2.jpg',
      //     '/image3.jpg',
      //     // 추가 더미 이미지
      //   ],
      // };
      // setStory(mockStory);
    };

    fetchStory();
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }

  const totalPages = story.contents.length;

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
        {story.images[currentPage] && (
          <img src={story.images[currentPage]} alt="Story" className="story-image" />
        )}
        <Typography variant="body1" className="story-content">
          {story.contents[currentPage]}
        </Typography>
        <Typography variant="body1" className="page-number">{currentPage + 1}/{totalPages}</Typography>
      </Box>
      <Box className="navigation-controls">
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIosIcon />
        </IconButton>
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
