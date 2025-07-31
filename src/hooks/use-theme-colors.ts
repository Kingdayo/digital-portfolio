import { useState, useEffect } from 'react';
import * as THREE from 'three';

// Helper to get a CSS variable and format it for Three.js
const getThemeColor = (variableName: string): THREE.Color => {
  if (typeof window === 'undefined') {
    return new THREE.Color('#ffffff'); // Default for SSR
  }
  const colorValue = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

  // The value is like "262.1 83.3% 57.8%", we need "hsl(262.1, 83.3%, 57.8%)"
  if (colorValue) {
    return new THREE.Color(`hsl(${colorValue.replace(/ /g, ', ')})`);
  }

  // Fallback color
  if (variableName.includes('primary')) return new THREE.Color('#8774b8');
  if (variableName.includes('accent')) return new THREE.Color('#4d65e1');
  return new THREE.Color('#050505');
};

/**
 * A hook to get theme colors from CSS variables and update them on theme change.
 */
export const useThemeColors = () => {
  const [colors, setColors] = useState({
    primary: getThemeColor('--primary'),
    accent: getThemeColor('--accent'),
    background: getThemeColor('--background'),
  });

  useEffect(() => {
    const updateColors = () => {
      setColors({
        primary: getThemeColor('--primary'),
        accent: getThemeColor('--accent'),
        background: getThemeColor('--background'),
      });
    };

    // Initial update
    updateColors();

    // The 'next-themes' library changes the class or style on the root element.
    // We can observe these changes to react instantly.
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
          updateColors();
          return;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return colors;
};
