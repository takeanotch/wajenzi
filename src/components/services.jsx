'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Calculator, 
  Target,
  FileText,
  Globe,
  Users
} from 'lucide-react';

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  
  const services = [
    {
      id: 1,
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      title: "Analyse Financière",
      description: "Évaluation approfondie de votre santé financière",
      iconColor: 'bg-blue-50',
      iconHoverColor: 'group-hover:bg-blue-100'
    },
    {
      id: 2,
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      title: "Stratégie d'Investissement",
      description: "Stratégies d'investissement personnalisées",
      iconColor: 'bg-green-50',
      iconHoverColor: 'group-hover:bg-green-100'
    },
    {
      id: 3,
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      title: "Gestion des Risques",
      description: "Protection de vos actifs et stabilité financière",
      iconColor: 'bg-purple-50',
      iconHoverColor: 'group-hover:bg-purple-100'
    },
    {
      id: 4,
      icon: <Calculator className="w-5 h-5 text-red-600" />,
      title: "Optimisation Fiscale",
      description: "Minimisation de votre charge fiscale",
      iconColor: 'bg-red-50',
      iconHoverColor: 'group-hover:bg-red-100'
    },
    {
      id: 5,
      icon: <Target className="w-5 h-5 text-amber-600" />,
      title: "Planification Stratégique",
      description: "Plans financiers à long terme",
      iconColor: 'bg-amber-50',
      iconHoverColor: 'group-hover:bg-amber-100'
    },
    {
      id: 6,
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
      title: "Conformité Réglementaire",
      description: "Respect des normes réglementaires",
      iconColor: 'bg-indigo-50',
      iconHoverColor: 'group-hover:bg-indigo-100'
    },
    {
      id: 7,
      icon: <Globe className="w-5 h-5 text-teal-600" />,
      title: "Finance Internationale",
      description: "Opérations financières transfrontalières",
      iconColor: 'bg-teal-50',
      iconHoverColor: 'group-hover:bg-teal-100'
    },
    {
      id: 8,
      icon: <Users className="w-5 h-5 text-cyan-600" />,
      title: "Transformation Financière",
      description: "Digitalisation de vos processus",
      iconColor: 'bg-cyan-50',
      iconHoverColor: 'group-hover:bg-cyan-100'
    }
  ];

  const visibleServices = showAll ? services : services.slice(0, 4);
  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: false, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
      }
    }
  };

  const newCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      }
    }
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête minimaliste */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Services Financiers
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Solutions sur mesure pour optimiser votre performance financière et gérer les risques
          </p>
        </motion.div>

        {/* Services Grid compact */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          ref={servicesRef}
        >
          {visibleServices.map((service, index) => (
            <motion.div 
              key={service.id}
              variants={showAll && index >= 4 ? newCardVariants : cardVariants}
              initial={showAll && index >= 4 ? "hidden" : false}
              animate={showAll && index >= 4 ? (isInView ? "visible" : "hidden") : false}
              whileHover={{ 
                y: -4,
                scale: 1.02,
              }}
              className="group bg-white rounded-lg border border-gray-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
            >
              {/* Icône et titre sur une ligne */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 ${service.iconColor} ${service.iconHoverColor} rounded-md transition-colors`}>
                  {service.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 pt-1">
                  {service.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 text-xs leading-relaxed">
                {service.description}
              </p>
              
              {/* Lien minimaliste */}
              <div className="mt-3 pt-2 border-t border-gray-50">
                <button className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:text-blue-800">
                  Plus d'info
                  <svg 
                    className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bouton "Voir plus/moins" */}
        <div className="flex justify-center mt-8">
          {!showAll && services.length > 4 && (
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-blue-600 text-sm font-medium px-4 py-2 hover:text-blue-800 transition-colors"
            >
              Voir plus de services
            </motion.button>
          )}
          
          {showAll && (
            <motion.button
              onClick={() => setShowAll(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              className="text-gray-600 text-sm font-medium px-4 py-2 hover:text-gray-800 transition-colors"
            >
              Réduire
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;