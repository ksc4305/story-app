import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write5() {
    return <WritePage
        currentPage={5}
        nextPage='/write6'
        previousPage='/write4'
        textOptions={[
            "13",
            "14",
            "15"
        ]}
    />;
}
