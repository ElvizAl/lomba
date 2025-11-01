'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollWrapperProps } from '@/types';

gsap.registerPlugin(ScrollTrigger);


export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.scroll-section');
    if (!sections.length || sections.length < 2) return;

    gsap.set(sections, { opacity: 0, y: 100 });
    gsap.set(sections[0], { opacity: 1, y: 0 });

    const tl = gsap.timeline();
    tl.fromTo(
      sections[0].querySelectorAll('h1, p, button, img'),
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: sections[0],
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        if (isScrolling.current) return;
        isScrolling.current = true;
        
        gsap.to(sections[0], {
          x: '100%',
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            isScrolling.current = false;
          }
        });

        gsap.fromTo(sections[1],
          { y: '100vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
              gsap.fromTo(sections[1].querySelectorAll('*'),
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.1,
                  delay: 0.2,
                  ease: 'power2.out'
                }
              );
            }
          }
        );
      },
      onEnterBack: () => {
        if (isScrolling.current) return;
        isScrolling.current = true;
        
        gsap.to(sections[1], {
          y: '100vh',
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to(sections[0], {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              onComplete: () => {
                isScrolling.current = false;
              }
            });
          }
        });
      }
    });

    return () => {
      scrollTrigger?.kill();
      gsap.killTweensOf('*');
    };
  }, []);

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen overflow-y-auto snap-y snap-mandatory"
    >
      {children}
    </div>
  );
}