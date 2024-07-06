import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuBookIcon />
        </IconButton>
        <Typography variant="h6" className="title" style={{ color: 'green' }}>
          그린나래
        </Typography>
        <Button color="inherit" component={Link} to="/" className="nav-link">홈</Button>
        <Button color="inherit" component={Link} to="/instructions" className="nav-link">소개</Button>
        <Button color="inherit" component={Link} to="/read" className="nav-link">Read</Button>
        <Button color="inherit" component={Link} to="/write" className="nav-link">Write</Button>
        <Button color="inherit" component={Link} to="/login" className="nav-link" sx={{ backgroundColor: 'lightgrey', color: 'black', '&:hover': { backgroundColor: 'lightgrey' } }}>로그인</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
