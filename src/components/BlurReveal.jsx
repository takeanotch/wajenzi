// // components/BlurReveal.jsx
// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const BlurReveal = ({ 
//   children, 
//   blur = 20, 
//   duration = 1.5,
//   start = 'top 80%',
//   scrub = false,
//   className = ''
// }) => {
//   const ref = useRef(null);

//   useEffect(() => {
//     const animation = gsap.fromTo(ref.current,
//       {
//         filter: `blur(${blur}px)`,
//         opacity: 0,
//         y: 30
//       },
//       {
//         filter: 'blur(0px)',
//         opacity: 1,
//         y: 0,
//         duration,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ref.current,
//           start,
//           scrub: scrub ? 1 : false
//         }
//       }
//     );

//     return () => {
//       animation.kill();
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [blur, duration, start, scrub]);

//   return (
//     <div ref={ref} className={className}>
//       {children}
//     </div>
//   );
// };

// export default BlurReveal;
// components/BlurReveal.jsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlurReveal = ({ 
  children, 
  blur = 20, 
  duration = 1.5,
  start = 'top 80%',
  scrub = true, // Toujours true pour un effet permanent
  y = 30,
  className = '',
  once = false // Optionnel: si on veut que l'effet ne se joue qu'une fois
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Configurer l'animation avec scrub pour suivre le scroll
    const animation = gsap.fromTo(element,
      {
        filter: `blur(${blur}px)`,
        opacity: 0,
        y: y
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: start,
          end: "top 20%",
          scrub: scrub, // C'est le paramètre important
          markers: false, // Mettre à true pour debug
          toggleActions: once ? 'play none none none' : 'play none reverse none'
        }
      }
    );

    return () => {
      // Nettoyage propre
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [blur, duration, start, scrub, y, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default BlurReveal;