// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Typography, Paper } from '@mui/material';

// function Write4() {
//     const navigate = useNavigate();
//     const [currentPage, setCurrentPage] = useState(3);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [options, setOptions] = useState([
//         "밤하늘에 떠 있는 달처럼 조용하고 고요한 밤, 평화로운 숲속에서의 한 순간이 영원처럼 느껴졌다.",
//         "흔들리는 나뭇가지 사이로 햇살이 스며들면서, 모든 것이 새로워지는 기분이었다. 새 생명이 움트는 순간을 목격한 듯했다.",
//         "갑자기 내리치는 폭우 속에서도, 그 모든 소란과 혼란 속에서 한 줄기 빛이 비쳐왔다. 희망의 빛이었다."
//     ]);

//     const handleOptionSelect = (index) => {
//         setSelectedOption(index);
//     };

//     const handlePrevious = () => {
//         navigate('/write3'); // 이전 페이지로 이동
//     };

//     const handleNext = () => {
//         if (selectedOption !== null) {
//             navigate('/write5');  // 선택된 옵션을 가지고 다음 페이지로 이동 (Write5가 존재하는 경우)
//         }
//     };

//     return (
//         <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
//             <Typography variant="h5" sx={{ mb: 2 }}>Page.3</Typography>
//             {options.map((option, index) => (
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
//             <Typography sx={{ mt: 2 }}>페이지: {currentPage} / 10</Typography>
//         </Box>
//     );
// }

// export default Write4;
// Write4.js
import React from 'react';
import WritePage from './Writepage';
export default function Write4() {
    return <WritePage
        currentPage={4}
        nextPage='/write5'
        previousPage='/write3'
        textOptions={[
            "10",
            "11",
            "12"
        ]}
    />;
}
