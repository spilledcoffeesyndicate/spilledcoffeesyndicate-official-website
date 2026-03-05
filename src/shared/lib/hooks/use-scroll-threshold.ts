'use client';

import { useEffect, useState } from 'react';

export function useScrollThreshold(threshold: number) {
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsReached(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isReached;
}
