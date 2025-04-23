import { useEffect, useState } from "react";

// hooks/useDynamicTitle.ts
export const useDynamicTitle = (
  messages: string[], 
  defaultTitle = "Mobiiwrap", 
  interval = 1000 // Time in milliseconds between title changes
) => {
    const [title, setTitle] = useState(defaultTitle);
    
    useEffect(() => {
      let index = 0;
      let timerId: NodeJS.Timeout;
      
      const updateTitle = () => {
        if (document.hidden) {
          // When page is hidden, cycle through messages
          setTitle(messages[index]);
          index = (index + 1) % messages.length;
        } else {
          // When page is visible, use default title
          setTitle(defaultTitle);
        }
      };
      
      // Handle visibility changes
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          // Reset to default title immediately when page becomes visible
          setTitle(defaultTitle);
        } else {
          // Start with first message when hidden
          index = 0;
          updateTitle();
        }
      };
      
      // Set up interval for automatic title changes
      timerId = setInterval(updateTitle, interval);
      
      // Also listen for visibility changes
      document.addEventListener("visibilitychange", handleVisibilityChange);
      
      // Update document title whenever state changes
      document.title = title;
      
      return () => {
        clearInterval(timerId);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, [messages, defaultTitle, interval, title]);
};
