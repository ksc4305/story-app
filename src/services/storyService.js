// src/services/api.js
import axios from 'axios';

// axios 기본 URL 설정
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// 특정 페이지의 스토리 콘텐츠를 가져오는 함수
export const fetchStoryContent = async (storyId, page) => {
  try {
    const response = await apiClient.get(`/sse/stories/${storyId}/pages/${page}/contents`);
    return response.data.options || [];
  } catch (error) {
    console.error('Error fetching story content:', error);
    // 필요 시 사용자에게 피드백 제공
    // alert('스토리 콘텐츠를 가져오는 도중 오류가 발생했습니다.');
    
    // 더미 데이터를 사용하여 선택지 설정
    // if (page === 1) {
    //   return ["이것은 첫 번째 페이지의 문장입니다."];
    // }
    
    // return [
    //   `이것은 ${page}번째 문장의 첫 번째 선택지입니다.`,
    //   `이것은 ${page}번째 문장의 두 번째 선택지입니다.`,
    //   `이것은 ${page}번째 문장의 세 번째 선택지입니다.`,
    // ];
  }
};

// 최종 스토리 콘텐츠를 가져오는 함수
export const fetchFinalStoryContent = async (storyId) => {
  try {
    const response = await apiClient.get(`/stories/${storyId}`);
    return response.data.contents || [];
  } catch (error) {
    console.error('Error fetching final story content:', error);
    // 필요 시 사용자에게 피드백 제공
    // alert('최종 스토리 콘텐츠를 가져오는 도중 오류가 발생했습니다.');
    
    // 예시 데이터를 사용하여 10가지 내용을 출력
    // return [
    //   "이것은 첫 번째 페이지의 문장입니다.",
    //   "이것은 두 번째 페이지의 문장입니다.",
    //   "이것은 세 번째 페이지의 문장입니다.",
    //   "이것은 네 번째 페이지의 문장입니다.",
    //   "이것은 다섯 번째 페이지의 문장입니다.",
    //   "이것은 여섯 번째 페이지의 문장입니다.",
    //   "이것은 일곱 번째 페이지의 문장입니다.",
    //   "이것은 여덟 번째 페이지의 문장입니다.",
    //   "이것은 아홉 번째 페이지의 문장입니다.",
    //   "이것은 열 번째 페이지의 문장입니다."
    // ];
  }
};
