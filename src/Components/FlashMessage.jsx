import React, { useState, useEffect } from 'react';

const FlashMessage = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    <div className={`fixed bottom-0 pointer-events-none right-0 z-0 mb-[420px] mr-3 px-4 py-2 bg-[#ec922b] text-white rounded-md transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>
  );
};

export default FlashMessage;
