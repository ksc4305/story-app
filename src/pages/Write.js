import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, IconButton, InputAdornment, TextField, Switch, FormControlLabel, Select, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import './Write.css';

const Write = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [rows, setRows] = useState(1);
  const [helperEnabled, setHelperEnabled] = useState(false);
  const [formData, setFormData] = useState({
    who: '',
    when: '',
    where: '',
    what: '',
    how: '',
    result: '',
    feeling: '',
    nextWhat: '',
    nextHow: ''
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const checkFormComplete = () => {
      const { who, when, where, what, how, result, feeling, nextWhat, nextHow } = formData;
      return who && when && where && what && how && result && feeling && nextWhat && nextHow;
    };

    setIsFormComplete(checkFormComplete());
  }, [formData]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    updateRows(event.target.value);
  };

  const updateRows = (text) => {
    const newLineCount = text.split('\n').length || 1;
    setRows(newLineCount);
  };

  const handleHelperChange = (event) => {
    setHelperEnabled(event.target.checked);
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const renderSelect = (name, label, options) => (
    <Select
      name={name}
      value={formData[name]}
      onChange={handleFormDataChange}
      displayEmpty
      style={{ minWidth: 80, marginLeft: 8, marginRight: 8 }}
    >
      <MenuItem value="">
        <em>{label}</em>
      </MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );

  const handleSubmit = async () => {
    let source;
    if (helperEnabled) {
      source = `
        ${formData.who}는/이/가 ${formData.when} ${formData.where}에서 ${formData.what}을/를 ${formData.how} 했어요.
        ${formData.what}을/를 ${formData.how}했더니 ${formData.result}됐어요.
        그래서 기분이 ${formData.feeling} 했어요.
        다음에는 ${formData.nextWhat}을/를 ${formData.nextHow} 하고 싶어요.
      `;
    } else {
      source = inputText;
    }

    if (source.trim()) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/stories/init', { source });
        const { story_id } = response.data;
        navigate(`/write/1?story_id=${story_id}`);
      } catch (error) {
        console.error('Error initializing story:', error);
      }
    }
  };

  const renderHelperForm = () => (
    <Box>
      <Typography variant="h6">입력 도우미</Typography>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          {renderSelect('who', '누가', ['선택 1', '선택 2', '선택 3'])} 는/이/가 
          {renderSelect('when', '언제', ['선택 1', '선택 2', '선택 3'])} 
          {renderSelect('where', '어디', ['선택 1', '선택 2', '선택 3'])}에서 
          {renderSelect('what', '무엇', ['선택 1', '선택 2', '선택 3'])}을/를 
          {renderSelect('how', '어떻게', ['선택 1', '선택 2', '선택 3'])} 했어요.
        </Box>
        <Box display="flex" alignItems="center">
          {renderSelect('what', '무엇', ['선택 1', '선택 2', '선택 3'])}을/를 
          {renderSelect('how', '어떻게', ['선택 1', '선택 2', '선택 3'])}했더니 
          {renderSelect('result', '결과', ['선택 1', '선택 2', '선택 3'])}됐어요.
        </Box>
        <Box display="flex" alignItems="center">
          그래서 기분이 {renderSelect('feeling', '감정', ['선택 1', '선택 2', '선택 3'])} 했어요.
        </Box>
        <Box display="flex" alignItems="center">
          다음에는 {renderSelect('nextWhat', '무엇', ['선택 1', '선택 2', '선택 3'])}을/를 
          {renderSelect('nextHow', '어떻게', ['선택 1', '선택 2', '선택 3'])} 하고 싶어요.
        </Box>
      </Box>
      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '16px' }} disabled={!isFormComplete}>
        전송
      </Button>
    </Box>
  );

  return (
    <Box className="write-page">
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>이야기 만들기</Typography>
      <FormControlLabel
        control={<Switch checked={helperEnabled} onChange={handleHelperChange} />}
        label="입력 도우미"
      />
      {helperEnabled ? (
        renderHelperForm()
      ) : (
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
      )}
    </Box>
  );
};

export default Write;
