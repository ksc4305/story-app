// 예시: Write8.js
import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write3() {
    const { addOption } = useStory();

    return <WritePageComponent
        currentPage={3}
        nextPage='/write4'
        previousPage='/write2'
        textOptions={["22", "23", "24"]}
        onSelectOption={addOption}
    />;
}