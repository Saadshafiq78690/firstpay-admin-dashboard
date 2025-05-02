'use client';

/**
 * Checks if the code is running in a browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Safely gets the window's inner width
 * @returns {number} The window inner width or 1024 as fallback
 */
export const getWindowWidth = (): number => {
  return isBrowser() ? window.innerWidth : 1024; // Default fallback width
};

/**
 * Checks if the current viewport is mobile sized
 * @param {number} breakpoint - The breakpoint for mobile (default: 768)
 * @returns {boolean} True if viewport width is below breakpoint 
 */
export const isMobileViewport = (breakpoint: number = 768): boolean => {
  return getWindowWidth() < breakpoint;
};

/**
 * Safe wrapper for adding event listeners that only runs in browser
 * @param {string} event - The event name
 * @param {Function} handler - The event handler function
 * @returns {Function} A cleanup function to remove the event listener
 */
export const addWindowEventListener = (
  event: string, 
  handler: EventListenerOrEventListenerObject
): (() => void) => {
  if (isBrowser()) {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }
  return () => {}; // Empty cleanup function for SSR
};

/**
 * Utility to apply CSS to body element safely
 */
export const bodyStyles = {
  setOverflow: (value: string): void => {
    if (isBrowser()) {
      document.body.style.overflow = value;
    }
  },
  addClass: (className: string): void => {
    if (isBrowser()) {
      document.body.classList.add(className);
    }
  },
  removeClass: (className: string): void => {
    if (isBrowser()) {
      document.body.classList.remove(className);
    }
  }
}; 