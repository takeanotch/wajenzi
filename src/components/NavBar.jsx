
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'
// import { ArrowBigDown, ArrowDown, ChevronDown, Menu, X, User, LogOut, Settings, Shield, Briefcase, Search, DollarSign } from 'lucide-react'
// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'
// import ReactCountryFlag from "react-country-flag"
// import { useSupabase } from '@/providers/supabase-provider'

// export default function Navbar() {
//   const navRef = useRef(null)
//   const mobileMenuRef = useRef(null)
//   const userDropdownRef = useRef(null)
//   const [open, setOpen] = useState(false)
//   const [languageOpen, setLanguageOpen] = useState(false)
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false)
//   const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false)
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'FR',
//     name: 'Français',
//     countryCode: 'FR'
//   })
//   const [avatarUrl, setAvatarUrl] = useState(null)
//   const [userProfile, setUserProfile] = useState(null)
  
//   const pathname = usePathname()
//   const router = useRouter()
//   const { user, isLoading, signOut, supabase } = useSupabase()

//   // Langues disponibles
//   const languages = [
//     { code: 'FR', name: 'Français', countryCode: 'FR' },
//     { code: 'EN', name: 'English', countryCode: 'GB' },
//     { code: 'ES', name: 'Español', countryCode: 'ES' },
//     { code: 'DE', name: 'Deutsch', countryCode: 'DE' },
//     { code: 'ZH', name: '中文', countryCode: 'CN' },
//   ]

//   // Récupérer le profil utilisateur et l'avatar
//   useEffect(() => {
//     if (user && supabase) {
//       fetchUserProfile()
//     } else {
//       // Reset si l'utilisateur se déconnecte
//       setUserProfile(null)
//       setAvatarUrl(null)
//     }
//   }, [user, supabase])

//   const fetchUserProfile = async () => {
//     try {
//       if (!supabase || !user) return
      
//       // Récupérer le profil
//       const { data: profile, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', user.id)
//         .single()

//       // Si aucun profil n'existe (erreur de type "no rows"), c'est normal pour un nouvel utilisateur
//       if (error && error.code !== 'PGRST116') {
//         console.error('Erreur lors de la récupération du profil:', error)
//         return
//       }

//       if (!profile) {
//         // Pas de profil encore - c'est normal pour un nouvel utilisateur
//         setUserProfile(null)
//         return
//       }

//       setUserProfile(profile)

//       // Si un avatar existe, récupérer l'URL signée
//       if (profile?.avatar_url) {
//         // Vérifier si c'est déjà une URL complète
//         if (profile.avatar_url.startsWith('http') || profile.avatar_url.startsWith('/')) {
//           setAvatarUrl(profile.avatar_url)
//         } else {
//           // C'est un chemin dans le storage, récupérer l'URL publique
//           try {
//             const { data } = supabase.storage
//               .from('avatars')
//               .getPublicUrl(profile.avatar_url)

//             if (data?.publicUrl) {
//               // Ajouter un timestamp pour éviter le cache
//               const url = `${data.publicUrl}?t=${new Date().getTime()}`
//               setAvatarUrl(url)
//             }
//           } catch (storageError) {
//             console.warn('Erreur lors de la récupération de l\'avatar:', storageError)
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Erreur lors du fetch du profil:', error)
//     }
//   }

//   // Animation entrée navbar - EXÉCUTÉ À CHAQUE CHANGEMENT DE ROUTE
//   useEffect(() => {
//     gsap.killTweensOf(navRef.current)
    
//     gsap.fromTo(
//       navRef.current,
//       {
//         y: -80,
//         opacity: 0
//       },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.8,
//         ease: 'power3.out',
//         clearProps: 'all'
//       }
//     )
    
//     setOpen(false)
//     setLanguageOpen(false)
//     setUserDropdownOpen(false)
//   }, [pathname])

//   // Animation menu mobile
//   useEffect(() => {
//     if (!mobileMenuRef.current) return

//     if (open) {
//       gsap.to(mobileMenuRef.current, {
//         clipPath: 'circle(150% at 90% 5%)',
//         duration: 0.8,
//         ease: 'power4.out'
//       })
//     } else {
//       gsap.to(mobileMenuRef.current, {
//         clipPath: 'circle(0% at 90% 5%)',
//         duration: 0.6,
//         ease: 'power4.in'
//       })
//     }
//   }, [open])

//   // Fermer les dropdowns si on clique ailleurs
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Fermer dropdown langue
//       if (languageOpen && !event.target.closest('.language-dropdown')) {
//         setLanguageOpen(false)
//       }
      
//       // Fermer dropdown utilisateur
//       if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
//         setUserDropdownOpen(false)
//       }
//     }
    
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [languageOpen, userDropdownOpen])

//   // Cleanup des animations GSAP
//   useEffect(() => {
//     return () => {
//       gsap.killTweensOf(navRef.current)
//       gsap.killTweensOf(mobileMenuRef.current)
//     }
//   }, [])

//   const handleLanguageSelect = (language) => {
//     setSelectedLanguage(language)
//     setLanguageOpen(false)
//     setMobileLanguageOpen(false)
//   }

//   // Fonction pour fermer le modal de langue mobile
//   const closeMobileLanguageModal = () => {
//     setMobileLanguageOpen(false)
//   }

//   const handleSignOut = async () => {
//     await signOut()
//     setUserDropdownOpen(false)
//     setOpen(false)
//     router.push('/')
//   }

//   // Obtenir l'initiale de l'utilisateur pour l'avatar
//   const getUserInitial = () => {
//     if (userProfile?.full_name) {
//       return userProfile.full_name.charAt(0).toUpperCase()
//     }
//     if (user?.email) {
//       return user.email.charAt(0).toUpperCase()
//     }
//     return '?'
//   }

//   // Obtenir le nom complet ou l'email
//   const getUserDisplayName = () => {
//     if (userProfile?.full_name) {
//       return userProfile.full_name
//     }
//     if (user?.email) {
//       return user.email.split('@')[0]
//     }
//     return 'Utilisateur'
//   }

//   // Fonction pour tronquer le texte
//   const truncateText = (text, maxLength) => {
//     if (!text) return ''
//     if (text.length <= maxLength) return text
//     return text.substring(0, maxLength) + '...'
//   }

//   // Obtenir l'icône en fonction du rôle
//   const getRoleIcon = () => {
//     if (!userProfile) return <User className="w-4 h-4" />
    
//     switch (userProfile.role) {
//       case 'admin':
//         return <Shield className="w-4 h-4" />
//       case 'employer':
//         return <Briefcase className="w-4 h-4" />
//       default:
//         return <User className="w-4 h-4" />
//     }
//   }

//   // Obtenir la couleur du rôle
//   const getRoleColor = () => {
//     if (!userProfile) return 'text-blue-600'
    
//     switch (userProfile.role) {
//       case 'admin':
//         return 'text-red-600'
//       case 'employer':
//         return 'text-green-600'
//       default:
//         return 'text-blue-600'
//     }
//   }

//   // Obtenir le libellé du rôle
//   const getRoleLabel = () => {
//     if (!userProfile) return 'Utilisateur'
    
//     switch (userProfile.role) {
//       case 'admin':
//         return 'Administrateur'
//       case 'employer':
//         return 'Recruteur'
//       case 'seeker':
//         return 'Chercheur'
//       default:
//         return 'Utilisateur'
//     }
//   }

//   // Liens en fonction du rôle
//   const getUserLinks = () => {
//     const baseLinks = [
//       { label: 'Tableau de bord', href: '/dashboard', icon: <Settings className="w-4 h-4" /> },
//       { label: 'Mon profil', href: '/complete-profile', icon: <User className="w-4 h-4" /> },
//     ]

//     // Si pas de profil, afficher le lien pour compléter le profil
//     if (!userProfile && user) {
//       baseLinks.unshift(
//         { label: 'Compléter mon profil', href: '/complete-profile', icon: <User className="w-4 h-4" /> }
//       )
//     } else {
//       // Ajouter des liens spécifiques au rôle
//       switch (userProfile?.role) {
//         case 'admin':
//           baseLinks.unshift(
//             { label: 'Administration', href: '/admin', icon: <Shield className="w-4 h-4" /> }
//           )
//           break
//         case 'employer':
//           baseLinks.unshift(
//             { label: 'Mes offres', href: '/employer/jobs', icon: <Briefcase className="w-4 h-4" /> }
//           )
//           break
//         case 'seeker':
//           baseLinks.unshift(
//             { label: 'Rechercher', href: '/jobs', icon: <Search className="w-4 h-4" /> }
//           )
//           break
//         default:
//           baseLinks.unshift(
//             { label: 'Compléter mon profil', href: '/complete-profile', icon: <User className="w-4 h-4" /> }
//           )
//       }
//     }

//     return baseLinks
//   }

//   // Avatar avec fallback aux initiales
//   const renderAvatar = (size = 'w-9 h-9', fontSize = 'text-sm') => {
//     if (avatarUrl) {
//       return (
//         <div 
//           className={`${size} rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100`}
//           style={{
//             backgroundImage: `url(${avatarUrl})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat'
//           }}
//         />
//       )
//     }

//     return (
//       <div className={`${size} rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold ${fontSize}`}>
//         {getUserInitial()}
//       </div>
//     )
//   }

//   // Avatar mobile plus grand
//   const renderMobileAvatar = () => {
//     if (avatarUrl) {
//       return (
//         <div 
//           className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100"
//           style={{
//             backgroundImage: `url(${avatarUrl})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat'
//           }}
//         />
//       )
//     }

//     return (
//       <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
//         {getUserInitial()}
//       </div>
//     )
//   }

//   // Avatar mobile petit (pour le bouton)
//   const renderMobileSmallAvatar = () => {
//     if (avatarUrl) {
//       return (
//         <div 
//           className="w-8 h-8 rounded-full overflow-hidden border border-white shadow-sm bg-gray-100"
//           style={{
//             backgroundImage: `url(${avatarUrl})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat'
//           }}
//         />
//       )
//     }

//     return (
//       <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
//         {getUserInitial()}
//       </div>
//     )
//   }

//   // Vérifier si l'utilisateur doit compléter son profil
//   const shouldCompleteProfile = () => {
//     return user && !userProfile
//   }

//   return (
//     <>
//       {/* NAVBAR */}
//       <header
//         ref={navRef}
//         className="fixed top-0 left-0 w-full z-50 py-1 backdrop-blur-  border-black/5"
//       >
//         {/* BRAND CENTER */}
//         <nav className="max-w-7xl lg:max-w-6xl mx-auto px-6 flex items-center justify-between">
//           <Link href="/" className="flex items-center gap-2 font-black hover:opacity-80 transition-opacity">
//             <img src='/logo.png' className='w-12 ' alt="Stone Consulting Logo"/>
//           </Link>
          
//           {/* LEFT LINKS */}
//           <div className="hidden md:flex bg-white px-6 py-3 rounded-xl border gap-8 text-sm font-medium">
//             <Link href="/blogs" className="relative group">
//               Blogs
//               <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all group-hover:w-full"></span>
//             </Link>
//             <Link href="/about" className="relative group">
//               À propos
//               <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all group-hover:w-full"></span>
//             </Link>
//             <Link href="/jobs" className="relative group">
//               Offres d'emploi
//               <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all group-hover:w-full"></span>
//             </Link>
//           </div>

//           {/* RIGHT SECTION - AUTH + LANGUAGE */}
//           <div className="flex items-center gap-4">
//             {/* ÉTAT DE CHARGEMENT */}
//             {isLoading ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
//               </div>
//             ) : user ? (
//               /* DROPDOWN UTILISATEUR CONNECTÉ (DESKTOP) */
//               <div className="hidden md:block relative user-dropdown">
//                 <button
//                   onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                   className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
//                 >
//                   {/* AVATAR */}
//                   <div className="relative">
//                     {renderAvatar()}
//                     <div className={`absolute -bottom-1 -right-1 bg-white rounded-full p-1 ${getRoleColor()}`}>
//                       {getRoleIcon()}
//                     </div>
//                     {/* Badge si le profil doit être complété */}
//                     {shouldCompleteProfile() && (
//                       <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse">
//                         !
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* NOM/EMAIL */}
//                   <div className="text-left">
//                     <p className="text-sm font-medium truncate max-w-[120px]">
//                       {getUserDisplayName()}
//                       {shouldCompleteProfile() && (
//                         <span className="ml-2 text-xs text-red-600 font-normal">(Profil à compléter)</span>
//                       )}
//                     </p>
//                     <p className="text-xs text-gray-500 truncate max-w-[120px]">
//                       {user?.email || ''}
//                     </p>
//                   </div>
                  
//                   <ChevronDown className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {userDropdownOpen && (
//                   <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 overflow-hidden">
//                     {/* HEADER */}
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <div className="flex items-center gap-3">
//                         <div className="relative">
//                           {renderAvatar('w-10 h-10', 'text-base')}
//                           {shouldCompleteProfile() && (
//                             <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-pulse">
//                               !
//                             </div>
//                           )}
//                         </div>
//                         <div>
//                           <p className="font-medium">
//                             {getUserDisplayName()}
//                             {shouldCompleteProfile() && (
//                               <span className="ml-2 text-xs text-red-600 font-normal">(à compléter)</span>
//                             )}
//                           </p>
//                           <div className="flex items-center gap-1">
//                             <span className={`text-xs font-medium ${getRoleColor()}`}>
//                               {getRoleLabel()}
//                             </span>
//                             <span className="text-xs text-gray-500">•</span>
//                             <span className="text-xs text-gray-500 truncate max-w-[140px]">
//                               {user?.email}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* MENU LINKS */}
//                     <div className="py-1">
//                       {getUserLinks().map((link, index) => (
//                         <Link
//                           key={index}
//                           href={link.href}
//                           onClick={() => setUserDropdownOpen(false)}
//                           className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//                         >
//                           <span className="text-gray-600">{link.icon}</span>
//                           <span className="text-sm font-medium">{link.label}</span>
//                           {link.label === 'Compléter mon profil' && (
//                             <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full animate-pulse">
//                               Nouveau
//                             </span>
//                           )}
//                         </Link>
//                       ))}
//                     </div>

//                     {/* SEPARATOR */}
//                     <div className="border-t border-gray-100 my-1"></div>

//                     {/* LOGOUT */}
//                     <button
//                       onClick={handleSignOut}
//                       className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 transition-colors"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       <span className="text-sm font-medium">Déconnexion</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               /* BOUTONS AUTH NON CONNECTÉ (DESKTOP) */
//               <div className="hidden md:flex items-center gap-3">
               
//                 <Link href="/auth/signup">
//                   <button className="px-4 py-2  flex items-center bg-black text-gray-200 hover:bg-black/90 transition-colors gap-2 text-sm font-medium">
//                    <span>
//                     Voir nos plans 
//                     </span> 
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
// </svg>

//                   </button>
//                 </Link>
//               </div>
//             )}

//             {/* LANGUAGE DROPDOWN (DESKTOP) */}
//             <div className="hidden md:block relative language-dropdown">
//               <button
//                 onClick={() => setLanguageOpen(!languageOpen)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <ReactCountryFlag
//                   countryCode={selectedLanguage.countryCode}
//                   svg
//                   style={{
//                     width: '20px',
//                     height: '20px',
//                   }}
//                   title={selectedLanguage.code}
//                 />
//                 <span className="text-sm font-medium">{selectedLanguage.code}</span>
//                 <ChevronDown className={`w-4 h-4 transition-transform ${languageOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {languageOpen && (
//                 <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                   {languages.map((language) => (
//                     <button
//                       key={language.code}
//                       onClick={() => handleLanguageSelect(language)}
//                       className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
//                         selectedLanguage.code === language.code ? 'bg-gray-50' : ''
//                       }`}
//                     >
//                       <ReactCountryFlag
//                         countryCode={language.countryCode}
//                         svg
//                         style={{
//                           width: '20px',
//                           height: '20px',
//                         }}
//                         title={language.code}
//                       />
//                       <span className="text-sm font-medium">{language.name}</span>
//                       <span className="text-xs text-gray-500 ml-auto">{language.code}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* MOBILE BUTTON - MODIFIÉ POUR AVOIR DEUX BARRES ET L'AVATAR */}
//             <div className="md:hidden flex items-center gap-3">
//               {/* NOM ET EMAIL DE L'UTILISATEUR EN MOBILE */}
//               {user && !isLoading && (
//                 <div className="flex flex-col items-end max-w-[120px]">
//                   <p className="text-sm font-medium truncate w-full text-right">
//                     {truncateText(getUserDisplayName(), 12)}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate w-full text-right">
//                     {truncateText(user?.email || '', 15)}
//                   </p>
//                 </div>
//               )}
              
//               {/* AVATAR MOBILE SI CONNECTÉ */}
//               {user && !isLoading && (
//                 <div className="relative">
//                   {renderMobileSmallAvatar()}
//                   {shouldCompleteProfile() && (
//                     <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] animate-pulse">
//                       !
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {/* BOUTON HAMBURGER À DEUX BARRES */}
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="relative bg-white/20 p-7 rounded-full backdrop-blur-3xl z-50  flex flex-col justify-center items-center"
//               >
//                 {/* Barre du haut */}
//                 <span className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
                
//                 {/* Barre du bas */}
//                 <span className={`absolute w-6 h-0.5 bg-black transition-all duration-300 ${open ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
//               </button>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* MOBILE MENU */}
//       <div
//         ref={mobileMenuRef}
//         className="fixed w-full h-full inset-0 bg-white text-black z-40 flex flex-col pt-20 pb-10 px-6"
//         style={{ clipPath: 'circle(0% at 90% 5%)' }}
//       >
//         {/* MENU LINKS */}
//         <div className="space-y- mb-8">
          
          
//           <Link href="/blogs" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium  rounded-lg px-4 transition-colors">
//             Blogs
//           </Link>
//           <Link href="/services" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium  rounded-lg px-4 transition-colors">
//             Contact
//           </Link>
//           <Link href="/services" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium  rounded-lg px-4 transition-colors">
//             Services
//           </Link>
//           <Link href="/about" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium  rounded-lg px-4 transition-colors">
//             À propos
//           </Link>
        
//         </div>

//         {/* SECTION UTILISATEUR MOBILE */}
//         {isLoading ? (
//           <div className="py-4">
//             <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mx-auto"></div>
//           </div>
//         ) : user ? (
//           <>
//             {/* INFOS UTILISATEUR MOBILE */}
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <div className="text-center mb-4">
//                 <p className="font-semibold text-lg truncate">{truncateText(getUserDisplayName(), 20)}</p>
//                 <p className="text-sm text-gray-500 truncate mt-1">
//                   {truncateText(user?.email, 25)}
//                 </p>
//                 <div className="flex items-center justify-center gap-2 mt-2">
                  
//                   {shouldCompleteProfile() && (
//                     <>
//                       <span className="text-gray-400">•</span>
//                       <span className="text-sm text-red-600 font-medium">Profil à compléter</span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* LIENS UTILISATEUR MOBILE EN GRID 2 COLONNES */}
//               <div className="grid grid-cols-2 gap-3">
//                 {getUserLinks().map((link, index) => (
//                   <Link
//                     key={index}
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                     className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-white transition-colors relative"
//                   >
//                     <div className="text-gray-700">
//                       {link.icon}
//                     </div>
//                     <span className="text-sm font-medium text-center">
//                       {link.label === 'Compléter mon profil' ? 'Compléter profil' : 
//                        link.label === 'Tableau de bord' ? 'Dashboard' : 
//                        link.label === 'Mon profil' ? 'Profil' : link.label}
//                     </span>
//                     {link.label === 'Compléter mon profil' && (
//                       <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
//                         !
//                       </span>
//                     )}
//                   </Link>
//                 ))}
//                  {/* MOBILE LANGUAGE SELECTOR */}
//         <div className="mt-auto">
//           <button
//             onClick={() => setMobileLanguageOpen(true)}
//             className="flex items-center justify-center gap-3 w-full p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//           >
//             <ReactCountryFlag
//               countryCode={selectedLanguage.countryCode}
//               svg
//               style={{
//                 width: '20px',
//                 height: '20px',
//               }}
//               title={selectedLanguage.code}
//             />
//             <span className="font-medium">{selectedLanguage.name}</span>
//             <ChevronDown className="w-5 h-5 ml-auto" />
//           </button>
//         </div>
//               </div>

//               {/* BOUTON DÉCONNEXION */}
//               <button
//                 onClick={handleSignOut}
//                 className="flex items-center justify-center gap-2 w-full mt-4 p-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span className="font-medium">Déconnexion</span>
//               </button>
//             </div>
//           </>
//         ) : (
//           /* BOUTONS AUTH NON CONNECTÉ MOBILE EN GRID 2 COLONNES */
//           <div className="mb-6">
//             <div className="grid grid-cols-2 gap-3">
//               <Link href="/auth/login" onClick={() => setOpen(false)}>
//                 <button className="w-full p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium">
//                   Connexion
//                 </button>
//               </Link>
//               <Link href="/auth/signup" onClick={() => setOpen(false)}>
//                 <button className="w-full p-3 rounded-lg bg-black text-white hover:bg-black/90 transition-colors font-medium">
//                   S'inscrire
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}

       
//       </div>

//       {/* MODAL LANGUE MOBILE */}
//       {mobileLanguageOpen && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
//             {/* MODAL HEADER */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h3 className="text-lg font-semibold">Sélectionner la langue</h3>
//               <button
//                 onClick={closeMobileLanguageModal}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* LANGUAGES LIST */}
//             <div className="max-h-96 overflow-y-auto">
//               {languages.map((language) => (
//                 <button
//                   key={language.code}
//                   onClick={() => handleLanguageSelect(language)}
//                   className={`w-full flex items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
//                     selectedLanguage.code === language.code ? 'bg-blue-50' : ''
//                   }`}
//                 >
//                   <ReactCountryFlag
//                     countryCode={language.countryCode}
//                     svg
//                     style={{
//                       width: '24px',
//                       height: '24px',
//                     }}
//                     title={language.code}
//                   />
//                   <div className="flex flex-col items-start">
//                     <span className="font-medium text-left">{language.name}</span>
//                     <span className="text-sm text-gray-500">{language.code}</span>
//                   </div>
//                   {selectedLanguage.code === language.code && (
//                     <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* MODAL FOOTER */}
//             <div className="p-6 border-t border-gray-200">
//               <button
//                 onClick={closeMobileLanguageModal}
//                 className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-black/90 transition-colors"
//               >
//                 Confirmer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ReactCountryFlag from "react-country-flag"

export default function Navbar() {
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'FR',
    name: 'Français',
    countryCode: 'FR'
  })
  
  const pathname = usePathname()

  // Langues disponibles
  const languages = [
    { code: 'FR', name: 'Français', countryCode: 'FR' },
    { code: 'EN', name: 'English', countryCode: 'GB' },
    { code: 'ES', name: 'Español', countryCode: 'ES' },
    { code: 'DE', name: 'Deutsch', countryCode: 'DE' },
    { code: 'ZH', name: '中文', countryCode: 'CN' },
  ]

  // Animation entrée navbar - EXÉCUTÉ À CHAQUE CHANGEMENT DE ROUTE
  useEffect(() => {
    gsap.killTweensOf(navRef.current)
    
    gsap.fromTo(
      navRef.current,
      {
        y: -80,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all'
      }
    )
    
    setOpen(false)
    setLanguageOpen(false)
  }, [pathname])

  // Animation menu mobile
  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (open) {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(150% at 90% 5%)',
        duration: 0.8,
        ease: 'power4.out'
      })
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(0% at 90% 5%)',
        duration: 0.6,
        ease: 'power4.in'
      })
    }
  }, [open])

  // Fermer les dropdowns si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fermer dropdown langue
      if (languageOpen && !event.target.closest('.language-dropdown')) {
        setLanguageOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [languageOpen])

  // Cleanup des animations GSAP
  useEffect(() => {
    return () => {
      gsap.killTweensOf(navRef.current)
      gsap.killTweensOf(mobileMenuRef.current)
    }
  }, [])

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setLanguageOpen(false)
  }

  return (
    <>
      {/* NAVBAR */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 py-1 backdrop-blur- border-black/5"
      >
        {/* BRAND CENTER */}
        <nav className="max-w-7xl lg:max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black hover:opacity-80 transition-opacity">
            <img src='/logo.png' className='w-12 ' alt="Stone Consulting Logo"/>
          </Link>
          
          {/* LEFT LINKS */}
          <div className="hidden md:flex bg-white px-6 py-3 rounded-xl border gap-8 text-sm font-medium">
            <Link href="/blogs" className="relative group">
              Nav 0
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="relative group">
              À propos
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/jobs" className="relative group">
              Nav 2
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* RIGHT SECTION - BOUTON PLANS + LANGUAGE */}
          <div className="flex items-center gap-4">
            {/* BOUTON "VOIR NOS PLANS" */}
            <Link href="/plan" className="hidden md:block">
              <button className="px-4 py-2 flex items-center bg-black text-gray-200 hover:bg-black/90 transition-colors gap-2 text-sm font-medium">
                <span>Voir nos plans</span> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                </svg>
              </button>
            </Link>

            {/* LANGUAGE DROPDOWN (DESKTOP) */}
            <div className="hidden md:block relative language-dropdown">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ReactCountryFlag
                  countryCode={selectedLanguage.countryCode}
                  svg
                  style={{
                    width: '20px',
                    height: '20px',
                  }}
                  title={selectedLanguage.code}
                />
                <span className="text-sm font-medium">{selectedLanguage.code}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${languageOpen ? 'rotate-180' : ''}`} />
              </button>

              {languageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedLanguage.code === language.code ? 'bg-gray-50' : ''
                      }`}
                    >
                      <ReactCountryFlag
                        countryCode={language.countryCode}
                        svg
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                        title={language.code}
                      />
                      <span className="text-sm font-medium">{language.name}</span>
                      <span className="text-xs text-gray-500 ml-auto">{language.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE BUTTON - HAMBURGER */}
            <div className="md:hidden flex items-center gap-3">
              {/* BOUTON HAMBURGER À DEUX BARRES */}
              <button
                onClick={() => setOpen(!open)}
                className="relative bg-white p-6  backdrop-blur-3xl z-50 flex flex-col justify-center items-center"
              >
                {/* Barre du haut */}
                <span className={`absolute w-5 h-0.5 bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
                
                {/* Barre du bas */}
                <span className={`absolute w-5 h-0.5 bg-black transition-all duration-300 ${open ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className="fixed w-full h-full inset-0 bg-white text-black z-40 flex flex-col pt-20 pb-10 px-6"
        style={{ clipPath: 'circle(0% at 90% 5%)' }}
      >
        {/* MENU LINKS */}
        <div className="space-y-2 mb-8">
          <Link href="/blogs" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium rounded-lg px-4 transition-colors">
            Blogs
          </Link>
          <Link href="/services" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium rounded-lg px-4 transition-colors">
            Contact
          </Link>
          <Link href="/services" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium rounded-lg px-4 transition-colors">
            Services
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium rounded-lg px-4 transition-colors">
            À propos
          </Link>
          <Link href="/jobs" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium rounded-lg px-4 transition-colors">
            Offres d'emploi
          </Link>
          <Link href="/pricing" onClick={() => setOpen(false)} className="block py-2 text-lg font-medium rounded-lg px-4 transition-colors">
            Nos plans
          </Link>
        </div>

        {/* BOUTON "VOIR NOS PLANS" MOBILE */}
        <div className="mt-6">
          <Link href="/pricing" onClick={() => setOpen(false)}>
            <button className="w-full p-3 rounded-lg bg-black text-white hover:bg-black/90 transition-colors font-medium flex items-center justify-center gap-2">
              <span>Voir nos plans</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
              </svg>
            </button>
          </Link>
        </div>

        {/* LANGUAGE SELECTOR MOBILE */}
        <div className="mt-auto">
          <button
            onClick={() => {
              // Ici vous pouvez gérer le changement de langue mobile
              // Ou ouvrir un modal comme dans votre code original
            }}
            className="flex items-center justify-center gap-3 w-full p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ReactCountryFlag
              countryCode={selectedLanguage.countryCode}
              svg
              style={{
                width: '20px',
                height: '20px',
              }}
              title={selectedLanguage.code}
            />
            <span className="font-medium">{selectedLanguage.name}</span>
            <ChevronDown className="w-5 h-5 ml-auto" />
          </button>
        </div>
      </div>
    </>
  )
}