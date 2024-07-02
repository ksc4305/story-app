import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import './StoryCard.css';

function StoryCard({ title, description, image }) {
  return (
    <Card className="story-card">
      <CardMedia
        className="story-card-media"
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="h5" component="h2">{title}</Typography>
        <Typography color="textSecondary">{description}</Typography>
      </CardContent>
    </Card>
  );
}

export default StoryCard;
