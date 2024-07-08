import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';

function ImageSelection() {
    const navigate = useNavigate();
    const location = useLocation(); // 스토리 내용을 가져오기 위해 사용
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([
        { id: 1, src: 'path/to/image1.jpg', alt: 'Image 1' },
        { id: 2, src: 'path/to/image2.jpg', alt: 'Image 2' },
        { id: 3, src: 'path/to/image3.jpg', alt: 'Image 3' },
        { id: 4, src: 'path/to/image4.jpg', alt: 'Image 4' }
    ]);

    const handleImageSelect = (imageId) => {
        setSelectedImage(imageId);
    };

    const handlePrevious = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleNext = () => {
        if (selectedImage !== null) {
            navigate('/nextPage', { state: { selectedImage: images.find(img => img.id === selectedImage) } });
        }
    };

    return (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>지금부터 문단에 어울리는 이미지를 선택하세요!</Typography>
            <Typography>{location.state?.text}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {images.map(image => (
                    <Paper
                        key={image.id}
                        component="img"
                        src={image.src}
                        alt={image.alt}
                        sx={{
                            width: 100,
                            height: 100,
                            cursor: 'pointer',
                            border: selectedImage === image.id ? '2px solid blue' : 'none'
                        }}
                        onClick={() => handleImageSelect(image.id)}
                    />
                ))}
            </Box>
            <Button variant="contained" onClick={handlePrevious} sx={{ mt: 2 }}>이전</Button>
            <Button variant="contained" color="primary" onClick={handleNext} disabled={!selectedImage} sx={{ mt: 2, ml: 2 }}>다음</Button>
        </Box>
    );
}

export default ImageSelection;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useStory } from '../contexts/StoryContext';
// import { Box, Button, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

// // 이미지 URL을 가져오는 함수 (실제로는 API 호출 등으로 대체)
// const getImagesForOption = (option) => {
//   // 예시 이미지 URL들
//   return [
//     'https://example.com/image1.jpg',
//     'https://example.com/image2.jpg',
//     'https://example.com/image3.jpg',
//   ];
// };

// function ImageSelection() {
//   const navigate = useNavigate();
//   const { selectedOptions } = useStory();
//   const [selectedImages, setSelectedImages] = useState({});
//   const [currentOptionIndex, setCurrentOptionIndex] = useState(0);

//   useEffect(() => {
//     // 컴포넌트 마운트 시 첫 번째 옵션에 대한 이미지 로드
//     if (selectedOptions.length > 0) {
//       setSelectedImages({
//         [currentOptionIndex]: getImagesForOption(selectedOptions[currentOptionIndex])
//       });
//     }
//   }, []);

//   const handleImageSelect = (imageUrl) => {
//     setSelectedImages(prev => ({
//       ...prev,
//       [currentOptionIndex]: imageUrl
//     }));
//   };

//   const handleNext = () => {
//     if (currentOptionIndex < selectedOptions.length - 1) {
//       const nextIndex = currentOptionIndex + 1;
//       setCurrentOptionIndex(nextIndex);
//       if (!selectedImages[nextIndex]) {
//         setSelectedImages(prev => ({
//           ...prev,
//           [nextIndex]: getImagesForOption(selectedOptions[nextIndex])
//         }));
//       }
//     } else {
//       // 모든 이미지 선택 완료, 다음 단계로 진행
//       navigate('/finalStory');
//     }
//   };

//   const handlePrevious = () => {
//     if (currentOptionIndex > 0) {
//       setCurrentOptionIndex(currentOptionIndex - 1);
//     }
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" gutterBottom>삽화 선택</Typography>
//       <Typography variant="body1" gutterBottom>{selectedOptions[currentOptionIndex]}</Typography>
      
//       <Grid container spacing={2}>
//         {selectedImages[currentOptionIndex]?.map((imageUrl, index) => (
//           <Grid item xs={4} key={index}>
//             <Card 
//               onClick={() => handleImageSelect(imageUrl)}
//               sx={{ border: selectedImages[currentOptionIndex] === imageUrl ? '2px solid blue' : 'none' }}
//             >
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={imageUrl}
//                 alt={`Option ${currentOptionIndex + 1} Image ${index + 1}`}
//               />
//               <CardContent>
//                 <Typography variant="body2">이미지 {index + 1}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ mt: 2 }}>
//         <Button variant="contained" onClick={handlePrevious} disabled={currentOptionIndex === 0}>이전</Button>
//         <Button variant="contained" onClick={handleNext} disabled={!selectedImages[currentOptionIndex]}>
//           {currentOptionIndex === selectedOptions.length - 1 ? '완료' : '다음'}
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default ImageSelection;