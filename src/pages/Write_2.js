
import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write2() {
    return <WritePage
        currentPage={2}
        nextPage='/write3'
        previousPage='/write1'
        textOptions={[
            "4",
            "5",
            "6"
        ]}
    />;
}
