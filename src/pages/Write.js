import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, TextField, Typography, IconButton, InputAdornment, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './Write.css';

const themes = [
  { id: 1, name: "잔혹동화", prompt: "어두운 숲속에서 일어나는 이야기..." },
  { id: 2, name: "로맨스", prompt: "두 사람의 운명적인 만남..." },
  { id: 3, name: "공포", prompt: "문득 귓가를 스치는 속삭임..." },
  { id: 4, name: "스릴러", prompt: "숨 막히는 추격전이 시작되었다..." }
];

function Write() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [inputText, setInputText] = useState('');
  const [rows, setRows] = useState(1);  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleOpen = (theme) => {
    setSelectedTheme(theme);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      setShowConfirmDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirm = () => {
    console.log("Story confirmed:", inputText);
    navigate('/write2'); // 이동할 때 추가적인 상태 전달이 필요할 수 있습니다.
    setShowConfirmDialog(false);
  };

  return (
    <Box className="write-page">
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>이야기 만들기</Typography>
      <Box className="theme-buttons">
        {themes.map(theme => (
          <Button key={theme.id} variant="outlined" sx={{ m: 1 }} onClick={() => handleOpen(theme)}>
            {theme.name}
          </Button>
        ))}
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-style">
          <Typography variant="h6">{selectedTheme.name}</Typography>
          <Typography>{selectedTheme.prompt}</Typography>
        </Box>
      </Modal>
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
      <Dialog open={showConfirmDialog} onClose={handleDialogClose}>
        <DialogTitle>이야기 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>이 내용을 토대로 이야기를 구성하시겠습니까?</DialogContentText>
          <Typography>{inputText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">확인</Button>
          <Button onClick={handleDialogClose} color="secondary">취소</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Write;
