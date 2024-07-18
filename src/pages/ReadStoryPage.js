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
  const [audio, setAudio] = useState(null);  // 현재 재생 중인 오디오 객체를 저장

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
      //   voices: [
      //     'voice1.mp3',
      //     'voice2.mp3',
      //     'voice3.mp3',
      //     // 추가 더미 음성 파일
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
    if (audio) {
      audio.pause();  // 재생 중인 음성이 있으면 중지
      setAudio(null);  // 오디오 객체 초기화
    }
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (audio) {
      audio.pause();  // 재생 중인 음성이 있으면 중지
      setAudio(null);  // 오디오 객체 초기화
    }
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlayVoice = () => {
    if (story.voices && story.voices[currentPage]) {
      if (audio) {
        audio.pause();  // 재생 중인 음성이 있으면 중지
      }
      const newAudio = new Audio(story.voices[currentPage]);
      setAudio(newAudio);  // 새로운 오디오 객체 저장
      newAudio.play();  // 새로운 음성 재생
    }
  };

  return (
    <div className="read-story-page">
      <Box className="story-page">
        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '80%', margin: '0 auto' }}>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '0 16px', width: '50%' }}>
            <Typography variant="body1" className="story-content">
              {story.contents[currentPage]}
            </Typography>
            <Typography variant="body1" className="page-number">
              {currentPage + 1}/{totalPages}
            </Typography>
          </Box>
          {story.images[currentPage] && (
            <img src={story.images[currentPage]} alt="Story" className="story-image" />
          )}
        </Box>
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
        <IconButton onClick={handlePlayVoice}>
          <PlayCircleOutlineIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default ReadStoryPage;
