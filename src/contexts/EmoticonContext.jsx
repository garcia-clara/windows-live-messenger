import React, { createContext, useState } from 'react';


const EmoticonContext = createContext();

export const EmoticonProvider = ({ children }) => {
  const [selectedEmoticon, setSelectedEmoticon] = useState(null);

  return (
    <EmoticonContext.Provider value={{ selectedEmoticon, setSelectedEmoticon }}>
      {children}
    </EmoticonContext.Provider>
  );
};

export default EmoticonContext;
