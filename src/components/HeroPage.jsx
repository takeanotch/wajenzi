
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HeroPage() {
  const backgrounds = ["/arch1.jpg", "/arch2.jpg", "/arch3.jpg"];
  const [currentBg, setCurrentBg] = useState(0);
  
  const stats = [
    { value: "250+", label: "Projets" },
    { value: "8", label: "d'Expérience" },
    { value: "50+", label: "Experts" },
    { value: "98%", label: "Satisfaction" },
  ];

  const slogans = [
    "Transformons vos rêves en réalité architecturale,Design innovant, construction précise",
    "Design innovant, construction précise,Design innovant, construction précise",
    "L'excellence en architecture et design d'intérieur,Design innovant, construction précise",
  ];

  // Services différents pour chaque background
  const services = [
    [
      { name: "Plans 3D", icon: "📐", desc: "Modélisation précise" },
      { name: "Architecture", icon: "🏛️", desc: "Design innovant" },
    ],
    [
      { name: "Construction", icon: "🏗️", desc: "Ouvrage durable" },
      { name: "Matériaux", icon: "🧱", desc: "Choix premium" },
    ],
    [
      { name: "Design Intérieur", icon: "🎨", desc: "Ambiance unique" },
      { name: "Rénovation", icon: "🔨", desc: "Transformation" }
    ]
  ];

  // Rotation automatique du background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Container pour les backgrounds empilés */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, index) => (
          <motion.div
            key={bg}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${bg}')` }}
            initial={{ opacity: index === 0 ? 1 : 0 }}
            animate={{ 
              opacity: currentBg === index ? 1 : 0,
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Overlay subtil */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      {/* Contenu principal */}
      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            {/* Logo/Titre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Let's Build It Together
              </h1>
            </motion.div>

            {/* Slogan avec animation discrète */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p
                key={currentBg}
                className="text-xl md:text-2xl text-gray-100 mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {slogans[currentBg]}
              </motion.p>
            </motion.div>

            {/* Boutons CTA */}
            <div className="flex flex-co xs:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button 
                  className="px-8 py-3 bg-red-600 text-white font-semibold shadow-xl w-full sm:w-auto"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#dc2626",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ask Devis
                </motion.button>
              </motion.div>

              {/* Bouton mobile "Voir nos plans" */}
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="/plan">
                
                <motion.button 
                  className="px-6 py-3 flex items-center gap-2 justify-center bg-black text-white font-medium border border-white/20 shadow-lg w-full"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#1f2937",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Plans
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                  </svg>
                </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques - Version responsive améliorée */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[48%] max-w-3xl z-30">
        <motion.div 
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
            >
              {/* Ligne décorative au-dessus - cachée sur mobile */}
              <div className="hidden md:block h-px w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4 md:mb-6" />
              
              {/* Valeur */}
              <motion.div 
                className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 font-serif tracking-tight"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 1 + index * 0.1
                }}
              >
                {stat.value}
              </motion.div>
              
              {/* Label - taille réduite sur mobile */}
              <div className="text-xs md:text-xs text-gray-200 tracking-wider uppercase font-light letter-spacing-1 px-1">
                {stat.label}
              </div>
              
              {/* Ligne décorative en-dessous - cachée sur mobile */}
              <div className="hidden md:block h-px w-8 bg-white/20 mx-auto mt-4" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicateur de background - DESKTOP (gauche) */}
      <div className="absolute left-8 bottom-1/4 z-30 hidden lg:flex flex-col items-center gap-6">
        {/* Titre vertical */}
        <motion.div 
          className="text-white text-sm uppercase tracking-widest font-light origin-left whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Backgrounds
        </motion.div>
        
        {/* Ligne verticale */}
        <div className="h-16 w-px bg-gradient-to-b from-white/30 via-white/50 to-white/30" />
        
        {/* Indicateurs circulaires modernes */}
        <div className="flex flex-col gap-3">
          {backgrounds.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentBg(index)}
              className="relative flex items-center justify-center w-8 h-8"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Cercle extérieur */}
              <div className={`absolute w-8 h-8 rounded-full border transition-all duration-300 ${
                currentBg === index 
                  ? "border-white scale-100" 
                  : "border-white/20 scale-80"
              }`} />
              
              {/* Cercle intérieur rempli pour l'actif */}
              {currentBg === index && (
                <motion.div 
                  className="absolute w-4 h-4 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />
              )}
              
              {/* Cercle intérieur vide pour les inactifs */}
              {currentBg !== index && (
                <div className="absolute w-2 h-2 rounded-full bg-white/30" />
              )}
              
              {/* Numéro en arrière-plan */}
              <span className="text-xs font-medium text-white/20">
                {index + 1}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Indicateur de background - MOBILE (top-right) */}
      <div className="absolute top-[20%] right-4 z-30 flex lg:hidden items-center gap-3">
        {/* Indicateurs horizontaux */}
        <div className="flex gap-2">
          {backgrounds.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentBg(index)}
              className="relative flex items-center justify-center w-6 h-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Cercle extérieur */}
              <div className={`absolute w-6 h-6 rounded-full border transition-all duration-300 ${
                currentBg === index 
                  ? "border-white scale-100" 
                  : "border-white/20 scale-80"
              }`} />
              
              {/* Cercle intérieur rempli pour l'actif */}
              {currentBg === index && (
                <motion.div 
                  className="absolute w-3 h-3 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />
              )}
              
              {/* Cercle intérieur vide pour les inactifs */}
              {currentBg !== index && (
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white/30" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Indication de service mobile à côté des indicateurs */}
        <motion.div 
          key={`mobile-service-${currentBg}`}
          className="bg-black/40   backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-white font-medium">
              {services[currentBg][0].icon}
            </span>
            <span className="text-xs text-white font-light">
              {services[currentBg][0].name}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Section "Nos Services" agrandie - DESKTOP */}
      <motion.div 
        className="absolute  bottom-[10%] right-10 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {/* Titre vertical */}
        <motion.div 
          key={`services-title-${currentBg}`}
          className="text-white text-sm uppercase tracking-widest font-light origin-left whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {currentBg === 0 && "Services Plans"}
          {currentBg === 1 && "Services Construction"}
          {currentBg === 2 && "Services Design"}
        </motion.div>
        
        {/* Ligne verticale décorative */}
        <div className="h-24 w-px bg-gradient-to-b from-white/30 via-white/50 to-white/30" />
        
        {/* Liste des services avec animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`services-${currentBg}`}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {services[currentBg].map((service, i) => (
              <motion.div
                key={`${currentBg}-${service.name}`}
                className="group relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ 
                  x: -8,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Ligne d'indicateur au hover */}
                <motion.div 
                  className="absolute -left-2 w-1 h-0 bg-white rounded-full"
                  initial={false}
                  whileHover={{ height: "80%" }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Icône */}
                <div className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                  {service.icon}
                </div>
                
                {/* Nom du service */}
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium tracking-wide">
                    {service.name}
                  </span>
                  <span className="text-white/40 text-xs font-light">
                    {service.desc}
                  </span>
                </div>
                
                {/* Effet de fond au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

    
    </div>
  );
}