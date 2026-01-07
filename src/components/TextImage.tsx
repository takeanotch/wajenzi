// TextImage.tsx
import React from 'react';

interface TextImageProps {
  text: string;
  imageUrl: string;
  className?: string;
}

const TextImage: React.FC<TextImageProps> = ({ text, imageUrl, className = '' }) => {
  return (
    <div className={`relative w-full min-h-[300px] flex items-center justify-center overflow-hidden ${className}`}>
      
      {/* Image de fond réelle */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      
      {/* Overlay sombre pour meilleure lisibilité */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Texte avec effet d'image */}
      <div className="relative z-10 p-8">
        <div className="relative">
          {/* Texte principal avec effet clip */}
          <div 
            className="text-7xl md:text-9xl font-black text-center"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {text}
          </div>
          
          {/* Ombre du texte pour la compatibilité */}
          <div 
            className="absolute top-0 left-0 w-full h-full text-7xl md:text-9xl font-black text-center text-white/30 pointer-events-none"
            style={{ zIndex: -1 }}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImage;