import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, IconButton, InputAdornment, TextField, Switch, FormControlLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { resetSelectedOptions } from '../store/storySlice';
import SelectField from '../components/SelectField';
import './Write.css';
import axios from "axios";
// import axios from "axios";

const Write = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(resetSelectedOptions());

      //서버에 새로운 이야기를 초기화하는 코드 (김태현 테스트 완료)
      const data = {
        prompt: source
      }

      axios.post("http://localhost:8000/api/sse/stories/init", data)
          .then(res => {
            const storyId = res.data;
            navigate(`/write/1?story_id=${storyId}`);
          })
          .catch(err => {
            console.error(err);
          });

      // 더미 데이터로 이야기 시작
      //navigate(`/write/1?story_id=dummy_story_id`);
    }
  };

  const renderHelperForm = () => (
    <Box>
      <Typography variant="h6">입력 도우미</Typography>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <SelectField name="who" label="누가" value={formData.who} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} /> 는/이/가 
          <SelectField name="when" label="언제" value={formData.when} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} /> 
          <SelectField name="where" label="어디" value={formData.where} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} />에서 
          <SelectField name="what" label="무엇" value={formData.what} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} />을/를 
          <SelectField name="how" label="어떻게" value={formData.how} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} /> 했어요.
        </Box>
        <Box display="flex" alignItems="center">
          <SelectField name="what" label="무엇" value={formData.what} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} />을/를 
          <SelectField name="how" label="어떻게" value={formData.how} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} />했더니 
          <SelectField name="result" label="결과" value={formData.result} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} />됐어요.
        </Box>
        <Box display="flex" alignItems="center">
          그래서 기분이 <SelectField name="feeling" label="감정" value={formData.feeling} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} /> 했어요.
        </Box>
        <Box display="flex" alignItems="center">
          다음에는 <SelectField name="nextWhat" label="무엇" value={formData.nextWhat} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} />을/를 
          <SelectField name="nextHow" label="어떻게" value={formData.nextHow} onChange={handleFormDataChange} options={['선택 1', '선택 2', '선택 3']} /> 하고 싶어요.
        </Box>
      </Box>
      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '16px' }} disabled={!isFormComplete} sx={{
        bgcolor: 'lightgreen',
        '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
        '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
      }}>
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
                  <IconButton onClick={handleSubmit} sx={{
                    bgcolor: 'lightgreen',
                    '&:hover': { bgcolor: 'rgba(144,238,144,0.5)' },
                    '&:active': { bgcolor: 'rgba(144,238,144,0.8)' }
                  }}>
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
