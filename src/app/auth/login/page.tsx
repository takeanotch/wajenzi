

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
// import Link from 'next/link'
// import { FcGoogle } from 'react-icons/fc'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [googleLoading, setGoogleLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
  
//   const router = useRouter()
//   const supabase = createClient()

//   // Vérifier si l'utilisateur est déjà connecté
//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (user) {
//         router.push('/dashboard')
//       }
//     }
    
//     checkUser()
//   }, [router, supabase])

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)

//     try {
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       })

//       if (error) throw error

//       router.push('/dashboard')
//       router.refresh()
//     } catch (error: any) {
//       setError(error.message || 'Identifiants incorrects')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleGoogleLogin = async () => {
//     setGoogleLoading(true)
//     setError(null)

//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/auth/callback`,
//           queryParams: {
//             access_type: 'offline',
//             prompt: 'consent',
//           }
//         }
//       })

//       if (error) throw error
//     } catch (error: any) {
//       setError(error.message || 'Erreur lors de la connexion avec Google')
//       setGoogleLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-sm mx-auto">
//        <Link href="/" className="flex w-max mt-5 mx-auto items-center  font-black hover:opacity-80 transition-opacity">
//                   <img src='/pnz.png' className='invert w-14 h-14' alt="Stone Consulting Logo"/>
//                   <p>
//                   </p>
//                 </Link>
//       <div className="mb-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h2>
//         <p className="text-sm text-gray-500">Accédez à votre compte</p>
//       </div>
      
//       {/* Bouton Google */}
//       <button
//         onClick={handleGoogleLogin}
//         disabled={googleLoading}
//         className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
//       >
//         {googleLoading ? (
//           <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
//         ) : (
//           <FcGoogle className="w-5 h-5" />
//         )}
//         <span className="text-sm font-medium">
//           {googleLoading ? 'Connexion...' : 'Continuer avec Google'}
//         </span>
//       </button>

//       {/* Séparateur */}
//       <div className="relative mb-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-white text-gray-500">Ou</span>
//         </div>
//       </div>

//       {/* Formulaire email/password */}
//       <form onSubmit={handleLogin} className="space-y-4">
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
//             required
//             disabled={loading}
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Mot de passe
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
//             required
//             disabled={loading}
//           />
//         </div>

//         {error && (
//           <div className="p-3 border border-red-300 bg-red-50 rounded">
//             <p className="text-xs text-red-700">{error}</p>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gray-900 text-white p-3 font-medium rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
//         >
//           {loading ? (
//             <div className="flex items-center justify-center gap-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               Connexion...
//             </div>
//           ) : (
//             'Se connecter'
//           )}
//         </button>
//       </form>

//       <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
//         <div className="text-center">
//           <Link 
//             href="/forgot-password" 
//             className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
//           >
//             Mot de passe oublié ?
//           </Link>
//         </div>
//         <div className="text-center">
//           <p className="text-xs text-gray-600">
//             Pas de compte ?{' '}
//             <Link 
//               href="/signup" 
//               className="text-gray-900 font-medium hover:text-gray-700 hover:underline"
//             >
//               S'inscrire
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  // Vérifier si l'utilisateur est déjà connecté et a complété son profil
  useEffect(() => {
    const checkUserAndProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Récupérer le profil de l'utilisateur
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, phone')
            .eq('id', user.id)
            .single()

          // Si pas de profil ou infos manquantes, rediriger vers complete-profile
          if (!profile || !profile.full_name || !profile.phone) {
            router.push('/complete-profile')
          } else {
            // Sinon rediriger vers le dashboard
            router.push('/dashboard')
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification:', error)
      }
    }
    
    checkUserAndProfile()
  }, [router, supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      // Après connexion réussie, vérifier le profil
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, phone')
          .eq('id', user.id)
          .single()

        // Rediriger selon l'état du profil
        if (!profile || !profile.full_name || !profile.phone) {
          router.push('/complete-profile')
        } else {
          router.push('/dashboard')
        }
      }
      
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'Identifiants incorrects')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (error) throw error
    } catch (error: any) {
      setError(error.message || 'Erreur lors de la connexion avec Google')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto p-4">
       <Link href="/" className="flex w-max mt-5 mx-auto items-center  font-black hover:opacity-80 transition-opacity">
                  <img src='/logo.png' className='  w-16 ' alt="Stone Consulting Logo"/>
                  <p>
                  </p>
                </Link>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h2>
        <p className="text-sm text-gray-500">Accédez à votre compte</p>
      </div>
      
      {/* Bouton Google */}
      <button
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
      >
        {googleLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : (
          <FcGoogle className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">
          {googleLoading ? 'Connexion...' : 'Continuer avec Google'}
        </span>
      </button>

      {/* Séparateur */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou</span>
        </div>
      </div>

      {/* Formulaire email/password */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="p-3 border border-red-300 bg-red-50 rounded">
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white p-3 font-medium rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Connexion...
            </div>
          ) : (
            'Se connecter'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
        <div className="text-center">
          <Link 
            href="/forgot-password" 
            className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">
            Pas de compte ?{' '}
            <Link 
              href="/auth/signup" 
              className="text-gray-900 font-medium hover:text-gray-700 hover:underline"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}