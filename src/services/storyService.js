import axios from "axios";

export const fetchStoryContent = async (storyId, page) => {
    // 서버에서 선택한 문장을 가져오는 코드 (주석 처리)
    const response = await axios.get(`http://localhost:8000/api/sse/stories/${storyId}/pages/${page}/contents`);
    console.log(response);
    return response.data.options;

    // try {
    //   const response = await axios.get(`http://127.0.0.1:8000/api/stories/${storyId}/contents/${page}`);
    //   return response.data.options || [];
    // } catch (error) {
    //   console.error('Error fetching story content:', error);
    //   return [];
    // }
  
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
    // 서버에서 선택한 항목들을 가져오는 코드 (주석 처리)
    // try {
    //   const response = await axios.get(`http://127.0.0.1:8000/api/stories/${storyId}/contents`);
    //   return response.data.sentences || [];
    // } catch (error) {
    //   console.error('Error fetching final story content:', error);
    //   return [];
    // }
  
    // 예시 데이터를 사용하여 10가지 내용을 출력
    return ["이것은 첫 번째 페이지의 문장입니다."];
  };
  