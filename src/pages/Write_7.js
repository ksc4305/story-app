import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write7() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={7}
        nextPage='/write8'
        previousPage='/write6'
        textOptions={["Option2-1", "Option2-2", "Option2-3"]}
        onSelectOption={addOption}
    />;
}