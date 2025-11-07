import { useEffect, useRef } from 'react';

export function useLocomotiveScroll() {
  const scrollRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        if (containerRef.current) {
          const scroll = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            getDirection: true,
            getSpeed: true,
            resetNativeScroll: true
          });
          
          scrollRef.current = scroll;

          // Handle image loading
          const images = containerRef.current.querySelectorAll('img');
          if (images.length > 0) {
            let loadedImages = 0;
            const totalImages = images.length;

            const imageLoaded = () => {
              loadedImages++;
              if (loadedImages === totalImages && scrollRef.current) {
                scrollRef.current.update();
              }
            };

            images.forEach(img => {
              if (img.complete) imageLoaded();
              else img.addEventListener('load', imageLoaded);
            });
          }
        }

        // Cleanup
        return () => {
          if (scrollRef.current) {
            scrollRef.current.destroy();
            scrollRef.current = null;
          }
        };
      } catch (error) {
        console.error('Failed to initialize Locomotive Scroll:', error);
      }
    })();
  }, []);

  return { scrollRef, containerRef };
}
