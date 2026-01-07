
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';

const OurTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "Alexandre Martin",
      title: "Architecte Principal",
      image: "/arch1.jpg",
      bio: "Expert en design durable avec 15 ans d'expérience.",
      email: "alexandre.martin@archi.com",
    },
    {
      id: 2,
      name: "Sophie Dubois",
      title: "Architecte d'Intérieur",
      image: "/arch2.jpg",
      bio: "Passionnée par l'optimisation des espaces de vie.",
      email: "sophie.dubois@archi.com",
    },
    {
      id: 3,
      name: "Thomas Leroy",
      title: "Architecte Urbaniste",
      image: "/arch3.jpg",
      bio: "Spécialiste en aménagement urbain.",
      email: "thomas.leroy@archi.com",
    },
    {
      id: 4,
      name: "Camille Petit",
      title: "Designer BIM",
      image: "/arch1.jpg",
      bio: "Expert en modélisation 3D et processus BIM.",
      email: "camille.petit@archi.com",
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Carousel automatique
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Calcule les membres visibles (1 complet + 1/3 du suivant)
  const getVisibleMembers = () => {
    const members = [];
    const totalVisible = 1.33; // 1 membre complet + 1/3 du suivant
    
    for (let i = 0; i < Math.ceil(totalVisible); i++) {
      const index = (currentIndex + i) % teamMembers.length;
      const isPartial = i >= Math.floor(totalVisible);
      members.push({ ...teamMembers[index], isPartial });
    }
    
    return members;
  };

  const visibleMembers = getVisibleMembers();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
    hover: {
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête minimaliste */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px w-16 bg-gray-800 mx-auto mb-6" />
          <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
            Notre Équipe
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Des architectes passionnés, unis par une vision commune.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Boutons de navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300"
            aria-label="Membre précédent"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300"
            aria-label="Membre suivant"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Carousel */}
          <motion.div 
            className="flex gap-4 md:gap-6 overflow-visible"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              {visibleMembers.map((member, index) => (
                <motion.div
                  key={`${member.id}-${currentIndex}`}
                  className={`flex-shrink-0 ${member.isPartial ? 'w-1/3 opacity-60' : 'w-full md:w-2/3'}`}
                  variants={cardVariants}
                  whileHover="hover"
                  custom={direction}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`bg-white border border-gray-100 rounded-l p-6 ${member.isPartial ? 'h-full' : ''}`}>
                    {/* Photo - PLUS GRANDE */}
                    <motion.div 
                      className={`relative mb-6 ${member.isPartial ? 'w-20 h-20 mx-auto' : 'w-40 h-40 mx-auto'}`}
                      variants={imageVariants}
                      whileHover="hover"
                    >
                      <div className={`overflow-hidden rounded-full border border-gray-100 ${member.isPartial ? 'w-20 h-20' : 'w-40 h-40'}`}>
                        <img 
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Informations */}
                    <div className="text-center space-y-3">
                      <div>
                        <h3 className={`font-normal text-gray-900 ${member.isPartial ? 'text-sm' : 'text-xl'}`}>
                          {member.name}
                        </h3>
                        <p className={`text-gray-500 ${member.isPartial ? 'text-xs' : 'text-base'}`}>
                          {member.title}
                        </p>
                      </div>

                      {!member.isPartial && (
                        <>
                          <div className="h-px w-8 bg-gray-200 mx-auto" />
                          <p className="text-gray-600 text-base leading-relaxed">
                            {member.bio}
                          </p>
                          <motion.a 
                            href={`mailto:${member.email}`}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors duration-300"
                            whileHover={{ x: 2 }}
                          >
                            <Mail className="w-4 h-4" />
                            <span>{member.email}</span>
                          </motion.a>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-8">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="focus:outline-none"
              aria-label={`Aller au membre ${index + 1}`}
            >
              <motion.div
                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'}`}
                whileHover={{ scale: 1.5 }}
                animate={{ 
                  scale: index === currentIndex ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}
        </div>

        {/* Compteur */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-gray-500">
            {currentIndex + 1} / {teamMembers.length}
          </p>
        </motion.div>

        {/* Bouton Voir Plus */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="px-8 py-2.5 border border-gray-300 text-gray-700 text-sm font-light tracking-wide rounded hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Voir toute l'équipe
          </motion.button>
        </motion.div>
      </div>

      {/* Styles globaux */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #fafafa;
        }
        
        * {
          letter-spacing: -0.01em;
        }
        
        /* Masquer la partie droite du membre partiel sur mobile */
        @media (max-width: 768px) {
          .w-1\/3 {
            display: none;
          }
          .w-full {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OurTeam;
