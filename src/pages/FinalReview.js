// src/pages/FinalReview.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { getStory } from '../api'; // api.js에서 가져옴

function FinalReview() {
    const navigate = useNavigate();
    const [storyData, setStoryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // 서버 통신 주석 처리
            // const data = await getStory();
            const data = [
                { page: 1, option: 'Option1' },
                { page: 2, option: 'Option2' },
                { page: 3, option: 'Option3' },
            ]; // Mock data
            console.log("Story fetched (mock):", data);
            setStoryData(data);
        };

        fetchData();
    }, []);

    const handleCreate = () => {
        navigate('/imageSelection');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>스토리 최종 확인</Typography>
            {storyData.map((item, index) => (
                <Typography key={index}>{item.option}</Typography>
            ))}
            <Button variant="contained" color="primary" onClick={handleCreate}>만들기</Button>
        </Box>
    );
}

export default FinalReview;
