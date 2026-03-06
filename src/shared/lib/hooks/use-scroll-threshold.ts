'use client';

import { useEffect, useState } from 'react';

export function useScrollThreshold(threshold: number) {
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    let isFramePending = false;
    let lastScrollY = window.scrollY;

    const updateState = () => {
      isFramePending = false;
      setIsReached(lastScrollY > threshold);
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (isFramePending) return;
      isFramePending = true;
      requestAnimationFrame(updateState);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isReached;
}
