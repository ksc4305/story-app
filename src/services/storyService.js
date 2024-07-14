import axios from 'axios';

export const fetchStoryContent = async (storyId, page) => {
  try {
    const response = await axios.get(`/api/stories/${storyId}/contents/${page}`);
    return response.data.options || [];
  } catch (error) {
    console.error('Error fetching story content:', error);
    return [];
  }

  // 더미 데이터를 사용하여 선택지 설정
  // if (page === 1) {
  //   return ["이것은 첫 번째 페이지의 문장입니다."];
  // }
  //
  // return [
  //   `이것은 ${page}번째 문장의 첫 번째 선택지입니다.`,
  //   `이것은 ${page}번째 문장의 두 번째 선택지입니다.`,
  //   `이것은 ${page}번째 문장의 세 번째 선택지입니다.`,
  // ];
};

export const fetchFinalStoryContent = async (storyId) => {
  try {
    const response = await axios.get(`/api/stories/${storyId}`);
    return response.data.contents || [];
  } catch (error) {
    console.error('Error fetching final story content:', error);
    return [];
  }

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
};
