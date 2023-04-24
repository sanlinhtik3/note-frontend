import React from 'react'

const StringLimit = ({ text, limit, className }) => {
  // String Limit
  const CUTTING_EXPRESSION = /\s+[^\s]*$/;

  const createShortcut = (text, limit) => {
    if (text.length > limit) {
      const part = text.slice(0, limit - 3);
      if (part.match(CUTTING_EXPRESSION)) {
        return part.replace(CUTTING_EXPRESSION, " ...");
      }
      return part + "...";
    }
    return text;
  };

  const shortcut = createShortcut(text, limit);
  
  return <div className={className} title={text}>{shortcut}</div>;

};

export default StringLimit