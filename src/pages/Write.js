import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './Write.css';

function Write() {
  const [story, setStory] = useState('');
  const navigate = useNavigate();

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };

  const handleApplyClick = () => {
    // 이야기 적용 후 다음 페이지로 이동
    navigate('/cover-selection');  // 표지 선택 페이지로 이동
  };

  return (
    <div className="write">
      <div className="write-container">
        <TextField
          label="이야기를 입력하세요"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={story}
          onChange={handleStoryChange}
          className="story-input"
        />
        <Button variant="contained" color="primary" onClick={handleApplyClick}>이야기 적용</Button>
      </div>
    </div>
  );
}

export default Write;
