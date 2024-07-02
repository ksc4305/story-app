import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="title">
          Storybird Korean
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/instructions">Instructions</Button>
        <Button color="inherit" component={Link} to="/read">Read</Button>
        <Button color="inherit" component={Link} to="/write">Write</Button>
        <Button color="inherit" component={Link} to="/signin">Sign In</Button>
        <Button variant="outlined" color="inherit" component={Link} to="/register">Register</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
