import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write9() {
    return <WritePage
        currentPage={9}
        nextPage='/write10'
        previousPage='/write8'
        textOptions={[
            "25",
            "26",
            "27"
        ]}
    />;
}
