import React from 'react';
import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import './LoginPage.css';

class LoginPage extends React.Component {
  handleLogin = () => {
    // Placeholder for login logic
  };

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form className="login-form">
          <TextField
            label="이메일"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox name="keepLoggedIn" color="primary" />}
            label="로그인 상태 유지"
          />
          <Button variant="contained" color="primary" onClick={this.handleLogin} fullWidth>로그인</Button>
        </form>
        <div className="divider">또는</div>
        <div className="social-login">
          <Button variant="contained" color="secondary" fullWidth>구글로 시작하기</Button>
          <Button variant="contained" color="secondary" fullWidth>네이버로 시작하기</Button>
          <Button variant="contained" color="secondary" fullWidth>다른 이메일들</Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
