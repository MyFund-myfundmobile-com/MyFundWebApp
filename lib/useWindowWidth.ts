// /components/useWindowWidth.js
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(windowWidth);
    }; // Initialize with 0 or any default value

    // Call handler once to set the initial width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

export default useWindowWidth;
