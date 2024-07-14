import { createSlice } from '@reduxjs/toolkit';

const storySlice = createSlice({
  name: 'story',
  initialState: {
    selectedOptions: {},
    selectedImages: {}, // 이미지 선택 상태 추가
    stories: [],
  },
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
      state.selectedImages[page] = image;
    }, // 이미지 선택 액션 추가
    resetSelectedImages: (state) => {
      state.selectedImages = {};
    }, // 이미지 선택 초기화 액션 추가
  },
});

export const { setSelectedOptions, updateSelectedOption, resetSelectedOptions, setStories, updateSelectedImage, resetSelectedImages } = storySlice.actions;
export default storySlice.reducer;
