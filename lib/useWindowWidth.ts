// /components/useWindowWidth.js
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0 or any default value

  useEffect(() => {
    // Check if `window` is defined
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Call handler once to set the initial width
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return windowWidth;
}

export default useWindowWidth;
