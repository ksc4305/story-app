import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write6() {
    return <WritePage
        currentPage={6}
        nextPage='/write7'
        previousPage='/write5'
        textOptions={[
            "16",
            "17",
            "18"
        ]}
    />;
}
