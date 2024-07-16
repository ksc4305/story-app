// src/store/storySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedOptions: {},
  selectedImages: Array(10).fill(null), // 길이 10인 배열로 초기화
  coverImage: '', // 표지 이미지 상태
  creator: '', // 작가 상태
  title: '', // 제목 상태
  stories: [],
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setSelectedOptions: (state, action) => {
      state.selectedOptions = action.payload;
    },
    updateSelectedOption: (state, action) => {
      const { page, option } = action.payload;
      state.selectedOptions[page] = option;
    },
    resetSelectedOptions: (state) => {
      state.selectedOptions = {};
    },
    setStories: (state, action) => {
      state.stories = action.payload;
    },
    updateSelectedImage: (state, action) => {
      const { page, image } = action.payload;
      state.selectedImages[page - 1] = image; // 배열의 인덱스는 0부터 시작
    },
    resetSelectedImages: (state) => {
      state.selectedImages = Array(10).fill(null); // 배열 초기화
    },
    updateCoverImage: (state, action) => {
      state.coverImage = action.payload; // 표지 이미지 업데이트
    },
    updateCreator: (state, action) => {
      state.creator = action.payload; // 작가 업데이트
    },
    updateTitle: (state, action) => {
      state.title = action.payload; // 제목 업데이트
    },
    resetCoverImage: (state) => {
      state.coverImage = ''; // 표지 이미지 초기화
    },
    resetCreator: (state) => {
      state.creator = ''; // 작가 초기화
    },
    resetTitle: (state) => {
      state.title = ''; // 제목 초기화
    },
  },
});

export const {
  setSelectedOptions,
  updateSelectedOption,
  resetSelectedOptions,
  setStories,
  updateSelectedImage,
  resetSelectedImages,
  updateCoverImage,
  updateCreator,
  updateTitle,
  resetCoverImage,
  resetCreator,
  resetTitle,
} = storySlice.actions;

export default storySlice.reducer;
