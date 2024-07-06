import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

function FinalReview() {
    const navigate = useNavigate();

    const handlePrevious = () => {
        navigate('/write10');
    };

    const handleCreate = () => {
        navigate('/imageSelection');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>스토리 최종 확인</Typography>
            <Typography>여기에 사용자가 선택한 모든 이야기 내용을 나열합니다.</Typography>
            <Button variant="contained" onClick={handlePrevious}>이전</Button>
            <Button variant="contained" color="primary" onClick={handleCreate} sx={{ marginLeft: 2 }}>만들기</Button>
        </Box>
    );
}

export default FinalReview;
