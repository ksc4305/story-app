import axios from 'axios';

// FastAPI 서버의 기본 URL
const API_URL = 'http://127.0.0.1:8000/api';

// 이야기 저장 함수
export const saveStory = async (storyData) => {
    try {
        const response = await axios.post(`${API_URL}/stories`, storyData);
        return response.data;
    } catch (error) {
        console.error('Error saving story:', error);
        throw error;
    }
};

// 이야기 가져오기 함수
export const getStory = async (storyId) => {
    try {
        const response = await axios.get(`${API_URL}/stories/${storyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching story:', error);
        throw error;
    }
};
