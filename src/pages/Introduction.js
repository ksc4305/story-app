import React from 'react';
import { Box, Typography } from '@mui/material';

function Introduction() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>소개</Typography>
      <Typography variant="h6" gutterBottom>
        생성형 AI를 사용하여 동화를 생성해주고, 달리로 이미지를 추가하며, 음성도 추가한 동화를 생성해주는 서비스입니다.
      </Typography>
      <Typography variant="body1">
        그린나래는 사용자의 상상력을 기반으로 AI를 활용하여 멋진 동화를 만들어드립니다.
        각 페이지마다 생성된 텍스트에 어울리는 이미지를 AI가 추천하고, 음성 합성을 통해 듣기 좋은 동화를 제공합니다.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        저희 서비스는 텍스트 생성에 GPT-3 모델을 사용하고, 이미지 생성에는 DALL-E 모델을 사용합니다.
        또한, 음성 합성에는 최신 TTS 기술을 활용하여 자연스럽고 듣기 좋은 음성을 제공합니다.
      </Typography>
    </Box>
  );
}

export default Introduction;
