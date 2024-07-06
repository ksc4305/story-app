import React from 'react';
import { useStory } from '../contexts/StoryContext';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Write1() {
    const { addOption } = useStory();
    const navigate = useNavigate();

    const initialText = '인생의 시작에 방랑자처럼 천천히 걸었습니다...';

    // "다음" 버튼을 눌렀을 때 실행되는 함수
    const handleNext = () => {
        addOption(initialText);  // 리스트에 초기 텍스트 추가
        navigate('/write2');     // Write2 페이지로 이동
    };

    return (
        <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Page.1</Typography>
                <Typography sx={{ mb: 2 }}>{initialText}</Typography>
                <Button variant="contained" onClick={handleNext}>다음</Button>
            </Paper>
            <Typography sx={{ mt: 2 }}>페이지: 1 / 10</Typography>
        </Box>
    );
}

export default Write1;
