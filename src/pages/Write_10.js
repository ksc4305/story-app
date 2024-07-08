
import React from 'react';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

export default function Write10() {
    const { addOption } = useStory();
    return <WritePageComponent
        currentPage={10}
        nextPage='/finalReview' // 최종 리뷰 페이지로 연결
        previousPage='/write9'
        textOptions={["Option10-1", "Option10-2", "Option10-3"]}
        onSelectOption={addOption}
    />;
}
