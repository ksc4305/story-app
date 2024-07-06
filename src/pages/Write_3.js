// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, Typography, Paper } from '@mui/material';

// function Write3() {
//     const navigate = useNavigate();
//     const [currentPage, setCurrentPage] = useState(2);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [options, setOptions] = useState([
//         "노을 위로는 별빛 같은 길을 만들었다. 동틀 때 자연의 사랑만으로는 부족했던 저절로 마음이 편안해진다.",
//         "별빛처럼 환하게 빛나던 그녀의 미소가 내 기억 속에서 사라지지 않는다. 그녀의 그 미소만큼은 영원히 마음 속에 남는다.",
//         "작은 바람 한 점에도 심장이 뛰었다. 자연과 하나가 되는 순간, 모든 감정이 폭발하듯 터져나왔다."
//     ]);

//     const handleOptionSelect = (index) => {
//         setSelectedOption(index);
//     };

//     const handlePrevious = () => {
//         navigate('/write2');
//     };

//     const handleNext = () => {
//         if (selectedOption !== null) {
//             navigate('/write4');  // 선택된 옵션을 가지고 다음 페이지로 이동
//         }
//     };

//     return (
//         <Box sx={{ width: 300, mx: 'auto', mt: 4, textAlign: 'center' }}>
//             <Typography variant="h5" sx={{ mb: 2 }}>Page.2</Typography>
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

// export default Write3;
import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write3() {
    return <WritePage
        currentPage={3}
        nextPage='/write4'
        previousPage='/write2'
        textOptions={[
            "7",
            "8",
            "9"
        ]}
    />;
}
