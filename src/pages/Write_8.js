import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write8() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={8}
        nextPage='/write9'
        previousPage='/write7'
        textOptions={["Option2-1", "Option2-2", "Option2-3"]}
        onSelectOption={addOption}
    />;
}