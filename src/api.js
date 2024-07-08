// src/api.js
// import axios from 'axios';

// const API_URL = 'https://your-server-url.com/api'; // 서버 URL로 변경하세요

export const saveStory = async (storyData) => {
    // 서버 통신 주석 처리
    // const response = await axios.post(`${API_URL}/saveStory`, storyData);
    // return response.data;
    console.log("Story saved (mock):", storyData);
    return storyData; // Mock response
};

export const getStory = async () => {
    // 서버 통신 주석 처리
    // const response = await axios.get(`${API_URL}/getStory`);
    // return response.data;
    const mockData = [
        { page: 1, option: 'Option1' },
        { page: 2, option: 'Option2' },
        { page: 3, option: 'Option3' },
    ]; // Mock data
    console.log("Story fetched (mock):", mockData);
    return mockData;
};
