import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write7() {
    return <WritePage
        currentPage={7}
        nextPage='/write8'
        previousPage='/write6'
        textOptions={[
            "19",
            "20",
            "21"
        ]}
    />;
}
