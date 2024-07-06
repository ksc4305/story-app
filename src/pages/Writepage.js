import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';

function WritePage({ currentPage, nextPage, previousPage, textOptions }) {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handlePrevious = () => {
        navigate(previousPage);
    };

    const handleNext = () => {
        if (selectedOption !== null) {
            navigate(nextPage);
        }
    };

    return (
        <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Page.{currentPage}</Typography>
            {textOptions.map((option, index) => (
                <Paper
                    key={index}
                    elevation={3}
                    sx={{
                        mb: 2,
                        p: 2,
                        cursor: 'pointer',
                        bgcolor: selectedOption === index ? 'primary.main' : 'background.paper'
                    }}
                    onClick={() => handleOptionSelect(index)}
                >
                    {option}
                </Paper>
            ))}
            <Button variant="contained" sx={{ mr: 1 }} onClick={handlePrevious} disabled={currentPage === 1}>
                이전
            </Button>
            <Button variant="contained" disabled={selectedOption === null} onClick={handleNext}>
                다음
            </Button>
            <Typography sx={{ mt: 2 }}>페이지: {currentPage} / 10</Typography>
        </Box>
    );
}

export default WritePage;
