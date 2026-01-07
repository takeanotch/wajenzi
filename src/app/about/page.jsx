// about.jsx - Version minimaliste
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>À Propos | Cabinet de Consulting</title>
        <meta name="description" content="Notre histoire, notre approche et notre équipe de consultants experts." />
      </Head>
      
      <div className="min-h-screen relative bg-white py-6">

        {/* En-tête avec pile de cartes */}
        <header className="pt-12 pb-16 border-b z-50 border-gray-100">
          <div className="max-w-4xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
               <div className="flex -ml-2  w-max pr-4 items-center gap- font-black">
            <img src='/pnz.png' className='invert w-14 h-14'/>
            <p>
              Stone<span className="font-light">Consulting</span>
            </p>
          </div>
                <h1 className="text-3xl font-bold md:text-4xl  fa text-gray-900 mb-4">
                  Nous accompagnons les entreprises dans leur transformation stratégique
                </h1>
                <p className="text-gray-600 text-lg">
                  Depuis 2010, nous aidons les organisations à naviguer dans des environnements complexes et à réaliser leur plein potentiel.
                </p>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <CardStack />
              </div>
            </div>
          </div>
        </header>
        
        {/* Contenu principal */}
        <main className="py-16 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Notre histoire */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-wide">NOTRE HISTOIRE</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Fondé par trois associés issus du conseil en stratégie, notre cabinet est né de la conviction que chaque organisation mérite un accompagnement sur mesure, alliant rigueur analytique et pragmatisme opérationnel.
                </p>
                <p>
                  Notre approche privilégie la simplicité et l'efficacité. Nous croyons que les solutions les plus pertinentes sont souvent les plus élégantes, et nous nous efforçons de délivrer des recommandations claires, actionnables et mesurables.
                </p>
                <p>
                  Au fil des années, nous avons développé une méthodologie propre qui combine expertise sectorielle, analyse de données et compréhension approfondie des dynamiques organisationnelles.
                </p>
              </div>
            </section>
            
            {/* Notre approche */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-wide">NOTRE APPROCHE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Écoute et compréhension</h3>
                  <p className="text-gray-700">
                    Nous commençons chaque mission par une écoute active, cherchant à comprendre non seulement les challenges apparents, mais aussi les dynamiques sous-jacentes de votre organisation.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Analyse rigoureuse</h3>
                  <p className="text-gray-700">
                    Nos recommandations s'appuient sur des analyses approfondies et des données fiables, toujours contextualisées par notre expérience sectorielle.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Solutions pragmatiques</h3>
                  <p className="text-gray-700">
                    Nous concevons des solutions concrètes et réalisables, en tenant compte des contraintes organisationnelles et en prévoyant des mécanismes de suivi précis.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Accompagnement sur mesure</h3>
                  <p className="text-gray-700">
                    Nous adaptons notre implication selon vos besoins, de la formulation de recommandations à l'accompagnement de leur mise en œuvre.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Équipe */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-wide">NOTRE ÉQUIPE</h2>
              <p className="text-gray-700 mb-8 max-w-2xl">
                Nos consultants partagent une même exigence intellectuelle et opérationnelle. Chaque membre de notre équipe apporte une expertise spécifique tout en adhérant à notre méthodologie commune.
              </p>
              
              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="border-t border-gray-100 pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                          <span className="text-gray-500 text-sm">{member.tenure}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{member.role}</p>
                        <p className="text-gray-700 text-sm">{member.expertise}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Valeurs */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-wide">NOS PRINCIPES</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="space-y-3">
                    <div className="w-8 h-0.5 bg-gray-900"></div>
                    <h3 className="font-medium text-gray-900">{value.title}</h3>
                    <p className="text-gray-700 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Collaborations */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-wide">COLLABORATIONS</h2>
              <p className="text-gray-700 mb-8">
                Nous avons eu l'opportunité de travailler avec des organisations de différentes tailles et secteurs, des startups aux entreprises établies, en France et à l'international.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {clients.map((client, index) => (
                  <div key={index} className="text-center">
                    <div className="text-gray-400 text-sm mb-1">{client.sector}</div>
                    <div className="text-gray-900 font-medium">{client.name}</div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Contact */}
            <section className="pt-8 border-t border-gray-100">
              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  Pour discuter de votre projet ou en savoir plus sur notre approche
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center text-gray-900 hover:text-gray-700 border-b border-gray-300 hover:border-gray-700 pb-1 transition-colors duration-200"
                >
                  Nous contacter
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>
            </section>
          </div>
        </main>

      </div>
    </>
  );
};

// Composant pour l'effet de pile de cartes
const CardStack = () => {
  const images = [
    { id: 1, src: '/images/five.jpg', alt: 'Consulting' },
    { id: 2, src: '/images/nine.jpg', alt: 'Stratégie' },
    { id: 3, src: '/images/one.jpg', alt: 'Analyse' },
  ];

  return (
    <div className="relative w-64 h-80">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute w-56 h-72 rounded-sm overflow-hidden border border-gray-200 bg-gray-50 ${
            index === 0 ? 'top-0 left-0 z-30' :
            index === 1 ? 'top-3 left-3 z-20' :
            'top-6 left-6 z-10'
          }`}
        >
          {/* Placeholder minimaliste */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-300 text-4xl font-light mb-2">
                {image.id === 1 ? '05' : image.id === 2 ? '09' : '01'}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                Image {image.id}
              </div>
            </div>
          </div>
          
          {/* Pour utiliser avec les vraies images :
          <Image 
            src={image.src} 
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
          */}
        </div>
      ))}
    </div>
  );
};

// Données pour l'équipe (version épurée)
const teamMembers = [
  {
    name: "Camille Laurent",
    role: "Associée",
    expertise: "Stratégie d'entreprise et transformation organisationnelle",
    tenure: "Depuis 2010"
  },
  {
    name: "Thomas Moreau",
    role: "Associé",
    expertise: "Opérations et efficacité organisationnelle",
    tenure: "Depuis 2012"
  },
  {
    name: "Léa Dubois",
    role: "Senior Manager",
    expertise: "Innovation et développement de nouveaux marchés",
    tenure: "Depuis 2015"
  },
  {
    name: "Samuel Chen",
    role: "Manager",
    expertise: "Data analytics et performance opérationnelle",
    tenure: "Depuis 2018"
  }
];

// Données pour les valeurs
const values = [
  {
    title: "Indépendance",
    description: "Nos recommandations sont guidées exclusivement par l'intérêt de nos clients."
  },
  {
    title: "Rigueur",
    description: "Chaque analyse repose sur des faits vérifiés et des méthodologies éprouvées."
  },
  {
    title: "Discrétion",
    description: "La confidentialité de nos échanges et de nos travaux est totale."
  },
  {
    title: "Pragmatisme",
    description: "Nous privilégions les solutions réalistes et facilement implémentables."
  },
  {
    title: "Exigence",
    description: "Nous maintenons des standards élevés dans la qualité de nos livrables."
  },
  {
    title: "Équité",
    description: "Nos honoraires sont transparents et proportionnés à la valeur créée."
  }
];

// Données pour les clients
const clients = [
  { name: "FinTech Co", sector: "Fintech" },
  { name: "BioSanté", sector: "Santé" },
  { name: "Logistique+", sector: "Logistique" },
  { name: "Eco Énergie", sector: "Énergie" },
  { name: "Retail Group", sector: "Distribution" },
  { name: "Manufacture", sector: "Industrie" },
  { name: "Digital Bank", sector: "Banque" },
  { name: "Urban Tech", sector: "Smart City" }
];

export default AboutPage;