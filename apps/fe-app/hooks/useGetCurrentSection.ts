import { useState, useEffect } from 'react';

export const useGetCurrentSection = () => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let foundSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          foundSection = section.id;
        }
      });

      setCurrentSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call it once initially to set the first section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return currentSection;
};
