import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function StartImageSelection() {
    return (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>지금부터 문단에 어울리는 이미지를 선택하세요!</Typography>
            <Button variant="contained" color="primary">시작</Button>
        </Box>
    );
}

export default StartImageSelection;
