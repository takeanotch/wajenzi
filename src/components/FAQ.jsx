"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Quels services d'architecture proposez-vous ?",
    answer: `
Nous offrons des services complets en architecture et design d'intérieur :

• Conception architecturale sur mesure
• Design d'intérieur résidentiel et commercial
• Rénovation et réaménagement
• Plans et permis de construire
• Suivi de chantier
• Consultation en décoration

Notre approche allie esthétique, fonctionnalité et respect du budget.
    `,
  },
  {
    question: "Quels types de projets réalisez-vous ?",
    answer: `
Nous intervenons sur :

• Maisons individuelles et villas
• Appartements et lofts
• Bureaux et espaces professionnels
• Commerces et restaurants
• Rénovations patrimoniales
• Extensions et agrandissements

Chaque projet bénéficie d'une attention personnalisée.
    `,
  },
  {
    question: "Comment se passe un projet avec vous ?",
    answer: `
Processus en 4 étapes :

1. Échange et analyse de vos besoins
2. Esquisses et proposition de concepts
3. Développement des plans définitifs
4. Accompagnement pendant les travaux

Suivi régulier et transparent à chaque étape.
    `,
  },
  {
    question: "Proposez-vous des visuels 3D ?",
    answer: `
Oui, nous créons des visuels pour vous aider à visualiser :

• Rendu 3D photoréaliste
• Plans en coupe
• Maquettes numériques
• Sélection de matériaux

Ces outils facilitent la prise de décision.
    `,
  },
  {
    question: "Quels sont vos délais et tarifs ?",
    answer: `
Tarification adaptée à chaque projet :

• Devis personnalisé gratuit
• Forfaits selon la complexité
• Transparence complète sur les coûts
• Délais définis en amont

Pas de surprise, juste des résultats.
    `,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-medium text-center mb-12 text-gray-800">
        Questions fréquentes
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 bg-white rounded-none overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-normal text-gray-800">
                {faq.question}
              </span>

              <div className="flex items-center justify-center w-8 h-8 ">
                <span className="text-lg font-light text-gray-700">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
            </button>

            <div
              className={`transition-all duration-300 ${
                openIndex === index
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-6 border-t border-gray-100">
                <div className="py-6">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-6">
          Vous avez une question spécifique ?
        </p>
        <button className="px-8 py-3 bg-gray-800 text-white font-normal hover:bg-gray-700 transition-colors rounded-none">
          Nous contacter
        </button>
      </div>
    </section>
  );
}