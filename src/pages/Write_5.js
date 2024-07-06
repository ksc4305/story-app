import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write5() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={5}
        nextPage='/write6'
        previousPage='/write4'
        textOptions={["Option2-1", "Option2-2", "Option2-3"]}
        onSelectOption={addOption}
    />;
}