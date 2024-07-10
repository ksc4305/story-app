// src/pages/ImageSelect.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { saveStory } from '../api'; // 나중에 서버에 저장하기 위해 사용

function ImageSelect({ currentPage, previousPage, nextPage, storyOption }) {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg"
    ]; // AI가 추천한 이미지 리스트

    const handleImageSelect = (index) => {
        setSelectedImage(index);
    };

    const handleNext = async () => {
        if (selectedImage !== null) {
            const imageData = {
                page: currentPage,
                option: storyOption,
                image: images[selectedImage]
            };
            // 나중에 서버에 데이터 저장
            // await saveStory(imageData);
            console.log("Image saved (mock):", imageData); // Mock save
            navigate(nextPage);
        }
    };

    const handlePrevious = () => {
        navigate(previousPage);
    };

    return (
        <Box sx={{ width: '80%', mx: 'auto', mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Page.{currentPage} 이미지 선택</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>{storyOption}</Typography>
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item xs={6} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                cursor: 'pointer',
                                bgcolor: selectedImage === index ? 'primary.main' : 'background.paper'
                            }}
                            onClick={() => handleImageSelect(index)}
                        >
                            <img src={image} alt={`option-${index}`} style={{ width: '100%' }} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handlePrevious}>이전</Button>
            <Button variant="contained" sx={{ mt: 2, ml: 2 }} disabled={selectedImage === null} onClick={handleNext}>
                다음
            </Button>
        </Box>
    );
}

export default ImageSelect;
