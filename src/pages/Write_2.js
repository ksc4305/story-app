import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStory } from '../contexts/StoryContext';
import WritePageComponent from '../components/WritePageComponent';

function Write2() {
    const { addOption, removeLastOption } = useStory();
    const navigate = useNavigate();

    const textOptions = ["Option2-1", "Option2-2", "Option2-3"];

    const handlePrevious = () => {
        removeLastOption(); // 마지막으로 추가된 옵션 제거
        navigate('/write1');
    };

    const handleOptionSelect = (option) => {
        // 'Write1'에서 이전을 누른 후 다시 'Write2'에 도달했을 때 중복 추가를 방지
        if (!addOption.includes(option)) {
            addOption(option);
        }
    };

    return <WritePageComponent
        currentPage={2}
        nextPage='/write3'
        previousPage='/write1'
        textOptions={textOptions}
        onSelectOption={handleOptionSelect}
        onPrevious={handlePrevious}
    />;
}

export default Write2;
