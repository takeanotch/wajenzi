
// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
// import Link from 'next/link'
// import { FcGoogle } from 'react-icons/fc'

// type Role = 'seeker' | 'employer'

// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     full_name: '',
//     role: 'seeker' as Role,
//     company_name: '',
//   })
//   const [loading, setLoading] = useState(false)
//   const [googleLoading, setGoogleLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [message, setMessage] = useState<string | null>(null)
  
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

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)
//     setMessage(null)

//     try {
//       const userMetadata: any = {
//         full_name: formData.full_name,
//         role: formData.role
//       }
      
//       if (formData.role === 'employer') {
//         userMetadata.company_name = formData.company_name
//       }

//       const { data, error: signUpError } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//         options: {
//           data: userMetadata,
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//         },
//       })

//       if (signUpError) throw signUpError

//       if (data.user) {
//         if (!data.session) {
//           setMessage('Vérifiez votre email pour confirmer votre inscription')
//         } else {
//           router.push('/dashboard')
//           router.refresh()
//         }
//       }
//     } catch (error: any) {
//       setError(error.message || 'Une erreur est survenue lors de l\'inscription')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleGoogleSignup = async () => {
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
//       setError(error.message || 'Erreur lors de l\'inscription avec Google')
//       setGoogleLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="mb-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Inscription</h2>
//         <p className="text-sm text-gray-500">Créez votre compte</p>
//       </div>

//       {/* Bouton Google */}
//       <button
//         onClick={handleGoogleSignup}
//         disabled={googleLoading}
//         className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
//       >
//         {googleLoading ? (
//           <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
//         ) : (
//           <FcGoogle className="w-5 h-5" />
//         )}
//         <span className="text-sm font-medium">
//           {googleLoading ? 'Inscription...' : 'S\'inscrire avec Google'}
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

//       {/* Formulaire d'inscription */}
//       <form onSubmit={handleSignup} className="space-y-4">
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Nom complet *
//           </label>
//           <input
//             type="text"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
//             required
//             disabled={loading}
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Email *
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
//             required
//             disabled={loading}
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Mot de passe *
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
//             required
//             minLength={6}
//             disabled={loading}
//           />
//         </div>

//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">
//             Je suis *
//           </label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
//             required
//             disabled={loading}
//           >
//             <option value="seeker">Candidat</option>
//             <option value="employer">Recruteur</option>
//           </select>
//         </div>

//         {formData.role === 'employer' && (
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">
//               Nom de l'entreprise *
//             </label>
//             <input
//               type="text"
//               name="company_name"
//               value={formData.company_name}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
//               required={formData.role === 'employer'}
//               disabled={loading}
//             />
//           </div>
//         )}

//         {error && (
//           <div className="p-3 border border-red-300 bg-red-50 rounded">
//             <p className="text-xs text-red-700">{error}</p>
//           </div>
//         )}

//         {message && (
//           <div className="p-3 border border-green-300 bg-green-50 rounded">
//             <p className="text-xs text-green-700">{message}</p>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-gray-900 text-white p-3 font-medium rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? (
//             <div className="flex items-center justify-center gap-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               Inscription...
//             </div>
//           ) : (
//             'S\'inscrire'
//           )}
//         </button>
//       </form>

//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <div className="text-center">
//           <p className="text-xs text-gray-600">
//             Déjà un compte ?{' '}
//             <Link 
//               href="/login" 
//               className="text-gray-900 font-medium hover:text-gray-700 hover:underline"
//             >
//               Se connecter
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

type Role = 'seeker' | 'employer'

export default function SignupPage() {
  type FormData = {
    email: string
    password: string
    full_name: string
    role: Role
    company_name: string
  }

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    full_name: '',
    role: 'seeker',
    company_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    
    checkUser()
  }, [router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // Préparer les metadata simplifiées
      const userMetadata: any = {
        full_name: formData.full_name || '',
        role: formData.role
      }
      
      // Ajouter company_name uniquement pour les employeurs
      if (formData.role === 'employer' && formData.company_name) {
        userMetadata.company_name = formData.company_name
      }

      console.log('Tentative d\'inscription avec:', {
        email: formData.email,
        hasMetadata: !!userMetadata
      })

      // Inscription sans options complexes d'abord
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: userMetadata
          // Retirer emailRedirectTo temporairement pour debug
        },
      })

      console.log('Réponse de signUp:', { data, signUpError })

      if (signUpError) {
        console.error('Erreur détaillée:', signUpError)
        throw signUpError
      }

      if (data.user) {
        console.log('Utilisateur créé:', data.user.id)
        
        if (!data.session) {
          // Email de confirmation requis
          setMessage(`
            Vérifiez votre email (${formData.email}) pour confirmer votre inscription.
            
            ${formData.role === 'employer' 
              ? `Une fois confirmé, votre profil employeur "${formData.company_name}" sera créé automatiquement.`
              : 'Une fois confirmé, votre profil candidat sera créé automatiquement.'
            }
          `)
        } else {
          // Utilisateur connecté directement
          console.log('Session créée, utilisateur connecté')
          
          // Attendre un peu pour laisser les triggers s'exécuter
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Vérifier/créer le profil manuellement
          await ensureProfileCreated(data.user, formData)
          
          router.push('/dashboard')
          router.refresh()
        }
      }
    } catch (error: any) {
      console.error('Erreur complète d\'inscription:', error)
      
      // Messages d'erreur plus explicites
      if (error.message?.includes('Database error')) {
        setError('Erreur de base de données. Vérifiez la configuration Supabase.')
      } else if (error.message?.includes('already registered')) {
        setError('Cet email est déjà utilisé.')
      } else if (error.message?.includes('password')) {
        setError('Mot de passe trop faible (min. 6 caractères).')
      } else {
        setError(error.message || 'Erreur lors de l\'inscription')
      }
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour s'assurer que le profil est créé
  const ensureProfileCreated = async (user: any, formData: FormData) => {
    try {
      console.log('Vérification/création du profil...')
      
      // Vérifier si le profil existe déjà
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

      if (checkError) {
        console.error('Erreur vérification profil:', checkError)
      }

      if (!existingProfile) {
        console.log('Profil non trouvé, création...')
        
        // Créer le profil
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            role: formData.role,
            full_name: formData.full_name || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (createError) {
          console.error('Erreur création profil:', createError)
        } else {
          console.log('Profil créé avec succès')
          
          // Créer l'entrée spécifique au rôle
          if (formData.role === 'employer') {
            const { error: employerError } = await supabase
              .from('employers')
              .insert({
                profile_id: user.id,
                company_name: formData.company_name || '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })

            if (employerError) {
              console.error('Erreur création employeur:', employerError)
            } else {
              console.log('Employeur créé avec succès')
            }
          } else {
            const { error: seekerError } = await supabase
              .from('seekers')
              .insert({
                profile_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })

            if (seekerError) {
              console.error('Erreur création candidat:', seekerError)
            } else {
              console.log('Candidat créé avec succès')
            }
          }
        }
      } else {
        console.log('Profil existe déjà')
      }
    } catch (error) {
      console.error('Erreur dans ensureProfileCreated:', error)
    }
  }

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
    } catch (error: any) {
      setError(error.message || 'Erreur Google OAuth')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inscription</h2>
        <p className="text-sm text-gray-500">Créez votre compte</p>
      </div>

      {/* Bouton Google */}
      <button
        onClick={handleGoogleSignup}
        disabled={googleLoading || loading}
        className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
      >
        {googleLoading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : (
          <FcGoogle className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">
          {googleLoading ? 'Inscription...' : 'S\'inscrire avec Google'}
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

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            required
            disabled={loading}
            placeholder="exemple@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            required
            minLength={6}
            disabled={loading}
            placeholder="6 caractères minimum"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            disabled={loading}
            placeholder="Optionnel"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Je suis *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            required
            disabled={loading}
          >
            <option value="seeker">Candidat</option>
            <option value="employer">Employeur</option>
          </select>
        </div>

        {formData.role === 'employer' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              disabled={loading}
              placeholder="Optionnel pour l'instant"
            />
          </div>
        )}

        {error && (
          <div className="p-3 border border-red-300 bg-red-50 rounded">
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        {message && (
          <div className="p-3 border border-green-300 bg-green-50 rounded whitespace-pre-line">
            <p className="text-xs text-green-700">{message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white p-3 font-medium rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Inscription...
            </div>
          ) : (
            'S\'inscrire'
          )}
        </button>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>En vous inscrivant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.</p>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-600">
            Déjà un compte ?{' '}
            <Link 
              href="/login" 
              className="text-gray-900 font-medium hover:text-gray-700 hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}