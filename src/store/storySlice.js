import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedOptions: {},
  selectedImages: Array(10).fill(null),
  coverImage: '',
  creator: '',
  title: '',
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
      state.selectedImages[page - 1] = image;
    },
    resetSelectedImages: (state) => {
      state.selectedImages = Array(10).fill(null);
    },
    updateCoverImage: (state, action) => {
      state.coverImage = action.payload;
    },
    updateCreator: (state, action) => {
      state.creator = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    resetCoverImage: (state) => {
      state.coverImage = '';
    },
    resetCreator: (state) => {
      state.creator = '';
    },
    resetTitle: (state) => {
      state.title = '';
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
