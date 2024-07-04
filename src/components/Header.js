import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <AppBar position="static" className="header" color='default'>
      <Toolbar>
        <Typography variant="h6" className="title">
          URDIS
        </Typography>
        <Button color="inherit" component={Link} to="/">홈</Button>
        <Button color="inherit" component={Link} to="/instructions">소개</Button>
        <Button color="inherit" component={Link} to="/read">Read</Button>
        <Button color="inherit" component={Link} to="/write">Write</Button>
        <Button color="inherit" component={Link} to="/login"style={{backgroundColor: 'gray', width: '100px'}}>로그인</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
