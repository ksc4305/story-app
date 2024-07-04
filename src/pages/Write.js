import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import './Write.css';

function Write() {
  const [story, setStory] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const navigate = useNavigate();

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };

  const handleRegisterClick = () => {
    // 사용자가 입력한 이야기를 대화창에 추가
    setChatHistory([...chatHistory, { type: 'user', text: story }]);
    setStory('');

    // 챗봇의 응답 추가 (이 부분은 실제 백엔드 연동 필요)
    setChatHistory([...chatHistory, { type: 'user', text: story }, { type: 'bot', text: '챗봇의 응답 예시' }]);
  };

  const handleResponseClick = (index) => {
    setSelectedResponse(index);
  };

  const handleApplyClick = () => {
    // 선택한 응답을 저장 (이 부분은 실제 백엔드 연동 필요)
    if (selectedResponse !== null) {
      const selectedChat = chatHistory[selectedResponse];
      console.log('선택된 응답:', selectedChat);
      // DB에 저장 로직 추가
      navigate('/cover-selection');
    }
  };

  return (
    <div className="write">
      <Paper className="chat-container" elevation={3}>
        <List>
          {chatHistory.map((chat, index) => (
            <ListItem
              key={index}
              className={chat.type === 'user' ? 'user-chat' : 'bot-chat'}
              onClick={() => handleResponseClick(index)}
              selected={selectedResponse === index}
            >
              <ListItemText primary={chat.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <div className="write-container">
        <TextField
          label="이야기를 입력하세요"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={story}
          onChange={handleStoryChange}
          className="story-input"
        />
        <Button variant="contained" color="primary" onClick={handleRegisterClick}>등록</Button>
      </div>
      <Button variant="contained" color="secondary" onClick={handleApplyClick} disabled={selectedResponse === null}>적용하기</Button>
    </div>
  );
}

export default Write;
