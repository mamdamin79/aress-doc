import { useEffect, useState } from 'react';

/**
 * Tracks the computed padding-right of the <html> element.
 * Returns the current padding as a string (e.g., "20px").
 */
export function useHtmlPaddingRight() {
  const [paddingRight, setPaddingRight] = useState('0px');

  useEffect(() => {
    const html = document.documentElement;

    const updatePadding = () => {
      const pr = getComputedStyle(html).paddingRight;
      setPaddingRight(pr);
    };

    updatePadding(); // Initial check

    const observer = new MutationObserver(updatePadding);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ['style'],
    });

    // Optional: respond to window resize too
    window.addEventListener('resize', updatePadding);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  return paddingRight;
}
