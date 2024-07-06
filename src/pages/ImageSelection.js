import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';

function ImageSelection() {
    const navigate = useNavigate();
    const location = useLocation(); // 스토리 내용을 가져오기 위해 사용
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([
        { id: 1, src: 'path/to/image1.jpg', alt: 'Image 1' },
        { id: 2, src: 'path/to/image2.jpg', alt: 'Image 2' },
        { id: 3, src: 'path/to/image3.jpg', alt: 'Image 3' },
        { id: 4, src: 'path/to/image4.jpg', alt: 'Image 4' }
    ]);

    const handleImageSelect = (imageId) => {
        setSelectedImage(imageId);
    };

    const handlePrevious = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleNext = () => {
        if (selectedImage !== null) {
            navigate('/nextPage', { state: { selectedImage: images.find(img => img.id === selectedImage) } });
        }
    };

    return (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>지금부터 문단에 어울리는 이미지를 선택하세요!</Typography>
            <Typography>{location.state?.text}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {images.map(image => (
                    <Paper
                        key={image.id}
                        component="img"
                        src={image.src}
                        alt={image.alt}
                        sx={{
                            width: 100,
                            height: 100,
                            cursor: 'pointer',
                            border: selectedImage === image.id ? '2px solid blue' : 'none'
                        }}
                        onClick={() => handleImageSelect(image.id)}
                    />
                ))}
            </Box>
            <Button variant="contained" onClick={handlePrevious} sx={{ mt: 2 }}>이전</Button>
            <Button variant="contained" color="primary" onClick={handleNext} disabled={!selectedImage} sx={{ mt: 2, ml: 2 }}>다음</Button>
        </Box>
    );
}

export default ImageSelection;
