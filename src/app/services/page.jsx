// services.jsx - Version minimaliste
import Head from 'next/head';
import React from 'react';

const ServicesPage = () => {
  return (
    <>
      <Head>
        <title>Services | Cabinet de Consulting</title>
        <meta name="description" content="Nos domaines d'expertise et méthodologie d'accompagnement." />
      </Head>
      
      <div className="min-h-screen bg-white py-6">

        {/* En-tête */}
        <header className="pt-12 pb-16 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-2/3">
                <div className="flex -ml-2 w-max pr-4 items-center gap- font-black">
                  <img src='/pnz.png' className='invert w-14 h-14'/>
                  <p>
                    Stone<span className="font-light">Consulting</span>
                  </p>
                </div>
                <h1 className="text-3xl font-bold md:text-4xl text-gray-900 mb-4 mt-6">
                  Des solutions sur mesure pour chaque défi stratégique
                </h1>
                <p className="text-gray-600 text-lg">
                  Nous accompagnons les organisations dans la définition et l'exécution de leur stratégie, de la réflexion initiale à la mise en œuvre opérationnelle.
                </p>
              </div>
              
              <div className="lg:w-1/3 flex justify-center">
                <ServicesGrid />
              </div>
            </div>
          </div>
        </header>
        
        {/* Contenu principal */}
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Nos domaines d'expertise */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-12 tracking-wide">DOMAINES D'EXPERTISE</h2>
              
              <div className="space-y-16">
                {services.map((service, index) => (
                  <div key={index} className="border-t border-gray-100 pt-12">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-0.5 bg-gray-900"></div>
                          <span className="text-sm font-medium text-gray-900 tracking-wide">{service.category}</span>
                        </div>
                        <h3 className="text-xl font-normal text-gray-900 mb-2">{service.title}</h3>
                      </div>
                      
                      <div className="md:w-2/3">
                        <p className="text-gray-700 mb-6">{service.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {service.deliverables.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Notre méthodologie */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-12 tracking-wide">NOTRE MÉTHODOLOGIE</h2>
              
              <div className="relative">
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                
                <div className="space-y-12">
                  {methodology.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start">
                        <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white border border-gray-200 rounded-full z-10">
                          <span className="text-gray-900 font-light text-xl">{step.step}</span>
                        </div>
                        
                        <div className="ml-0 md:ml-8 flex-1">
                          <div className="flex items-center mb-2">
                            <div className="md:hidden w-8 h-0.5 bg-gray-900 mr-3"></div>
                            <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <p className="text-gray-700">{step.description}</p>
                            
                            {step.details && (
                              <ul className="space-y-2">
                                {step.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3"></div>
                                    <span className="text-gray-600 text-sm">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Format d'intervention */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-wide">FORMATS D'INTERVENTION</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {interventionFormats.map((format, index) => (
                  <div key={index} className="border border-gray-100 p-6">
                    <div className="mb-4">
                      <div className="w-8 h-0.5 bg-gray-900 mb-3"></div>
                      <h3 className="font-medium text-gray-900 text-lg mb-2">{format.title}</h3>
                      <p className="text-gray-600 text-sm">{format.duration}</p>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {format.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Livrables :</span> {format.deliverables}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Secteurs d'intervention */}
            <section className="mb-20">
              <h2 className="text-2xl font-normal text-gray-900 mb-8 tracking-wide">SECTEURS D'INTERVENTION</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {sectors.map((sector, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-gray-900 font-medium">{sector.name}</div>
                    <div className="text-gray-500 text-sm">{sector.examples}</div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Contact */}
            <section className="pt-8 border-t border-gray-100">
              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  Pour discuter de vos besoins spécifiques ou planifier un premier échange
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center text-gray-900 hover:text-gray-700 border-b border-gray-300 hover:border-gray-700 pb-1 transition-colors duration-200"
                >
                  Planifier un entretien
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

// Composant visuel pour la grille de services
const ServicesGrid = () => {
  return (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
        <div className="bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-300 text-2xl font-light">S</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Stratégie</div>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-300 text-2xl font-light">O</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Opérations</div>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-300 text-2xl font-light">T</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Transformation</div>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-300 text-2xl font-light">I</div>
            <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Innovation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Données pour les services
const services = [
  {
    category: "STRATÉGIE",
    title: "Définition et alignement stratégique",
    description: "Nous aidons les organisations à définir leur vision, à établir des objectifs clairs et à aligner leurs ressources sur leurs ambitions stratégiques.",
    deliverables: [
      {
        title: "Diagnostic stratégique",
        description: "Analyse approfondie du positionnement concurrentiel et des opportunités de marché"
      },
      {
        title: "Plan stratégique",
        description: "Feuille de route détaillée avec priorités et échéances claires"
      },
      {
        title: "Tableau de bord",
        description: "Système de suivi des indicateurs clés de performance"
      },
      {
        title: "Présentation au conseil",
        description: "Support de communication pour la gouvernance"
      }
    ]
  },
  {
    category: "OPÉRATIONS",
    title: "Optimisation et performance opérationnelle",
    description: "Nous identifions les leviers d'amélioration de l'efficacité opérationnelle et accompagnons leur mise en œuvre.",
    deliverables: [
      {
        title: "Cartographie des processus",
        description: "Identification des goulots d'étranglement et des opportunités"
      },
      {
        title: "Plan d'optimisation",
        description: "Recommandations concrètes pour améliorer la productivité"
      },
      {
        title: "Modèle de coûts",
        description: "Analyse détaillée de la structure de coûts"
      },
      {
        title: "Guide de mise en œuvre",
        description: "Instructions détaillées pour l'équipe opérationnelle"
      }
    ]
  },
  {
    category: "TRANSFORMATION",
    title: "Accompagnement du changement",
    description: "Nous facilitons les transitions organisationnelles en anticipant les résistances et en engageant les parties prenantes.",
    deliverables: [
      {
        title: "Plan de changement",
        description: "Stratégie de communication et d'engagement"
      },
      {
        title: "Formation des équipes",
        description: "Modules adaptés aux différents profils"
      },
      {
        title: "Suivi d'adoption",
        description: "Mesure de l'adhésion et de l'appropriation"
      },
      {
        title: "Retour d'expérience",
        description: "Capitalisation sur les apprentissages"
      }
    ]
  },
  {
    category: "INNOVATION",
    title: "Développement de nouveaux marchés",
    description: "Nous aidons les organisations à identifier et à exploiter de nouvelles opportunités de croissance.",
    deliverables: [
      {
        title: "Veille stratégique",
        description: "Surveillance des tendances émergentes"
      },
      {
        title: "Étude de marché",
        description: "Analyse des besoins clients et de la concurrence"
      },
      {
        title: "Business plan",
        description: "Évaluation de la viabilité économique"
      },
      {
        title: "Plan de lancement",
        description: "Feuille de route pour le déploiement"
      }
    ]
  }
];

// Données pour la méthodologie
const methodology = [
  {
    step: "01",
    title: "Compréhension",
    description: "Nous débutons chaque mission par une phase d'immersion visant à saisir pleinement votre contexte, vos enjeux et vos objectifs.",
    details: [
      "Entretiens avec les parties prenantes clés",
      "Analyse des documents stratégiques existants",
      "Évaluation du contexte concurrentiel",
      "Identification des contraintes et opportunités"
    ]
  },
  {
    step: "02",
    title: "Analyse",
    description: "Nos consultants mènent des investigations approfondies pour identifier les leviers d'action les plus pertinents.",
    details: [
      "Collecte et traitement des données",
      "Benchmark sectoriel",
      "Analyse financière et opérationnelle",
      "Évaluation des options stratégiques"
    ]
  },
  {
    step: "03",
    title: "Recommandations",
    description: "Nous formulons des propositions concrètes, argumentées et hiérarchisées selon leur impact potentiel.",
    details: [
      "Présentation des scénarios possibles",
      "Évaluation des risques et opportunités",
      "Planification des ressources nécessaires",
      "Estimation des gains potentiels"
    ]
  },
  {
    step: "04",
    title: "Mise en œuvre",
    description: "Nous accompagnons la réalisation des actions définies, en adaptant notre implication à vos besoins.",
    details: [
      "Définition du plan d'actions détaillé",
      "Suivi régulier des progrès",
      "Ajustements en fonction des retours terrain",
      "Transfert de compétences à vos équipes"
    ]
  }
];

// Données pour les formats d'intervention
const interventionFormats = [
  {
    title: "Diagnostic rapide",
    duration: "2-3 semaines",
    features: [
      "Analyse initiale des enjeux",
      "Entretiens avec l'équipe dirigeante",
      "Recommandations prioritaires",
      "Présentation des conclusions"
    ],
    deliverables: "Note stratégique et plan d'actions priorisé"
  },
  {
    title: "Mission stratégique",
    duration: "2-4 mois",
    features: [
      "Étude approfondie du sujet",
      "Analyse quantitative et qualitative",
      "Ateliers de co-construction",
      "Accompagnement de la décision"
    ],
    deliverables: "Rapport complet et plan de mise en œuvre"
  },
  {
    title: "Accompagnement sur mesure",
    duration: "6-12 mois",
    features: [
      "Intervention à temps partiel",
      "Suivi régulier des progrès",
      "Adaptation continue aux besoins",
      "Transfert progressif des compétences"
    ],
    deliverables: "Suivi continu et ajustements itératifs"
  }
];

// Données pour les secteurs
const sectors = [
  { name: "Services financiers", examples: "Banques, assurances, fintech" },
  { name: "Industrie", examples: "Manufacturing, automobile, aéronautique" },
  { name: "Santé", examples: "Pharmaceutique, biotech, établissements de santé" },
  { name: "Technologie", examples: "SaaS, hardware, telecom" },
  { name: "Énergie", examples: "Renouvelables, pétrole et gaz, utilities" },
  { name: "Retail", examples: "Distribution, e-commerce, luxe" },
  { name: "Services professionnels", examples: "Juridique, consulting, audit" },
  { name: "Public & Institutionnel", examples: "Collectivités, organisations internationales" }
];

export default ServicesPage;