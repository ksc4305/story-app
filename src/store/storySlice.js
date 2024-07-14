import { createSlice } from '@reduxjs/toolkit';

const storySlice = createSlice({
  name: 'story',
  initialState: {
    selectedOptions: {},
    selectedImages: Array(10).fill(null), // 길이 10인 배열로 초기화
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
      state.selectedImages[page - 1] = image; // 배열의 인덱스는 0부터 시작하므로 page - 1
    },
    resetSelectedImages: (state) => {
      state.selectedImages = Array(10).fill(null); // 배열로 초기화
    },
  },
});

export const { setSelectedOptions, updateSelectedOption, resetSelectedOptions, setStories, updateSelectedImage, resetSelectedImages } = storySlice.actions;
export default storySlice.reducer;
