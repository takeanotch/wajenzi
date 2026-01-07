import { useEffect, useState } from 'react';

const ContactPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Afficher le popup après 100ms (léger délai pour le chargement de la page)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Cacher le popup après 5 secondes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed  backdrop:blur-lg z top-[20%] z-50 left-1/2 transform -translate-x-1/2  animate-fade-in">
      <div className="bg-black/80 text-gray-700  backdrop:blur-xl border border-white/30 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          {/* Icône */}
          <div className="flex-shrink-0">
            <svg 
              className="w-6 h-6 text-gray-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          {/* Texte */}
          <div className="text-gray-300">
            <p className="text-sm font-medium">
              Pour plus de détails sur ce projet contactez-nous
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;