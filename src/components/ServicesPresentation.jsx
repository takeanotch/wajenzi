// 'use client';

// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';

// const ServicesPresentation = () => {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

//   const services = [
//     {
//       id: 1,
//       title: 'Architecture',
//       subtitle: 'Vente de plans',
//       description: 'Conception de plans architecturaux sur mesure pour vos projets résidentiels et commerciaux.',
//       features: ['Plans sur mesure', 'Conseils en conception', 'Permis de construire']
//     },
//     {
//       id: 2,
//       title: 'Décoration Intérieure',
//       subtitle: 'Design d\'intérieur',
//       description: 'Transformation de vos espaces intérieurs avec des designs élégants et fonctionnels.',
//       features: ['Design personnalisé', 'Sélection de mobilier', 'Choix des matériaux']
//     },
//     {
//       id: 3,
//       title: 'Construction',
//       subtitle: 'Réalisation complète',
//       description: 'Gestion complète de vos projets de construction, de la fondation à la livraison.',
//       features: ['Gestion de projet', 'Contrôle qualité', 'Respect des délais']
//     }
//   ];

//   return (
//     <section ref={sectionRef} className="py-24 px-4 md:px-8 lg:px-16 bg-white">
//       <div className="max-w-6xl mx-auto">
        
//         {/* En-tête minimaliste */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           transition={{ duration: 0.5 }}
//           className="mb-20"
//         >
//           <div className="flex items-center gap-4 mb-6">
//             <div className="h-px w-12 bg-gray-300"></div>
//             <span className="text-sm tracking-wider text-gray-500 uppercase">Services</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
//             Architecture<span className="text-red-600">.</span><br />
//             Décoration<span className="text-blue-800">.</span><br />
//             Construction<span className="text-gray-400">.</span>
//           </h2>
//         </motion.div>

//         {/* Liste des services */}
//         <div className="space-y-32">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-start`}
//             >
              
//               {/* Section images superposées */}
//               <div className="lg:w-1/2">
//                 <div className="relative">
//                   {/* Image principale */}
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                     className="relative aspect-[4/5] overflow-hidden bg-gray-100"
//                   >
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-gray-400 text-sm mb-2">Image {service.id}.1</div>
//                         <div className={`h-48 w-48 mx-auto ${index === 1 ? 'bg-red-50' : 'bg-blue-50'}`}></div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Image secondaire superposée */}
//                   <motion.div
//                     initial={{ opacity: 0, x: 20, y: -20 }}
//                     animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: -20 }}
//                     transition={{ duration: 0.6, delay: 0.4 }}
//                     className="absolute -right-4 -bottom-4 w-2/3 aspect-[3/4] overflow-hidden border border-gray-200"
//                   >
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-gray-400 text-sm mb-2">Image {service.id}.2</div>
//                         <div className={`h-32 w-32 mx-auto ${index === 1 ? 'bg-red-100' : 'bg-blue-100'}`}></div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>

//               {/* Section contenu */}
//               <div className="lg:w-1/2 pt-8">
//                 {/* Numéro */}
//                 <div className="text-sm text-gray-400 mb-8">
//                   /0{service.id}
//                 </div>

//                 {/* Titre et sous-titre */}
//                 <div className="mb-8">
//                   <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
//                     {service.title}
//                   </h3>
//                   <div className="flex items-center gap-4">
//                     <div className={`h-px w-16 ${index === 1 ? 'bg-red-600' : 'bg-blue-800'}`}></div>
//                     <span className="text-gray-600">{service.subtitle}</span>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-600 mb-10 leading-relaxed max-w-lg">
//                   {service.description}
//                 </p>

//                 {/* Caractéristiques */}
//                 <div className="mb-12">
//                   {service.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-center py-3 border-b border-gray-100 last:border-0">
//                       <div className={`w-2 h-2 mr-4 ${index === 1 ? 'bg-red-600' : 'bg-blue-800'}`}></div>
//                       <span className="text-gray-700">{feature}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Lien "Voir plus" minimaliste */}
//                 <motion.a
//                   whileHover={{ x: 5 }}
//                   href="#"
//                   className="inline-flex items-center text-sm font-medium group"
//                 >
//                   <span className={`${index === 1 ? 'text-red-600 group-hover:text-red-800' : 'text-blue-800 group-hover:text-blue-900'}`}>
//                     En savoir plus
//                   </span>
//                   <svg 
//                     className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 ${index === 1 ? 'text-red-600' : 'text-blue-800'}`}
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24" 
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </motion.a>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Note de bas de page */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//           transition={{ duration: 0.6, delay: 0.8 }}
//           className="mt-32 pt-8 border-t border-gray-200"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <p className="text-sm text-gray-500">
//               Tous nos services incluent un accompagnement personnalisé.
//             </p>
//             <a href="#" className="text-sm text-gray-900 hover:text-blue-800 transition-colors">
//               Contactez-nous pour un devis →
//             </a>
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default ServicesPresentation;
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const ServicesPresentation = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const services = [
    {
      id: 1,
      title: 'Architecture',
      subtitle: 'Vente de plans',
      description: 'Conception de plans architecturaux sur mesure pour vos projets résidentiels et commerciaux.Gestion complète de vos projets de construction, de la fondation à la livraison.',
      features: ['Plans sur mesure', 'Conseils en conception', 'Permis de construire'],
      images: ['/arch1.jpg', '/arch3.jpg']
    },
    {
      id: 2,
      title: 'Décoration Intérieure',
      subtitle: 'Design d\'intérieur',
      description: 'Transformation de vos espaces intérieurs avec des designs élégants et fonctionnels.Gestion complète de vos projets de construction, de la fondation à la livraison.',
      features: ['Design personnalisé', 'Sélection de mobilier', 'Choix des matériaux'],
      images: ['/arch3.jpg', '/arch2.jpg']
    },
    {
      id: 3,
      title: 'Construction',
      subtitle: 'Réalisation complète',
      description: 'Gestion complète de vos projets de construction, de la fondation à la livraison.Gestion complète de vos projets de construction, de la fondation à la livraison.',
      features: ['Gestion de projet', 'Contrôle qualité', 'Respect des délais'],
      images: ['/arch2.jpg', '/arch1.jpg']
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête minimaliste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="mb-4">
            <span className="text-xs tracking-widest text-gray-500 uppercase">Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl  font-light text-gray-900">
            Architecture<span className="text-red-600">.</span> Décoration<span className="text-blue-800">.</span> Construction<span className="text-gray-400">.</span>
          </h2>
        </motion.div>

        {/* Liste des services */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-start`}
            >
              
              {/* Section images superposées */}
              <div className="lg:w-1/2">
                <div className="relative w-[400px] h-[400px]">
                  {/* Image principale */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative w-full h-full overflow-hidden"
                  >
                    <Image
                      src={service.images[0]}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  {/* Image secondaire superposée */}
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -20 }}
                    animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute -right-2 -bottom-2 w-2/3 aspect-[3/2] lg:aspect-[3/4] overflow-hidden border border-white shadow-sm"
                  >
                    <Image
                      src={service.images[1]}
                      alt={service.subtitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 66vw, 33vw"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Section contenu compacte */}
              <div className="lg:w-1/2 pt-4">
                {/* Numéro et titre */}
                <div className="mb-6">
                  <div className="text-xs text-gray-400 mb-2">/0{service.id}</div>
                  <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-1">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className={`h-px w-12 ${index === 1 ? 'bg-red-600' : 'bg-blue-800'}`}></div>
                    <span className="text-sm text-gray-600">{service.subtitle}</span>
                  </div>
                </div>

                {/* Description compacte */}
                <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>

                {/* Caractéristiques minimalistes */}
                <div className="mb-8 space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-1.5 h-1.5 mr-3 ${index === 1 ? 'bg-red-600' : 'bg-blue-800'}`}></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Lien minimaliste */}
                <motion.a
                  whileHover={{ x: 4 }}
                  href="#"
                  className="inline-flex items-center text-xs font-medium tracking-wide group"
                >
                  <span className={`${index === 1 ? 'text-red-600' : 'text-blue-800'}`}>
                    En savoir plus
                  </span>
                  <svg 
                    className={`ml-2 w-3 h-3 transition-transform group-hover:translate-x-1 ${index === 1 ? 'text-red-600' : 'text-blue-800'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note de bas de page minimaliste */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 pt-6 border-t border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="text-xs text-gray-500">
              Tous nos services incluent un accompagnement personnalisé.
            </p>
            <a href="#" className="text-xs text-gray-900 hover:text-blue-800 transition-colors">
              Contactez-nous pour un devis →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesPresentation;