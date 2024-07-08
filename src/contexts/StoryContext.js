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

    const addOption = (option) => {
        setSelectedOptions(prev => [...prev, option]);
    };

    const removeLastOption = () => {
        setSelectedOptions(prev => prev.slice(0, -1));
    };

    const clearOptions = () => {
        setSelectedOptions([]);
    };

    return (
        <StoryContext.Provider value={{ selectedOptions, addOption, removeLastOption, clearOptions }}>
            {children}
        </StoryContext.Provider>
    );
};
