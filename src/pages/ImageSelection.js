import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import axios from "axios";

function ImageSelection() {
    const navigate = useNavigate();
    const location = useLocation(); // 스토리 내용을 가져오기 위해 사용
    const storyId = location.state;
    let [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedIndexList, setSelectedIndexList] = useState(new Array(10).fill(null));
    const [images, setImages] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        console.log(`선택된 이미지 번호 리스트 ${selectedIndexList}`);
        console.log(`선택된 이미지 번호: ${selectedIndex}`);
    }, [selectedIndexList, selectedIndex]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sse/stories/${storyId}/pages/${currentPage}/images`)
            .then(res => {
                setImages(res.data.images);
                setContent(res.data.content);
            })
            .catch(err => {
                console.log(err);
            })
    }, [currentPage]);

    const handleImageSelect = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
        setSelectedIndexList(prev => {
            const newList = [...prev];
            newList[currentPage - 1] = index;
            return newList;
        });
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage === 10) {
            const data = {
                selected_options_index: selectedIndexList
            };
            axios.post(`http://localhost:8000/api/sse/stories/${storyId}/images`, data) // 수정된 URL
                .then(res => {
                    console.log(res);
                    alert("이미지가 정상적으로 저장됐습니다");
                    // 제목, 이름, 표지 페이지로 이동
                    navigate('/cover', { state: { storyId } }); // 다음 페이지로 이동 (예: 표지 페이지)
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            setCurrentPage(prev => prev + 1);
        }

        setSelectedIndex(null);
        setSelectedImage(null);
    };

    return (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>{currentPage}페이지</Typography>
            <Typography variant="h4" gutterBottom>{content}</Typography>
            <Typography>{location.state?.text}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {images.map((image, index) => (
                    <Paper
                        key={index}
                        component="img"
                        src={image}
                        alt={"none"}
                        sx={{
                            width: 100,
                            height: 100,
                            cursor: 'pointer',
                            border: selectedImage === image ? '2px solid blue' : 'none'
                        }}
                        onClick={() => handleImageSelect(image, index)}
                    />
                ))}
            </Box>
            <Button variant="contained" onClick={handlePrevious} sx={{ mt: 2 }}>이전</Button>
            <Button variant="contained" color="primary" onClick={handleNext} disabled={selectedIndex === null} sx={{ mt: 2, ml: 2 }}>{currentPage === 10 ? "완료" : "다음"}</Button>
        </Box>
    );
}

export default ImageSelection;
