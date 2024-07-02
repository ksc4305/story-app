import React from 'react';
import StoryList from '../components/StoryList';
import './MyStories.css';

function MyStories() {
  return (
    <div className="my-stories">
      <h2>내 동화</h2>
      <StoryList />
    </div>
  );
}

export default MyStories;
