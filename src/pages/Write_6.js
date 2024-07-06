import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write6() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={6}
        nextPage='/write7'
        previousPage='/write5'
        textOptions={["Option2-1", "Option2-2", "Option2-3"]}
        onSelectOption={addOption}
    />;
}