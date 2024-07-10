import React, { createContext, useContext, useState, useEffect } from 'react';

const StoryContext = createContext();

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const savedOptions = localStorage.getItem('selectedOptions');
    return savedOptions ? JSON.parse(savedOptions) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  return (
    <StoryContext.Provider value={{ selectedOptions, setSelectedOptions }}>
      {children}
    </StoryContext.Provider>
  );
};
