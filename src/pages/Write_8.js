import React from 'react';
import WritePage from './Writepage'; // 파일 경로에 따라 다를 수 있습니다.

export default function Write8() {
    return <WritePage
        currentPage={8}
        nextPage='/write9'
        previousPage='/write7'
        textOptions={[
            "22",
            "23",
            "24"
        ]}
    />;
}
