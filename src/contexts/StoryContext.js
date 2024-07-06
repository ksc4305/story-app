// src/contexts/StoryContext.js
import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const addOption = (option) => {
        setSelectedOptions(prev => [...prev, option]);
    };

    return (
        <StoryContext.Provider value={{ selectedOptions, addOption }}>
            {children}
        </StoryContext.Provider>
    );
};
