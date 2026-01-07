
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useRef } from 'react';
// import { useInView } from 'framer-motion';

// export const metadata = {
//   title: 'Qui Sommes-Nous',
//   description: 'Notre histoire et mission',
// };

// const galleryImages = [
//   {
//     src: '/nine.jpg',
//     alt: 'Notre équipe en réunion',
//     title: 'Notre équipe'
//   },
//   {
//     src: '/five.jpg',
//     alt: 'Rencontre avec nos clients',
//     title: 'Accompagnement client'
//   },
//   {
//     src: '/nine.jpg',
//     alt: 'Notre espace de travail',
//     title: 'Notre environnement'
//   },
//   {
//     src: '/five.jpg',
//     alt: 'Événement professionnel',
//     title: 'Participation à des événements'
//   }
// ];

// const CardStack = () => {
//   const images = [
//     { id: 1, src: '/five.jpg', alt: 'Consultant travaillant sur une stratégie', rotation: '-6deg' },
//     { id: 2, src: '/nine.jpg', alt: 'Réunion de consulting', rotation: '0deg' },
//     { id: 3, src: '/five.jpg', alt: 'Analyse de données', rotation: '6deg' },
//   ];

//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, margin: "-100px" });

//   return (
//     <div ref={ref} className="relative w-80 h-80">
//       {images.map((image, index) => (
//         <motion.div
//           key={image.id}
//           initial={{ opacity: 0, y: 50, rotate: 0 }}
//           animate={isInView ? { 
//             opacity: 1, 
//             y: 0, 
//             rotate: image.rotation,
//             transition: {
//               delay: index * 0.2,
//               duration: 0.8,
//               ease: [0.22, 1, 0.36, 1]
//             }
//           } : { opacity: 0, y: 50, rotate: 0 }}
//           whileHover={{ scale: 1.05, zIndex: 50 }}
//           className={`absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl ${
//             index === 0 ? 'top-0 left-0 z-30' :
//             index === 1 ? 'top-4 left-4 z-20' :
//             'top-8 left-8 z-10'
//           }`}
//         >
//           <motion.div 
//             className="w-full h-full bg-gradient-to flex items-center justify-center text-white font-bold text-2xl"
//             whileHover={{ scale: 1.1 }}
//             transition={{ duration: 0.3 }}
//           >
//             {image.id === 1 ? 'Five' : image.id === 2 ? 'Nine' : 'One'}
//           </motion.div>
//           {/* Pour utiliser avec les vraies images : */}
//           <Image 
//             src={image.src} 
//             alt={image.alt}
//             layout="fill"
//             objectFit="cover"
//             className="transition-transform duration-500"
//           />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, margin: "-50px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 30 }}
//       animate={isInView ? { 
//         opacity: 1, 
//         y: 0,
//         transition: {
//           delay: delay,
//           duration: 0.8,
//           ease: [0.22, 1, 0.36, 1]
//         }
//       } : { opacity: 0, y: 30 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default function QuiSommesNousPage() {
//   const containerRef = useRef(null);
//   const titleRef = useRef(null);
//   const isTitleInView = useInView(titleRef, { once: false });

//   return (
//     <div className="min-h-screen bg-white" ref={containerRef}>
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           {/* Header avec animation de fade-in */}
//           <motion.div 
//             ref={titleRef}
//             initial={{ opacity: 0, y: -20 }}
//             animate={isTitleInView ? { 
//               opacity: 1, 
//               y: 0,
//               transition: {
//                 duration: 0.8,
//                 ease: "easeOut"
//               }
//             } : { opacity: 0, y: -20 }}
//             className="mb-16"
//           >
//             <h1 className="text-4xl font-light text-gray-900 tracking-tight">
//               Qui sommes-nous
//             </h1>
//           </motion.div>

//           {/* Content avec animation progressive */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ 
//               opacity: 1,
//               transition: {
//                 delay: 0.3,
//                 duration: 0.8
//               }
//             }}
//             className="flex flex-col lg:flex-row gap-12 lg:gap-20"
//           >
//             {/* Gallery Section - Left */}
//             <div className="lg:w-1/2">
//               <CardStack/>
              
//               {/* Link to Gallery - Desktop version */}
//               <SectionWrapper delay={0.6}>
//                 <div className="mt-12 bg pl-5 hidden lg:block">
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Link 
//                       href="/about/gallery"
//                       className="group relative inline-flex items-center gap-2 px-6 py-3 text-gray-600 rounded-lg overflow-hidden transition-all hover:bg-gray-800"
//                     >
//                       <div className="absolute inset-0 w-0 bg-white bg-opacity-20 group-hover:w-full transition-all duration-300" />
//                       <span className="relative font-medium">Voir la galerie complète</span>
//                       <svg 
//                         className="w-5 h-5 relative transition-transform group-hover:translate-x-1" 
//                         fill="none" 
//                         stroke="currentColor" 
//                         viewBox="0 0 24 24" 
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path 
//                           strokeLinecap="round" 
//                           strokeLinejoin="round" 
//                           strokeWidth="2" 
//                           d="M14 5l7 7m0 0l-7 7m7-7H3"
//                         />
//                       </svg>
//                     </Link>
//                   </motion.div>
//                 </div>
//               </SectionWrapper>
              
//               {/* Badge Experience */}
//               <SectionWrapper delay={0.8}>
//                 <motion.div 
//                   className="mt-8 p-4 bg-gray-50 rounded-lg"
//                   whileHover={{ 
//                     scale: 1.02,
//                     transition: { duration: 0.2 }
//                   }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <motion.div 
//                       className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center"
//                       initial={{ scale: 0 }}
//                       animate={useInView(titleRef, { once: false }) ? { 
//                         scale: 1,
//                         transition: {
//                           delay: 1,
//                           type: "spring",
//                           stiffness: 200,
//                           damping: 15
//                         }
//                       } : { scale: 0 }}
//                     >
//                       <span className="text-lg font-bold">5</span>
//                     </motion.div>
//                     <div>
//                       <p className="font-medium text-gray-900">5 ans d'expérience</p>
//                       <p className="text-sm text-gray-600">dans la finance et le conseil</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </SectionWrapper>
//             </div>

//             {/* Text Section - Right */}
//             <div className="lg:w-1/2">
//               <div className="space-y-16">
//                 {/* Notre Histoire */}
//                 <SectionWrapper delay={0.4}>
//                   <section>
//                     <motion.h2 
//                       className="text-2xl font-light text-gray-900 mb-6 tracking-wide"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ 
//                         opacity: 1, 
//                         x: 0,
//                         transition: { delay: 0.5 }
//                       }}
//                     >
//                       Notre histoire
//                     </motion.h2>
//                     <div className="space-y-4">
//                       {[
//                         "Fondé en 2019, notre cabinet a démarré avec une vision simple mais ambitieuse : rendre la finance plus accessible et transparente pour tous.",
//                         "Ce qui a commencé comme une idée partagée entre trois passionnés de finance est devenu une réalité grâce à notre équipe dédiée et à notre engagement envers l'excellence.",
//                         "Au fil des années, nous avons accompagné plus de 500 clients dans leurs projets financiers, développant une expertise reconnue dans le conseil stratégique et la gestion patrimoniale."
//                       ].map((paragraph, index) => {
//                         const paragraphRef = useRef(null);
//                         const isParagraphInView = useInView(paragraphRef, { once: false, margin: "-30px" });
                        
//                         return (
//                           <motion.p
//                             key={index}
//                             ref={paragraphRef}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={isParagraphInView ? { 
//                               opacity: 1, 
//                               y: 0,
//                               transition: {
//                                 delay: 0.6 + (index * 0.2),
//                                 duration: 0.6
//                               }
//                             } : { opacity: 0, y: 20 }}
//                             className="text-gray-600 leading-relaxed"
//                           >
//                             {paragraph}
//                           </motion.p>
//                         );
//                       })}
//                     </div>
//                   </section>
//                 </SectionWrapper>

//                 {/* Link to Gallery - Mobile version */}
//                 <motion.div 
//                   className="lg:hidden"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={useInView(containerRef, { once: false }) ? { 
//                     opacity: 1, 
//                     y: 0,
//                     transition: { delay: 1.2 }
//                   } : { opacity: 0, y: 20 }}
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Link 
//                       href="/about/gallery"
//                       className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors group"
//                     >
//                       <span className="font-medium">Voir la galerie complète</span>
//                       <svg 
//                         className="w-5 h-5 transition-transform group-hover:translate-x-1" 
//                         fill="none" 
//                         stroke="currentColor" 
//                         viewBox="0 0 24 24" 
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path 
//                           strokeLinecap="round" 
//                           strokeLinejoin="round" 
//                           strokeWidth="2" 
//                           d="M14 5l7 7m0 0l-7 7m7-7H3"
//                         />
//                       </svg>
//                     </Link>
//                   </motion.div>
//                 </motion.div>

//                 {/* Bouton Voir Plus */}
//                 <SectionWrapper delay={1.4}>
//                   <div className="pt-8 border-t border-gray-200">
//                     <motion.div
//                       whileHover={{ x: 5 }}
//                     >
//                       <Link 
//                         href="/about"
//                         className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
//                       >
//                         <span className="font-medium">Voir plus sur notre histoire</span>
//                         <svg 
//                           className="w-5 h-5 transition-transform group-hover:translate-x-1" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24" 
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path 
//                             strokeLinecap="round" 
//                             strokeLinejoin="round" 
//                             strokeWidth="2" 
//                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                           />
//                         </svg>
//                       </Link>
//                     </motion.div>
//                   </div>
//                 </SectionWrapper>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const metadata = {
  title: 'Qui Sommes-Nous',
  description: 'Notre histoire et mission',
};

const galleryImages = [
  {
    src: '/on.jpg',
    alt: 'Équipe de sécurité NPA',
    title: 'Notre équipe de sécurité'
  },
  {
    src: '/two.jpg',
    alt: 'Service de nettoyage professionnel',
    title: 'Service nettoyage'
  },
  {
    src: '/five.jpg',
    alt: 'Tenues de travail personnalisées',
    title: 'Tenues de travail'
  }
  
];

const CardStack = () => {
  const images = [
    { id: 1, src: '/services/fence.jpg', alt: 'Service de sécurité et gardiennage', rotation: '-6deg' },
    { id: 2, src: '/services/safety2.jpg', alt: 'Tenues de travail personnalisées', rotation: '0deg' },
    { id: 3, src: '/services/security2.jpg', alt: 'Service de nettoyage professionnel', rotation: '6deg' },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-80 h-80">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0, 
            rotate: image.rotation,
            transition: {
              delay: index * 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }
          } : { opacity: 0, y: 50, rotate: 0 }}
          whileHover={{ scale: 1.05, zIndex: 50 }}
          className={`absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl ${
            index === 0 ? 'top-0 left-0 z-30' :
            index === 1 ? 'top-4 left-4 z-20' :
            'top-8 left-8 z-10'
          }`}
        >
          <Image 
            src={image.src} 
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500"
          />
        </motion.div>
      ))}
    </div>
  );
};

const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          delay: delay,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }
      } : { opacity: 0, y: 30 }}
    >
      {children}
    </motion.div>
  );
};

export default function QuiSommesNousPage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false });

  return (
    <div className="min-h-screen bg-white mt-6" ref={containerRef}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header avec animation de fade-in */}
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: -20 }}
            animate={isTitleInView ? { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            } : { opacity: 0, y: -20 }}
            className="mb-16"
          >
            <h1 className="text-4xl font-bold text-next-orange tracking-tight">
              Qui sommes-nous
            </h1>
          </motion.div>

          {/* Content avec animation progressive */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.8
              }
            }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20"
          >
            {/* Gallery Section - Left */}
            <div className="lg:w-1/2">
              <CardStack/>
              
              {/* Link to Gallery - Desktop version */}
              <SectionWrapper delay={0.6}>
                <div className="mt-12 bg pl-5 hidden lg:block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="/about/gallery"
                      className="group relative inline-flex items-center gap-2 px-6 py-3 text-gray-600 rounded-lg overflow-hidden transition-all hover:bg-gray-800"
                    >
                      <div className="absolute inset-0 w-0 bg-white bg-opacity-20 group-hover:w-full transition-all duration-300" />
                      <svg 
                        className="w-5 h-5 relative transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </SectionWrapper>
              
              {/* Badge Experience */}
              <SectionWrapper delay={0.8}>
                <motion.div 
                  className="mt-8 p-4 bg-gray-50 rounded-lg"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={useInView(titleRef, { once: false }) ? { 
                        scale: 1,
                        transition: {
                          delay: 1,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }
                      } : { scale: 0 }}
                    >
                      <span className="text-lg font-bold">40+</span>
                    </motion.div>
                    <div>
                      <p className="font-medium text-gray-900">40+ agents déployés</p>
                      <p className="text-sm text-gray-600">en sécurité et nettoyage</p>
                    </div>
                  </div>
                </motion.div>
              </SectionWrapper>
            </div>

            {/* Text Section - Right */}
            <div className="lg:w-1/2">
              <div className="space-y-16">
                {/* Notre Histoire */}
                <SectionWrapper delay={0.4}>
                  <section>
                    <motion.h2 
                      className="text-2xl font-light text-gray-900 mb-6 tracking-wide"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.5 }
                      }}
                    >
                      Notre histoire
                    </motion.h2>
                    <div className="space-y-4">
                      {[
                        "Next Plus Africa est une entreprise à quatre spécialités partagées dans 3 départements : Lion Evolution Security, Rose Cleaning et Next Plus Africa Fournitures.",
                        "Créée en 2023 avec un capital social de plus de 14,5 Millions de francs congolais, la société engage plus au moins 5 personnes dans son administration, plus de 10 collaborateurs sous-traitant et plus de 40 agents de sécurité et nettoyage déployés partout en République Démocratique du Congo.",
                        "Nos principaux services sont la sécurité des espaces, la personnalisation des tenues de travail/safety et le nettoyage professionnel."
                      ].map((paragraph, index) => {
                        const paragraphRef = useRef(null);
                        const isParagraphInView = useInView(paragraphRef, { once: false, margin: "-30px" });
                        
                        return (
                          <motion.p
                            key={index}
                            ref={paragraphRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isParagraphInView ? { 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: 0.6 + (index * 0.2),
                                duration: 0.6
                              }
                            } : { opacity: 0, y: 20 }}
                            className="text-gray-600 leading-relaxed"
                          >
                            {paragraph}
                          </motion.p>
                        );
                      })}
                    </div>
                  </section>
                </SectionWrapper>

                {/* Notre Mission
                <SectionWrapper delay={0.8}>
                  <section>
                    <motion.h2 
                      className="text-2xl font-light text-gray-900 mb-6 tracking-wide"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.9 }
                      }}
                    >
                      Notre mission
                    </motion.h2>
                    <div className="space-y-4">
                      {[
                        "Next Plus Africa est une entreprise spécialisée dans la sécurité, les tenues de travail (safety) ainsi que diverses fournitures professionnelles.",
                        "Nous nous engageons à fournir à nos clients des produits de qualité supérieure, ainsi qu'un service inégalé.",
                        "Notre vision : Participer à l'avenir de l'Afrique, nous sommes déterminés à soutenir la croissance économique et le développement à travers la région grâce à des nouvelles alternatives écologiques et économiques."
                      ].map((paragraph, index) => {
                        const paragraphRef = useRef(null);
                        const isParagraphInView = useInView(paragraphRef, { once: false, margin: "-30px" });
                        
                        return (
                          <motion.p
                            key={index}
                            ref={paragraphRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isParagraphInView ? { 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: 1.0 + (index * 0.2),
                                duration: 0.6
                              }
                            } : { opacity: 0, y: 20 }}
                            className="text-gray-600 leading-relaxed"
                          >
                            {paragraph}
                          </motion.p>
                        );
                      })}
                    </div>
                  </section>
                </SectionWrapper> */}

              

                {/* Bouton Voir Plus */}
                <SectionWrapper delay={1.4}>
                  <div className="pt-8 border-t border-gray-200">
                    <motion.div
                      whileHover={{ x: 5 }}
                    >
                      <Link 
                        href="/about/mission"
                        className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
                      >
                        <span className="font-medium">Voir plus sur nos services</span>
                        <svg 
                          className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </SectionWrapper>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}