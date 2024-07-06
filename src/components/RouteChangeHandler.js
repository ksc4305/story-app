import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStory } from './contexts/StoryContext';

function RouteChangeHandler() {
const { clearOptions } = useStory();
const location = useLocation();

useEffect(() => {
    // 지정된 경로로 이동했을 때만 옵션 초기화
    const pathsToClear = ['/', '/write', '/read', '/login'];
    if (pathsToClear.includes(location.pathname)) {
clearOptions();
    }
}, [location, clearOptions]);

  return null; // 시각적인 출력은 없음
}

export default RouteChangeHandler;
