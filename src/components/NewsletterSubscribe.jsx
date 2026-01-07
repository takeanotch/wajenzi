
// // 'use client'
// // import { useState } from 'react';
// // import { 
// //   Mail, 
// //   Check, 
// //   Send, 
// //   Sparkles, 
// //   ArrowRight,
// //   Shield,
// //   Bell,
// //   Building,
// //   Users,
// //   Briefcase
// // } from 'lucide-react';

// // export default function NewsletterSubscribe() {
// //   const [email, setEmail] = useState('');
// //   const [isSubscribed, setIsSubscribed] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!email || !email.includes('@')) return;
    
// //     setIsLoading(true);
    
// //     // Simulation d'un appel API
// //     await new Promise(resolve => setTimeout(resolve, 1500));
    
// //     setIsLoading(false);
// //     setIsSubscribed(true);
// //     setEmail('');
    
// //     // Réinitialiser après 5 secondes
// //     setTimeout(() => {
// //       setIsSubscribed(false);
// //     }, 5000);
// //   };

// //   return (
// //     <div className="min-h-screen bg-white flex items-center justify-center p-4">
// //       <div className="max-w-4xl w-full mx-auto">
// //         <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          
// //           {/* Partie gauche - Illustration et description */}
// //           <div className="space-y-4">
// //             <div className="flex items-center gap-2 mb-2">
// //               <div className="p-1 bg-next-orange">
// //                 <Bell className="h-5 w-5 text-white" />
// //               </div>
// //               <span className="text-xs font-medium text-next-gray uppercase tracking-wider">
// //                 Newsletter Next Plus Africa
// //               </span>
// //             </div>
            
// //             <h1 className="text-3xl md:text-4xl font-bold text-black leading-snug">
// //               Restez <span className="text-next-orange">connecté</span> avec nous
// //             </h1>
            
// //             <p className="text-next-gray">
// //               Recevez les dernières actualités sur nos services de sécurité, tenues de travail, 
// //               nettoyage et fournitures. Soyez informé des nouvelles opportunités d'emploi et 
// //               des offres exclusives.
// //             </p>
            
// //             <div className="space-y-3 pt-2">
// //               <div className="flex items-start gap-3">
// //                 <div className="mt-0.5 p-0.5 bg-next-orange">
// //                   <Building className="h-3.5 w-3.5 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-medium text-black text-sm">Actualités entreprise</h3>
// //                   <p className="text-next-gray text-xs">Développements, nouveaux services et expansions</p>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-start gap-3">
// //                 <div className="mt-0.5 p-0.5 bg-next-orange">
// //                   <Briefcase className="h-3.5 w-3.5 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-medium text-black text-sm">Offres d'emploi</h3>
// //                   <p className="text-next-gray text-xs">Opportunités chez Next Plus Africa et ses filiales</p>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-start gap-3">
// //                 <div className="mt-0.5 p-0.5 bg-next-orange">
// //                   <Users className="h-3.5 w-3.5 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-medium text-black text-sm">Conseils professionnels</h3>
// //                   <p className="text-next-gray text-xs">Expertise sécurité, nettoyage et équipements</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Partie droite - Formulaire */}
// //           <div className="relative">
// //             <div className="bg-white border border-next-gray p-6 md:p-8">
              
// //               {/* En-tête minimaliste */}
// //               <div className="mb-6">
// //                 <div className="flex items-center gap-2 mb-4">
// //                   <div className="p-1 bg-black">
// //                     <Mail className="h-4 w-4 text-white" />
// //                   </div>
// //                   <span className="text-sm font-medium text-black">Next Plus Africa</span>
// //                 </div>
                
// //                 <h2 className="text-xl font-bold text-black mb-1">
// //                   Abonnez-vous à notre newsletter
// //                 </h2>
// //                 <p className="text-next-gray text-sm">
// //                   Rejoignez nos partenaires et clients satisfaits
// //                 </p>
// //               </div>
              
// //               {isSubscribed ? (
// //                 <div className="text-center py-6 border border-next-gray">
// //                   <div className="inline-flex items-center justify-center w-12 h-12 bg-next-orange mb-3">
// //                     <Check className="h-5 w-5 text-white" />
// //                   </div>
// //                   <h3 className="text-lg font-bold text-black mb-1">
// //                     Bienvenue chez Next Plus Africa
// //                   </h3>
// //                   <p className="text-next-gray text-sm">
// //                     Vous êtes maintenant abonné. Recevez nos actualités sur la sécurité, 
// //                     les tenues de travail et le nettoyage en RDC.
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                   <div>
// //                     <label htmlFor="email" className="block text-xs font-medium text-black mb-1">
// //                       Adresse email professionnelle
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         <Mail className="h-4 w-4 text-next-gray" />
// //                       </div>
// //                       <input
// //                         type="email"
// //                         id="email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         placeholder="entreprise@email.com"
// //                         className="block w-full pl-10 pr-3 py-2.5 border border-next-gray focus:ring-1 focus:ring-next-orange focus:border-next-orange transition-colors duration-200"
// //                         required
// //                       />
// //                     </div>
// //                   </div>
                  
// //                   <button
// //                     type="submit"
// //                     onMouseEnter={() => setIsHovered(true)}
// //                     onMouseLeave={() => setIsHovered(false)}
// //                     disabled={isLoading}
// //                     className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 font-medium text-white ${isLoading ? 'bg-next-gray' : 'bg-black hover:bg-next-orange'} transition-colors duration-200`}
// //                   >
// //                     {isLoading ? (
// //                       <>
// //                         <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin"></div>
// //                         <span className="text-sm">Inscription...</span>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <span className="text-sm">S'abonner maintenant</span>
// //                         <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-200 ${isHovered ? 'translate-x-0.5' : ''}`} />
// //                       </>
// //                     )}
// //                   </button>
                  
// //                   <div className="flex items-center justify-center gap-1 text-xs text-next-gray pt-2">
// //                     <Send className="h-3 w-3" />
// //                     <span>Première newsletter immédiate</span>
// //                   </div>
                  
// //                   <p className="text-xs text-center text-next-gray pt-4 border-t border-next-gray/20">
// //                     En vous abonnant, vous acceptez de recevoir des communications de 
// //                     Next Plus Africa concernant nos services et opportunités.
// //                   </p>
// //                 </form>
// //               )}
              
// //               {/* Statistiques */}
// //               <div className="mt-6 pt-6 border-t border-next-gray/20">
// //                 <div className="flex items-center justify-around text-center">
// //                   <div>
// //                     <div className="text-lg font-bold text-black">40+</div>
// //                     <div className="text-xs text-next-gray">Agents déployés</div>
// //                   </div>
// //                   <div className="h-6 w-px bg-next-gray/30"></div>
// //                   <div>
// //                     <div className="text-lg font-bold text-black">3</div>
// //                     <div className="text-xs text-next-gray">Départements</div>
// //                   </div>
// //                   <div className="h-6 w-px bg-next-gray/30"></div>
// //                   <div>
// //                     <div className="text-lg font-bold text-black">100%</div>
// //                     <div className="text-xs text-next-gray">Satisfaction client</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
            
// //             {/* Bordures décoratives */}
// //             <div className="absolute -top-1 -left-1 h-full w-full border border-next-orange -z-10"></div>
// //             <div className="absolute -top-2 -left-2 h-full w-full border border-next-gray/30 -z-20"></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client'
// import { useState } from 'react';
// import { 
//   Mail, 
//   Check, 
//   ArrowRight,
//   Building,
//   Users,
//   Briefcase
// } from 'lucide-react';

// export default function NewsletterSubscribe() {
//   const [email, setEmail] = useState('');
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !email.includes('@')) return;
    
//     setIsLoading(true);
    
//     // Simulation d'un appel API
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     setIsLoading(false);
//     setIsSubscribed(true);
//     setEmail('');
    
//     // Réinitialiser après 4 secondes
//     setTimeout(() => {
//       setIsSubscribed(false);
//     }, 4000);
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
//       <div className="max-w-5xl w-full mx-auto">
//         <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
//           {/* Partie gauche - Texte minimaliste */}
//           <div className="lg:w-1/2 pt-8">
//             <div className="mb-8">
//               <div className="text-xs text-gray-500 tracking-wider mb-4">
//                 Newletter Wajenzi
//               </div>
              
//               <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
//                 Restez informé<span className="text-red-600">.</span>
//               </h1>
              
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Recevez nos actualités sur l'architecture, la décoration intérieure 
//                 et la construction. Soyez informé des nouveaux projets et opportunités.
//               </p>
//             </div>
            
//             <div className="space-y-6">
//               <div className="flex items-start gap-3">
//                 <div className="mt-0.5">
//                   <div className="w-1.5 h-1.5 bg-red-600"></div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-900 mb-1">Nouveaux projets</div>
//                   <p className="text-xs text-gray-500">Découvrez nos dernières réalisations</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="mt-0.5">
//                   <div className="w-1.5 h-1.5 bg-red-600"></div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-900 mb-1">Inspirations design</div>
//                   <p className="text-xs text-gray-500">Tendances et conseils d'aménagement</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="mt-0.5">
//                   <div className="w-1.5 h-1.5 bg-red-600"></div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-900 mb-1">Expertise technique</div>
//                   <p className="text-xs text-gray-500">Informations sur les techniques de construction</p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Partie droite - Formulaire minimaliste */}
//           <div className="lg:w-1/2">
//             <div className="relative">
//               <div className="bg-white border border-gray-200 p-6 md:p-8">
                
//                 {/* En-tête */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="text-xs text-gray-500">/01</div>
//                     <div className="h-px w-8 bg-red-600"></div>
//                   </div>
                  
//                   <h2 className="text-2xl font-light text-gray-900 mb-2">
//                     Newsletter Wajenzi
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     Recevez notre newsletter mensuelle
//                   </p>
//                 </div>
                
//                 {isSubscribed ? (
//                   <div className="text-center py-8">
//                     <div className="inline-flex items-center justify-center w-10 h-10 bg-red-600 mb-4">
//                       <Check className="h-4 w-4 text-white" />
//                     </div>
//                     <h3 className="text-base font-normal text-gray-900 mb-2">
//                       Bienvenue chez Wajenzi
//                     </h3>
//                     <p className="text-xs text-gray-500">
//                       Vous recevrez notre prochaine newsletter sur l'architecture et le design.
//                     </p>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <div className="relative">
//                         <input
//                           type="email"
//                           id="email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           placeholder="votre@email.com"
//                           className="w-full px-0 py-2.5 border-b border-gray-300 focus:border-red-600 focus:outline-none transition-colors text-sm"
//                           required
//                         />
//                         <div className="absolute bottom-0 left-0 w-0 h-px bg-red-600 transition-all duration-300 focus-within:w-full"></div>
//                       </div>
//                     </div>
                    
//                     <button
//                       type="submit"
//                       disabled={isLoading}
//                       className="group w-full flex items-center justify-between py-2.5 px-1 border-b border-gray-900 hover:border-red-600 transition-colors"
//                     >
//                       <span className="text-sm text-gray-900 group-hover:text-red-600 transition-colors">
//                         {isLoading ? 'Inscription...' : 'S\'abonner'}
//                       </span>
//                       <ArrowRight className="h-3.5 w-3.5 text-gray-900 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
//                     </button>
                    
//                     <p className="text-xs text-gray-400 pt-4">
//                       En vous abonnant, vous acceptez de recevoir la newsletter Wajenzi.
//                       Désabonnez-vous à tout moment.
//                     </p>
//                   </form>
//                 )}
                
//                 {/* Stats minimalistes */}
//                 <div className="mt-10 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-between text-xs">
//                     <div className="text-center">
//                       <div className="text-gray-900">50+</div>
//                       <div className="text-gray-400">Projets</div>
//                     </div>
//                     <div className="h-4 w-px bg-gray-200"></div>
//                     <div className="text-center">
//                       <div className="text-gray-900">3</div>
//                       <div className="text-gray-400">Services</div>
//                     </div>
//                     <div className="h-4 w-px bg-gray-200"></div>
//                     <div className="text-center">
//                       <div className="text-gray-900">100%</div>
//                       <div className="text-gray-400">Engagement</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Bordure décorative */}
//               <div className="absolute -top-0.5 -right-0.5 h-full w-full border border-red-600 -z-10"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'
import { useState } from 'react';
import { 
  Mail, 
  Check, 
  ArrowRight,
  Bell
} from 'lucide-react';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsLoading(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
    
    // Réinitialiser après 4 secondes
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Partie gauche - Texte minimaliste */}
          <div className="lg:w-1/2 pt-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 bg-red-600">
                  <Bell className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs text-gray-500 tracking-wider">
                  Newsletter Wajenzi
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Restez informé<span className="text-red-600">.</span>
              </h1>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Recevez nos actualités sur l'architecture, la décoration intérieure 
                et la construction. Soyez informé des nouveaux projets et opportunités.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className="w-1.5 h-1.5 bg-red-600"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-900 mb-1">Nouveaux projets</div>
                  <p className="text-xs text-gray-500">Découvrez nos dernières réalisations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className="w-1.5 h-1.5 bg-red-600"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-900 mb-1">Inspirations design</div>
                  <p className="text-xs text-gray-500">Tendances et conseils d'aménagement</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className="w-1.5 h-1.5 bg-red-600"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-900 mb-1">Expertise technique</div>
                  <p className="text-xs text-gray-500">Informations sur les techniques de construction</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partie droite - Formulaire minimaliste */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white border border-gray-200 p-6 md:p-8">
                
                {/* En-tête */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-xs text-gray-500">/01</div>
                    <div className="h-px w-8 bg-red-600"></div>
                  </div>
                  
                  <h2 className="text-2xl font-light text-gray-900 mb-2">
                    Newsletter Wajenzi
                  </h2>
                  <p className="text-sm text-gray-500">
                    Recevez notre newsletter mensuelle
                  </p>
                </div>
                
                {isSubscribed ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-red-600 mb-4">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-base font-normal text-gray-900 mb-2">
                      Bienvenue chez Wajenzi
                    </h3>
                    <p className="text-xs text-gray-500">
                      Vous recevrez notre prochaine newsletter sur l'architecture et le design.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.com"
                          className="w-full px-0 py-2.5 border-b border-gray-300 focus:border-red-600 focus:outline-none transition-colors text-sm"
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-red-600 transition-all duration-300 focus-within:w-full"></div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group w-full flex items-center justify-between py-2.5 px-1 border-b border-gray-900 hover:border-red-600 transition-colors"
                    >
                      <span className="text-sm text-gray-900 group-hover:text-red-600 transition-colors">
                        {isLoading ? 'Inscription...' : 'S\'abonner'}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-900 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                    </button>
                    
                    <p className="text-xs text-gray-400 pt-4">
                      En vous abonnant, vous acceptez de recevoir la newsletter Wajenzi.
                      Désabonnez-vous à tout moment.
                    </p>
                  </form>
                )}
                
                {/* Stats minimalistes */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-center">
                      <div className="text-gray-900">50+</div>
                      <div className="text-gray-400">Projets</div>
                    </div>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-gray-900">3</div>
                      <div className="text-gray-400">Services</div>
                    </div>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-gray-900">100%</div>
                      <div className="text-gray-400">Engagement</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bordure décorative */}
              <div className="absolute -top-0.5 -right-0.5 h-full w-full border border-red-600 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}