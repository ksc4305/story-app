import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, IconButton, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from 'axios';

function WriteStoryPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // 실제 서버에서 데이터를 가져오는 코드
    axios.get(`http://localhost:8000/api/stories/${storyId}`)
      .then(response => {
        setStory(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the story!', error);
      });

    // 더미 데이터를 사용하여 이야기와 이미지를 설정합니다.
    // const mockStory = {
    //   id: storyId,
    //   title: '동화 제목',
    //   author: '사용자 1',
    //   cover_image: '/cover.jpg',
    //   contents: [
    //     '',
    //     '동화 내용 1',
    //     '동화 내용 2',
    //     '동화 내용 3',
    //     '동화 내용 4',
    //     '동화 내용 5',
    //     '동화 내용 6',
    //     '동화 내용 7',
    //     '동화 내용 8',
    //     '동화 내용 9',
    //     '동화 내용 10',
    //     'Created by 사용자 1'
    //   ],
    //   images: [
    //     '/gg1.jpg',
    //     '/gg2.jpg',
    //     '/gg3.jpg',
    //     '/gg4.jpg',
    //     '/gg5.jpg',
    //     '/gg6.jpg',
    //     '/gg7.jpg',
    //     '/gg8.jpg',
    //     '/gg9.jpg',
    //     '/gg10.jpg',
    //     '/gg11.jpg'
    //   ],
    //   voices: [
    //     'voice1.mp3',
    //     'voice2.mp3',
    //     'voice3.mp3',
    //     'voice4.mp3',
    //     'voice5.mp3',
    //     'voice6.mp3',
    //     'voice7.mp3',
    //     'voice8.mp3',
    //     'voice9.mp3',
    //     'voice10.mp3'
    //   ],
    //   created_date: '2023-07-14'
    // };
    // setStory(mockStory);
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

  const handlePublish = () => {
    alert('게시되었습니다!');
    navigate('/read');
  };

  const handlePlayVoice = () => {
    if (story.voices && story.voices[currentPage]) {
      const audio = new Audio(story.voices[currentPage]);
      audio.play();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '16px' }}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 16px' }}>
          {story.images[currentPage] && (
            <img src={story.images[currentPage]} alt="Story" style={{ maxWidth: '100%', height: 'auto', marginBottom: '16px' }} />
          )}
          <Typography variant="body1" style={{ marginBottom: '16px' }}>
            {story.contents[currentPage]}
          </Typography>
          <Typography variant="body1">{currentPage + 1}/{totalPages}</Typography>
        </Box>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={handlePlayVoice}>
          <PlayCircleOutlineIcon />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        onClick={handlePublish}
        sx={{
          bgcolor: 'lightgreen',
          '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
          '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
        }}
      >
        게시하기
      </Button>
    </div>
  );
}

export default WriteStoryPage;
