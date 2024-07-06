import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write9() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={9}
        nextPage='/write10'
        previousPage='/write8'
        textOptions={["Option2-1", "Option2-2", "Option2-3"]}
        onSelectOption={addOption}
    />;
}