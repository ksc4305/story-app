import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStory } from '../contexts/StoryContext';
import { Box, Button, Typography } from '@mui/material';

function FinalReview() {
    const navigate = useNavigate();
    const { selectedOptions, removeLastOption } = useStory();

    const handlePrevious = () => {
        removeLastOption();  // 마지막 선택된 옵션을 제거
        navigate('/write10');  // 마지막 페이지로 돌아가기
    };

    const handleCreate = () => {
        // 최종 스토리 생성 및 이미지 선택 페이지로 넘어가는 로직
        navigate('/imageSelection');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>스토리 최종 확인</Typography>
            {selectedOptions.map((option, index) => (
                <Typography key={index}>{option}</Typography>
            ))}
            <Button variant="contained" onClick={handlePrevious}>이전</Button>
            <Button variant="contained" color="primary" onClick={handleCreate}>만들기</Button>
        </Box>
    );
}

export default FinalReview;
