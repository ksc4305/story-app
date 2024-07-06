
import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write1() {
    return <WritePage
        currentPage={1}
        nextPage='/write2'
        previousPage='/write1'
        textOptions={[
            "1",
            "2",
            "3"
        ]}
    />;
}