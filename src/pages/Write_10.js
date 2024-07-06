
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Typography, Paper } from '@mui/material';

// function Write10() {
//     const navigate = useNavigate();
//     const [selectedOption, setSelectedOption] = useState(null);
//     const textOptions = ["28", "29", "30"];

//     const handleOptionSelect = (index) => {
//         setSelectedOption(index);
//     };

//     const handlePrevious = () => {
//         navigate('/write9');
//     };

//     // 수정: 다음 버튼을 클릭했을 때 최종 검토 페이지로 이동
//     const handleNext = () => {
//         if (selectedOption !== null) {
//             navigate('/finalReview'); // 사용자가 옵션을 선택했을 때만 최종 검토 페이지로 이동
//         }
//     };

//     return (
//         <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
//             <Typography variant="h5" sx={{ mb: 2 }}>Page.10</Typography>
//             {textOptions.map((option, index) => (
//                 <Paper
//                     key={index}
//                     elevation={3}
//                     sx={{
//                         mb: 2,
//                         p: 2,
//                         cursor: 'pointer',
//                         bgcolor: selectedOption === index ? 'primary.main' : 'background.paper'
//                     }}
//                     onClick={() => handleOptionSelect(index)}
//                 >
//                     {option}
//                 </Paper>
//             ))}
//             <Button variant="contained" sx={{ mr: 1 }} onClick={handlePrevious}>
//                 이전
//             </Button>
//             <Button variant="contained" disabled={selectedOption === null} onClick={handleNext}>
//                 다음
//             </Button>
//             <Typography sx={{ mt: 2 }}>페이지: 10 / 10</Typography>
//         </Box>
//     );
// }

// export default Write10;
// Write10.js
import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write10() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={10}
        nextPage='/finalReview' // 최종 리뷰 페이지로 연결
        previousPage='/write9'
        textOptions={["Option10-1", "Option10-2", "Option10-3"]}
        onSelectOption={addOption}
    />;
}
