// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter, useParams } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
// import { ArrowLeft, Upload, FileText, X, Check } from 'lucide-react'

// export default function ApplyToJob() {
//   const router = useRouter()
//   const params = useParams()
//   const supabase = createClient()
//   const [loading, setLoading] = useState(false)
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [job, setJob] = useState<any>(null)
//   const [coverLetter, setCoverLetter] = useState('')
//   const [cvFile, setCvFile] = useState<File | null>(null)
//   const [existingCvUrl, setExistingCvUrl] = useState<string | null>(null)

//   const jobId = params.id as string

//   useEffect(() => {
//     fetchJobDetails()
//     fetchUserCV()
//   }, [jobId])

//   const fetchJobDetails = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('job_offers')
//         .select(`
//           *,
//           employers (
//             company_name,
//             company_logo
//           )
//         `)
//         .eq('id', jobId)
//         .single()

//       if (error) throw error
//       setJob(data)
//     } catch (error) {
//       console.error('Error fetching job:', error)
//       router.push('/jobs')
//     }
//   }

//   const fetchUserCV = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (!user) return

//       const { data: seeker } = await supabase
//         .from('seekers')
//         .select('cv_url')
//         .eq('profile_id', user.id)
//         .single()

//       if (seeker?.cv_url) {
//         setExistingCvUrl(seeker.cv_url)
//       }
//     } catch (error) {
//       console.error('Error fetching CV:', error)
//     }
//   }

//   const handleCVUpload = async (file: File) => {
//     try {
//       setUploading(true)
//       const { data: { user } } = await supabase.auth.getUser()
//       if (!user) throw new Error('Non authentifié')

//       const fileExt = file.name.split('.').pop()
//       const fileName = `${user.id}/${Date.now()}.${fileExt}`
//       const filePath = `${fileName}`

//       // Upload du CV
//       const { error: uploadError } = await supabase.storage
//         .from('cvs')
//         .upload(filePath, file, {
//           cacheControl: '3600',
//           upsert: true
//         })

//       if (uploadError) throw uploadError

//       // Récupérer l'URL publique
//       const { data: { publicUrl } } = supabase.storage
//         .from('cvs')
//         .getPublicUrl(filePath)

//       // Mettre à jour le profil seeker
//       const { error: updateError } = await supabase
//         .from('seekers')
//         .upsert({
//           profile_id: user.id,
//           cv_url: publicUrl,
//           cv_name: file.name,
//           updated_at: new Date().toISOString()
//         })

//       if (updateError) throw updateError

//       setExistingCvUrl(publicUrl)
//       setCvFile(file)
//     } catch (error: any) {
//       setError(error.message || 'Erreur lors du téléchargement')
//     } finally {
//       setUploading(false)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)

//     try {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (!user) throw new Error('Non authentifié')

//       // Vérifier si l'utilisateur a un profil seeker
//       const { data: seeker } = await supabase
//         .from('seekers')
//         .select('id')
//         .eq('profile_id', user.id)
//         .single()

//       if (!seeker) throw new Error('Profil candidat non trouvé')

//       // Vérifier s'il a déjà postulé
//       const { data: existingApplication } = await supabase
//         .from('applications')
//         .select('id')
//         .eq('job_offer_id', jobId)
//         .eq('seeker_id', seeker.id)
//         .single()

//       if (existingApplication) {
//         throw new Error('Vous avez déjà postulé à cette offre')
//       }

//       // Créer la candidature
//       const { error: applicationError } = await supabase
//         .from('applications')
//         .insert([{
//           job_offer_id: jobId,
//           seeker_id: seeker.id,
//           cover_letter: coverLetter || null,
//           status: 'pending'
//         }])

//       if (applicationError) throw applicationError

//       // Rediriger vers la confirmation
//       router.push(`/jobs/${jobId}/apply/success`)
//     } catch (error: any) {
//       console.error('Error applying:', error)
//       setError(error.message || 'Erreur lors de la candidature')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!job) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Navigation */}
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Retour à l'offre
//         </button>

//         <div className="mb-8">
//           <h1 className="text-2xl font-normal text-black mb-2">
//             Postuler à : {job.title}
//           </h1>
//           <p className="text-gray-600">
//             chez {job.employers?.company_name || 'Entreprise'}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Section CV */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">
//               Votre CV
//             </h2>
            
//             {existingCvUrl ? (
//               <div className="p-4 border border-green-200 bg-green-50">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-green-100 rounded">
//                       <FileText className="w-5 h-5 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-green-800">CV déjà disponible</p>
//                       <p className="text-sm text-green-600">
//                         Votre CV actuel sera utilisé pour cette candidature
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => router.push('/complete-profile')}
//                     className="text-sm text-green-600 hover:text-green-800"
//                   >
//                     Modifier
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors">
//                 <input
//                   type="file"
//                   id="cv-upload"
//                   accept=".pdf,.doc,.docx"
//                   className="hidden"
//                   onChange={(e) => {
//                     if (e.target.files?.[0]) {
//                       handleCVUpload(e.target.files[0])
//                     }
//                   }}
//                   disabled={uploading}
//                 />
                
//                 <label htmlFor="cv-upload" className="cursor-pointer">
//                   <div className="mb-3">
//                     <Upload className="w-8 h-8 text-gray-400 mx-auto" />
//                   </div>
//                   <p className="text-sm text-gray-600 mb-1">
//                     {uploading ? 'Téléchargement...' : 'Téléchargez votre CV'}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     PDF, DOC, DOCX • Max 5MB
//                   </p>
//                 </label>
                
//                 {cvFile && (
//                   <div className="mt-4 p-3 border border-gray-200 bg-gray-50">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <FileText className="w-4 h-4 text-gray-400" />
//                         <span className="text-sm text-gray-700">{cvFile.name}</span>
//                       </div>
//                       <Check className="w-4 h-4 text-green-500" />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             <p className="text-sm text-gray-500">
//               Assurez-vous que votre CV est à jour et met en valeur vos compétences pertinentes pour ce poste.
//             </p>
//           </div>

//           {/* Lettre de motivation */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">
//               Lettre de motivation (optionnelle)
//             </h2>
            
//             <div className="p-4 border border-gray-300">
//               <textarea
//                 value={coverLetter}
//                 onChange={(e) => setCoverLetter(e.target.value)}
//                 rows={8}
//                 className="w-full focus:outline-none resize-none"
//                 placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste. Mentionnez vos expériences pertinentes et ce qui vous motive à rejoindre cette entreprise..."
//               />
//             </div>
            
//             <p className="text-sm text-gray-500">
//               Une lettre de motivation personnalisée peut augmenter vos chances d'être retenu.
//             </p>
//           </div>

//           {/* Récapitulatif */}
//           <div className="space-y-4">
//             <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">
//               Récapitulatif
//             </h2>
            
//             <div className="space-y-3 p-4 border border-gray-300">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Poste :</span>
//                 <span className="font-medium">{job.title}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Entreprise :</span>
//                 <span className="font-medium">{job.employers?.company_name || 'Entreprise'}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">CV :</span>
//                 <span className="font-medium text-green-600">
//                   {existingCvUrl || cvFile ? 'Disponible' : 'Non fourni'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Lettre de motivation :</span>
//                 <span className="font-medium">
//                   {coverLetter.trim() ? 'Incluse' : 'Non incluse'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="p-4 border border-red-300 bg-red-50">
//               <div className="flex items-center gap-2 text-red-700">
//                 <X className="w-5 h-5" />
//                 <p>{error}</p>
//               </div>
//             </div>
//           )}

//           <div className="pt-6 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-gray-500">
//                 Votre candidature sera soumise et pourra être consultée par le recruteur.
//               </p>
              
//               <button
//                 type="submit"
//                 disabled={loading || (!existingCvUrl && !cvFile)}
//                 className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? 'Envoi...' : 'Soumettre ma candidature'}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Upload, FileText, X, Check, AlertTriangle, File } from 'lucide-react'

export default function ApplyToJob() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [job, setJob] = useState<any>(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [existingCvUrl, setExistingCvUrl] = useState<string | null>(null)

  const jobId = params.id as string

  useEffect(() => {
    fetchJobDetails()
    fetchUserCV()
  }, [jobId])

  const fetchJobDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('job_offers')
        .select(`
          *,
          employers (
            company_name,
            company_logo
          )
        `)
        .eq('id', jobId)
        .single()

      if (error) throw error
      setJob(data)
    } catch (error) {
      console.error('Error fetching job:', error)
      router.push('/jobs')
    }
  }

  const fetchUserCV = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: seeker } = await supabase
        .from('seekers')
        .select('cv_url')
        .eq('profile_id', user.id)
        .single()

      if (seeker?.cv_url) {
        setExistingCvUrl(seeker.cv_url)
      }
    } catch (error) {
      console.error('Error fetching CV:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Non authentifié')

      // Vérifier si l'utilisateur a un profil seeker
      const { data: seeker } = await supabase
        .from('seekers')
        .select('id, cv_url')
        .eq('profile_id', user.id)
        .single()

      if (!seeker) throw new Error('Profil candidat non trouvé')
      
      // Vérifier si l'utilisateur a un CV
      if (!seeker.cv_url) {
        throw new Error('Veuillez d\'abord uploader votre CV dans votre profil avant de postuler')
      }

      // Vérifier s'il a déjà postulé
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('job_offer_id', jobId)
        .eq('seeker_id', seeker.id)
        .single()

      if (existingApplication) {
        throw new Error('Vous avez déjà postulé à cette offre')
      }

      // Créer la candidature
      const { error: applicationError } = await supabase
        .from('applications')
        .insert([{
          job_offer_id: jobId,
          seeker_id: seeker.id,
          cover_letter: coverLetter || null,
          status: 'pending'
        }])

      if (applicationError) throw applicationError

      // Rediriger vers la confirmation
      router.push(`/jobs/${jobId}/apply/success`)
    } catch (error: any) {
      console.error('Error applying:', error)
      setError(error.message || 'Erreur lors de la candidature')
    } finally {
      setLoading(false)
    }
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l'offre
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-normal text-black mb-2">
            Postuler à : {job.title}
          </h1>
          <p className="text-gray-600">
            chez {job.employers?.company_name || 'Entreprise'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section CV */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">
              Votre CV
            </h2>
            
            {existingCvUrl ? (
              <div className="p-4 border border-blue-200 bg-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-800">CV disponible</p>
                      <p className="text-sm text-blue-600">
                        Votre CV actuel sera utilisé pour cette candidature
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push('/complete-profile')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-amber-300 bg-amber-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800 mb-1">
                      CV requis
                    </p>
                    <p className="text-sm text-amber-700 mb-3">
                      Veuillez d'abord uploader votre CV dans votre profil avant de postuler.
                    </p>
                    <button
                      type="button"
                      onClick={() => router.push('/complete-profile')}
                      className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors text-sm"
                    >
                      Uploader mon CV dans le profil
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <File className="w-4 h-4 text-red-500" />
              <span>Format recommandé : PDF</span>
            </div>
            
            <p className="text-sm text-gray-500">
              Assurez-vous que votre CV est à jour et met en valeur vos compétences pertinentes pour ce poste.
            </p>
          </div>

          {/* Lettre de motivation */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">
              Lettre de motivation (optionnelle)
            </h2>
            
            <div className="p-4 border border-gray-300">
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={8}
                className="w-full focus:outline-none resize-none"
                placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste. Mentionnez vos expériences pertinentes et ce qui vous motive à rejoindre cette entreprise..."
              />
            </div>
            
            <p className="text-sm text-gray-500">
              Une lettre de motivation personnalisée peut augmenter vos chances d'être retenu.
            </p>
          </div>

          {/* Récapitulatif */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">
              Récapitulatif
            </h2>
            
            <div className="space-y-3 p-4 border border-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-600">Poste :</span>
                <span className="font-medium">{job.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Entreprise :</span>
                <span className="font-medium">{job.employers?.company_name || 'Entreprise'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CV :</span>
                <span className={`font-medium ${existingCvUrl ? 'text-green-600' : 'text-amber-600'}`}>
                  {existingCvUrl ? 'Disponible' : 'Non disponible'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lettre de motivation :</span>
                <span className="font-medium">
                  {coverLetter.trim() ? 'Incluse' : 'Non incluse'}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className={`p-4 border ${error.includes('uploader') ? 'border-amber-300 bg-amber-50' : 'border-red-300 bg-red-50'}`}>
              <div className={`flex items-center gap-2 ${error.includes('uploader') ? 'text-amber-700' : 'text-red-700'}`}>
                {error.includes('uploader') ? <AlertTriangle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Votre candidature sera soumise et pourra être consultée par le recruteur.
              </p>
              
              <button
                type="submit"
                disabled={loading || !existingCvUrl}
                className="px-8 py-3 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Envoi...' : 'Soumettre ma candidature'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}