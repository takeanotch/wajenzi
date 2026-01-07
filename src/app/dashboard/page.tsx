
// import { redirect } from 'next/navigation'
// import { getUserProfile } from '@/lib/auth-utils'
// import { createClient } from '@/lib/supabase/server' // Import du client serveur
// import DashboardAdmin from '@/components/dashboard/admin'
// import DashboardEmployer from '@/components/dashboard/employer'
// import SeekerProfilePage from '@/components/dashboard/seeker'

// export default async function DashboardPage() {
//   const supabase = await createClient() // AJOUT DE await ICI
//   const profile = await getUserProfile()

//   if (!profile) {
//     redirect('/auth/login')
//   }

//   // Vérifier si les informations de base sont complètes
//   // Pour tous les rôles: full_name et phone sont requis
//   if (!profile.full_name || !profile.phone) {
//     redirect('/complete-profile')
//   }

//   // Vérifications supplémentaires selon le rôle
//   if (profile.role === 'employer') {
//     // Pour les employeurs, vérifier si ils ont complété leurs infos dans la table employers
//     const { data: employerData } = await supabase
//       .from('employers')
//       .select('company_name')
//       .eq('profile_id', profile.id)
//       .single()
    
//     if (!employerData?.company_name) {
//       redirect('/complete-profile')
//     }
//   }

//   if (profile.role === 'seeker') {
//     // Pour les chercheurs d'emploi, vérifier des champs essentiels
//     const { data: seekerData } = await supabase
//       .from('seekers')
//       .select('headline, location, sectors')
//       .eq('profile_id', profile.id)
//       .single()
    
//     // Vous pouvez ajuster les champs requis selon vos besoins
//     if (!seekerData?.headline || !seekerData?.location || !seekerData?.sectors) {
//       redirect('/complete-profile')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER FIXED */}
//       <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">
//                 Tableau de bord
//               </h1>
//               <p className="text-sm text-gray-500">
//                 {profile.role === 'admin' ? 'Administration' : 
//                  profile.role === 'employer' ? 'Espace Recruteur' : 
//                  'Espace Candidat'}
//               </p>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium">{profile.full_name}</p>
//                 <p className="text-xs text-gray-500">{profile.email}</p>
//                 {profile.phone && (
//                   <p className="text-xs text-gray-500">{profile.phone}</p>
//                 )}
//               </div>
//               <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                 profile.role === 'admin' ? 'bg-purple-100 text-purple-700' :
//                 profile.role === 'employer' ? 'bg-blue-100 text-blue-700' :
//                 'bg-green-100 text-green-700'
//               }`}>
//                 <span className="font-semibold">
//                   {profile.role.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* CONTENT BASED ON ROLE */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {profile.role === 'admin' && <DashboardAdmin profile={profile} />}
//         {profile.role === 'employer' && <DashboardEmployer profile={profile} />}
//         {profile.role === 'seeker' && <SeekerProfilePage profile={profile} />}
//       </main>
//     </div>
//   )
// }


import { redirect } from 'next/navigation'
import { getUserProfile } from '@/lib/auth-utils'
import { createClient } from '@/lib/supabase/server'
import DashboardEmployer from '@/components/dashboard/employer'
import SeekerProfilePage from '@/components/dashboard/seeker'
import DashboardAdmin from '@/components/dashboard/admin'
export default async function DashboardPage() {
  const supabase = await createClient()
  const profile = await getUserProfile()

  if (!profile) {
    redirect('/auth/login')
  }

  // Vérifier si les informations de base sont complètes
  if (!profile.full_name || !profile.phone) {
    redirect('/complete-profile')
  }

  // Initialiser seekerData
  let seekerData = null
  let employerData = null

  // Vérifications supplémentaires selon le rôle
  if (profile.role === 'employer') {
    const { data: employer } = await supabase
      .from('employers')
      .select('*')
      .eq('profile_id', profile.id)
      .single()
    
    employerData = employer
    
    if (!employerData?.company_name) {
      redirect('/complete-profile')
    }
  }

  if (profile.role === 'seeker') {
    const { data: seeker } = await supabase
      .from('seekers')
      .select('*')
      .eq('profile_id', profile.id)
      .single()
    
    seekerData = seeker
    
    // Vérification des champs requis pour le seeker
    if (!seekerData?.headline || !seekerData?.location || !seekerData?.sectors) {
      redirect('/complete-profile')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER FIXED */}
      {/* <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Tableau de bord
              </h1>
              <p className="text-sm text-gray-500">
                {profile.role === 'admin' ? 'Administration' : 
                 profile.role === 'employer' ? 'Espace Recruteur' : 
                 'Espace Candidat'}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{profile.full_name}</p>
                <p className="text-xs text-gray-500">{profile.email}</p>
                {profile.phone && (
                  <p className="text-xs text-gray-500">{profile.phone}</p>
                )}
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                profile.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                profile.role === 'employer' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                <span className="font-semibold">
                  {profile.role.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* CONTENT BASED ON ROLE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {profile.role === 'admin' && <DashboardAdmin />}
        {profile.role === 'employer' && <DashboardEmployer profile={profile}  />}
        {profile.role === 'seeker' && <SeekerProfilePage/>}
      </main>
    </div>
  )
}