import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './Write.css';

function Write() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [rows, setRows] = useState(1);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    updateRows(event.target.value);
  };

  const updateRows = (text) => {
    const newLineCount = text.split('\n').length || 1;
    setRows(newLineCount);
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      // JSON 형태로 데이터를 저장
      const storyData = {
        text: inputText
      };
      console.log("Story saved:", JSON.stringify(storyData));
      navigate('/write1'); // 이동할 때 추가적인 상태 전달이 필요할 수 있습니다.
    }
  };

  return (
    <Box className="write-page">
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>이야기 만들기</Typography>
      <Box className="story-input-container">
        <TextField
          label="당신의 이야기를 적어보세요"
          multiline
          rows={rows}
          fullWidth
          variant="outlined"
          value={inputText}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
}

export default Write;
