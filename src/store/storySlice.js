import { createSlice } from '@reduxjs/toolkit';

const storySlice = createSlice({
  name: 'story',
  initialState: {
    selectedOptions: {},
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
  },
});

export const { setSelectedOptions, updateSelectedOption, resetSelectedOptions, setStories } = storySlice.actions;
export default storySlice.reducer;
