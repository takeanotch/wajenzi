// // app/complete-profile/page.tsx
// import { getUserProfile } from '@/lib/auth-utils'
// import CompleteProfileAdmin from '@/components/complete-profile/admin'
// import CompleteProfileEmployer from '@/components/complete-profile/employer'
// import CompleteProfileSeeker from '@/components/complete-profile/seeker'

// export default async function CompleteProfilePage() {
//   const profile = await getUserProfile()

//   if (!profile) {
//     return null // ou un composant de chargement/erreur si besoin
//   }

//   // Afficher le composant approprié selon le rôle
//   return (
//     <div>
//       {profile.role === 'admin' && <CompleteProfileAdmin />}
//       {profile.role === 'employer' && <CompleteProfileEmployer />}
//       {profile.role === 'seeker' && <CompleteProfileSeeker />}
//     </div>
//   )
// }

'use client'

import { useProfileCompletion } from '@/hooks/useProfileCompletion'
import CompleteProfileAdmin from '@/components/complete-profile/admin'
import CompleteProfileEmployer from '@/components/complete-profile/employer'
import CompleteProfileSeeker from '@/components/complete-profile/seeker'

export default function CompleteProfilePage() {
  const { isLoading, profile } = useProfileCompletion()

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }


  // Déterminer le rôle - utiliser 'seeker' par défaut si non défini
  const userRole = profile.role || 'seeker'

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'admin' && <CompleteProfileAdmin />}
      {userRole === 'employer' && <CompleteProfileEmployer />}
      {userRole === 'seeker' && <CompleteProfileSeeker />}
    </div>
  )
}