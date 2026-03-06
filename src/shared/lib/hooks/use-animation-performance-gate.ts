'use client';

import { useEffect, useState, type RefObject } from 'react';

type UseAnimationPerformanceGateOptions = {
  targetRef: RefObject<Element | null>;
  rootMargin?: string;
  threshold?: number;
  disableLowPerformanceGate?: boolean;
};

type UseAnimationPerformanceGateResult = {
  shouldAnimate: boolean;
  isInView: boolean;
  isPageVisible: boolean;
  prefersReducedMotion: boolean;
  isLowPerformanceDevice: boolean;
};

type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function useAnimationPerformanceGate({
  targetRef,
  rootMargin = '0px',
  threshold = 0,
  disableLowPerformanceGate = false,
}: UseAnimationPerformanceGateOptions): UseAnimationPerformanceGateResult {
  const [isInView, setIsInView] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    onVisibilityChange();
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry?.isIntersecting ?? false);
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [rootMargin, targetRef, threshold]);

  useEffect(() => {
    const nav = navigator as NavigatorWithDeviceMemory;
    const coreCount = nav.hardwareConcurrency ?? 8;
    const deviceMemory = nav.deviceMemory;
    const hasDataSaver = Boolean(nav.connection?.saveData);

    const isLowEndByCpu = coreCount <= 4;
    const isLowEndByMemory = typeof deviceMemory === 'number' && deviceMemory <= 4;
    setIsLowPerformanceDevice(isLowEndByCpu || isLowEndByMemory || hasDataSaver);
  }, []);

  const shouldAnimate =
    isInView && isPageVisible && !prefersReducedMotion && (disableLowPerformanceGate || !isLowPerformanceDevice);

  return {
    shouldAnimate,
    isInView,
    isPageVisible,
    prefersReducedMotion,
    isLowPerformanceDevice,
  };
}
