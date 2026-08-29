import { useState, useEffect, useCallback } from "react";

export function useScrollToTop(threshold = 300) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Check if we've scrolled past the threshold
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Listen for scroll events
        window.addEventListener("scroll", toggleVisibility);

        // Clean up the listener on unmount
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, [threshold]);

    // Wrapped in useCallback so the function reference doesn't change unnecessarily 
    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return { isVisible, scrollToTop };
}