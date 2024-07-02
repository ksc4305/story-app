import React from 'react';
import StoryCard from './StoryCard';
import './StoryList.css';

const stories = [
  { id: 1, title: '아이언맨', description: 'Title Description', image: 'path/to/image1.jpg' },
  { id: 2, title: '캡틴 아메리카', description: 'Title Description', image: 'path/to/image2.jpg' },
  { id: 3, title: '헐크', description: 'Title Description', image: 'path/to/image3.jpg' },
  { id: 4, title: '나의 6.25 이야기', description: 'Title Description', image: 'path/to/image4.jpg' },
  { id: 5, title: '내가 결혼한 이유', description: 'Title Description', image: 'path/to/image5.jpg' },
  { id: 6, title: '나의 근대 삶', description: 'Title Description', image: 'path/to/image6.jpg' },
];

function StoryList() {
  return (
    <div className="story-list">
      {stories.map(story => (
        <StoryCard key={story.id} title={story.title} description={story.description} image={story.image} />
      ))}
    </div>
  );
}

export default StoryList;
