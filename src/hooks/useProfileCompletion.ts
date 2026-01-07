
// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'

// export function useProfileCompletion() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [user, setUser] = useState<any>(null)
//   const [profile, setProfile] = useState<any>(null)
//   const router = useRouter()
//   const supabase = createClient()

//   useEffect(() => {
//     const checkAuthAndProfile = async () => {
//       try {
//         setIsLoading(true)
        
//         // 1. Vérifier si l'utilisateur est connecté
//         const { data: { user }, error: userError } = await supabase.auth.getUser()
        
//         if (userError || !user) {
//           console.log('Aucun utilisateur connecté, redirection vers login')
//           router.push('/auth/login')
//           return
//         }

//         console.log('Utilisateur trouvé:', user.id)
//         setUser(user)

//         // 2. Récupérer le profil de base
//         const { data: profile, error: profileError } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', user.id)
//           .single()

//         if (profileError) {
//           console.log('Aucun profil existant, création d\'un profil minimal')
          
//           // Créer un profil minimal
//           const minimalProfile = {
//             id: user.id,
//             email: user.email,
//             role: 'seeker',
//             full_name: '',
//             phone: '',
//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString()
//           }
          
//           setProfile(minimalProfile)
//           return
//         }

//         console.log('Profil trouvé:', profile)

//         // 3. Si pas de rôle, définir un rôle par défaut
//         if (!profile.role) {
//           console.log('Aucun rôle défini, attribution du rôle "seeker" par défaut')
//           const updatedProfile = { 
//             ...profile, 
//             role: 'seeker',
//             updated_at: new Date().toISOString()
//           }
//           setProfile(updatedProfile)
//         } else {
//           setProfile(profile)
//         }

//         // 4. Vérifier si le profil est déjà complet
//         if (profile) {
//           const isComplete = profile.full_name && 
//             profile.phone && 
//             (profile.role === 'seeker' ? 
//               (profile.date_of_birth && profile.address) : 
//               true)

//           if (isComplete) {
//             console.log('Profil déjà complet, redirection vers dashboard')
//             router.push('/dashboard')
//             return
//           }
//         }

//       } catch (error: any) {
//         console.error('Erreur de vérification:', error)
//         // En cas d'erreur, rediriger vers login
//         router.push('/auth/login')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     checkAuthAndProfile()
//   }, [router, supabase])

//   return { isLoading, user, profile }
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function useProfileCompletion() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      try {
        setIsLoading(true)
        
        // 1. Vérifier si l'utilisateur est connecté
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          console.log('Aucun utilisateur connecté, redirection vers login')
          router.push('/auth/login')
          return
        }

        console.log('Utilisateur trouvé:', user.id)
        setUser(user)

        // 2. Récupérer le profil de base
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.log('Aucun profil existant, création d\'un profil minimal')
          
          // Créer un profil minimal
          const minimalProfile = {
            id: user.id,
            email: user.email,
            role: 'seeker', // Par défaut
            full_name: '',
            phone: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          
          setProfile(minimalProfile)
          setIsProfileComplete(false) // Pas complet
          return
        }

        console.log('Profil trouvé:', profile)

        // 3. Si pas de rôle, définir un rôle par défaut
        if (!profile.role) {
          console.log('Aucun rôle défini, attribution du rôle "seeker" par défaut')
          const updatedProfile = { 
            ...profile, 
            role: 'seeker',
            updated_at: new Date().toISOString()
          }
          setProfile(updatedProfile)
          setIsProfileComplete(false) // Pas complet car rôle vient d'être ajouté
        } else {
          setProfile(profile)
          
          // 4. Vérifier si le profil est complet (mais ne pas rediriger automatiquement)
          const checkCompleteness = async () => {
            if (profile.role === 'seeker') {
              // Pour les seekers: vérifier la table seekers
              const { data: seekerData } = await supabase
                .from('seekers')
                .select('*')
                .eq('profile_id', user.id)
                .single()
              
              const isComplete = profile.full_name && 
                profile.phone &&
                seekerData?.headline &&
                seekerData?.location
              
              setIsProfileComplete(!!isComplete)
            } else if (profile.role === 'employer') {
              // Pour les employers: vérifier la table employers
              const { data: employerData } = await supabase
                .from('employers')
                .select('*')
                .eq('profile_id', user.id)
                .single()
              
              const isComplete = profile.full_name && 
                profile.phone &&
                employerData?.company_name
              
              setIsProfileComplete(!!isComplete)
            } else {
              // Pour admin ou autres rôles
              setIsProfileComplete(!!(profile.full_name && profile.phone))
            }
          }
          
          await checkCompleteness()
        }

      } catch (error: any) {
        console.error('Erreur de vérification:', error)
        // En cas d'erreur, rediriger vers login
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndProfile()
  }, [router, supabase])

  return { 
    isLoading, 
    user, 
    profile, 
    isProfileComplete,
    // Fonction pour forcer la redirection si besoin
    redirectToDashboard: () => router.push('/dashboard'),
    // Fonction pour manuellement marquer comme complet
    markAsComplete: () => setIsProfileComplete(true)
  }
}