import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterProps {
  end: number;
  duration?: number;
  startOnView?: boolean;
}

const useAnimatedCounter = ({ 
  end, 
  duration = 2000,
  startOnView = true 
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(!startOnView);
  const countRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (startOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (countRef.current) {
        observer.observe(countRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [startOnView]);

  useEffect(() => {
    if (!isInView) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));
      
      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, isInView]);

  return { count, ref: countRef };
};

export default useAnimatedCounter;