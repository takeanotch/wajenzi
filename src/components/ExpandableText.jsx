import { useState } from 'react';

const ExpandableText = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fonction pour limiter le texte au premier paragraphe
  const getFirstParagraph = (text) => {
    const paragraphs = text.split('\n');
    return paragraphs[0];
  };

  return (
    <>
      <p className={`transition ${isExpanded ? 'max-h-screen' : 'max-h-20 overflow-hidden'}`}>
        {isExpanded ? content : getFirstParagraph(content)}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
      >
        {isExpanded ? 'Afficher moins' : 'Afficher plus'}
      </button>
    </>
  );
};

export default ExpandableText;