"use client";

import { useState, useEffect } from "react";



export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position to show/hide the button
  useEffect(() => {
    const toggleVisibility = () => {
      // If we scroll down more than 300px, show the button
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`
          flex items-center justify-center rounded-full bg-blue-600 p-3 text-white shadow-lg 
          transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-10 opacity-0"
          }
        `}
      >
        {/* SVG for Up Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
