import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write4() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={4}
        nextPage='/write5'
        previousPage='/write3'
        textOptions={["Option2-1", "Option2-2", "Option2-3"]}
        onSelectOption={addOption}
    />;
}