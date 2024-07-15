import React, { useState, useEffect, useCallback } from 'react';

function ContentGenerator() {
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateContent = useCallback(async () => {
        setIsLoading(true);
        setOption1('');
        setOption2('');
        setOption3('');

        const response = await fetch('http://localhost:8000/generate_content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prev_contents: ["오늘은 마트에 갔다", "마트에서 소세지를 샀다."],
                current_page: 3
            }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let currentOption = 1;
        let buffer = '';

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            buffer += chunk;

            while (buffer.includes('\n')) {
                const index = buffer.indexOf('\n');
                const line = buffer.slice(0, index);
                buffer = buffer.slice(index + 1);

                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                        setIsLoading(false);
                        return;
                    } else if (data === '<<<OPTION_END>>>') {
                        currentOption++;
                    } else {
                        switch (currentOption) {
                            case 1:
                                setOption1(prev => prev + data);
                                break;
                            case 2:
                                setOption2(prev => prev + data);
                                break;
                            case 3:
                                setOption3(prev => prev + data);
                                break;
                        }
                    }
                }
            }
        }
    }, []);

    return (
        <div>
            <button onClick={generateContent} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Content'}
            </button>
            <div>
                <h3>Option 1:</h3>
                <p>{option1}</p>
                <h3>Option 2:</h3>
                <p>{option2}</p>
                <h3>Option 3:</h3>
                <p>{option3}</p>
            </div>
        </div>
    );
}

export default ContentGenerator;