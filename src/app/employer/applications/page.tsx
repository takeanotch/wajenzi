// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase/client'
// import {
//   Search, Filter, Mail, FileText, CheckCircle, XCircle, 
//   Eye, Clock, User, Calendar, MapPin, Briefcase, Download,
//   ChevronDown, ChevronUp, Building, Users, RefreshCw,
//   ExternalLink, Phone, MessageSquare
// } from 'lucide-react'

// interface Application {
//   id: string
//   status: 'pending' | 'reviewed' | 'rejected' | 'accepted'
//   created_at: string
//   cover_letter: string | null
//   job: {
//     id: string
//     title: string
//   }
//   seeker: {
//     profile: {
//       full_name: string
//       email: string
//       phone: string | null
//       avatar_url: string | null
//     }
//     seeker_data: {
//       headline: string | null
//       location: string | null
//       experience_years: number | null
//       skills: string[] | null
//       cv_url: string | null
//       cv_name: string | null
//       bio: string | null
//     }
//   }
// }

// export default function AllEmployerApplications() {
//   const router = useRouter()
//   const supabase = createClient()
  
//   const [applications, setApplications] = useState<Application[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('all')
//   const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
//   const [expandedId, setExpandedId] = useState<string | null>(null)
//   const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

//   useEffect(() => {
//     fetchApplications()
//   }, [])

//   const fetchApplications = async () => {
//     try {
//       setLoading(true)
//       const { data: { user } } = await supabase.auth.getUser()
//       if (!user) {
//         router.push('/login')
//         return
//       }

//       // Récupérer l'employeur
//       const { data: employer } = await supabase
//         .from('employers')
//         .select('id')
//         .eq('profile_id', user.id)
//         .single()

//       if (!employer) {
//         router.push('/complete-profile')
//         return
//       }

//       // Récupérer toutes les applications pour cet employeur
//       const { data } = await supabase
//         .from('applications')
//         .select(`
//           id,
//           status,
//           created_at,
//           cover_letter,
//           job_offer:job_offers!inner(
//             id,
//             title
//           ),
//           seeker:seekers!inner(
//             profile:profiles!inner(
//               full_name,
//               email,
//               phone,
//               avatar_url
//             ),
//             headline,
//             location,
//             experience_years,
//             skills,
//             cv_url,
//             cv_name,
//             bio
//           )
//         `)
//         .eq('job_offers.employer_id', employer.id)
//         .order('created_at', { ascending: false })

//       const formatted: Application[] = (data || []).map((app: any) => ({
//         id: app.id,
//         status: app.status,
//         created_at: app.created_at,
//         cover_letter: app.cover_letter,
//         job: {
//           id: app.job_offer.id,
//           title: app.job_offer.title
//         },
//         seeker: {
//           profile: {
//             full_name: app.seeker?.profile?.full_name || 'Candidat',
//             email: app.seeker?.profile?.email || '',
//             phone: app.seeker?.profile?.phone || null,
//             avatar_url: app.seeker?.profile?.avatar_url || null
//           },
//           seeker_data: {
//             headline: app.seeker?.headline || null,
//             location: app.seeker?.location || null,
//             experience_years: app.seeker?.experience_years || null,
//             skills: app.seeker?.skills || null,
//             cv_url: app.seeker?.cv_url || null,
//             cv_name: app.seeker?.cv_name || null,
//             bio: app.seeker?.bio || null
//           }
//         }
//       }))

//       setApplications(formatted)
//     } catch (error) {
//       console.error('Error fetching applications:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateStatus = async (id: string, status: Application['status']) => {
//     setUpdatingStatus(id)
//     try {
//       const { error } = await supabase
//         .from('applications')
//         .update({ 
//           status,
//           updated_at: new Date().toISOString()
//         })
//         .eq('id', id)

//       if (error) throw error

//       // Mettre à jour localement
//       setApplications(prev => prev.map(app =>
//         app.id === id ? { ...app, status } : app
//       ))
//     } catch (error) {
//       console.error('Error updating status:', error)
//       alert('Erreur lors de la mise à jour du statut')
//     } finally {
//       setUpdatingStatus(null)
//     }
//   }

//   const downloadCV = async (cvUrl: string, fileName: string) => {
//     try {
//       const response = await fetch(cvUrl)
//       if (!response.ok) throw new Error('Erreur de téléchargement')
      
//       const blob = await response.blob()
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = fileName || 'CV.pdf'
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)
//     } catch (error) {
//       console.error('Error downloading CV:', error)
//       alert('Erreur lors du téléchargement du CV')
//     }
//   }

//   const getStatusIcon = (status: Application['status']) => {
//     switch (status) {
//       case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />
//       case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />
//       case 'reviewed': return <Eye className="w-4 h-4 text-blue-500" />
//       default: return <Clock className="w-4 h-4 text-yellow-500" />
//     }
//   }

//   const getStatusLabel = (status: Application['status']) => {
//     switch (status) {
//       case 'pending': return 'En attente'
//       case 'reviewed': return 'Consultée'
//       case 'accepted': return 'Acceptée'
//       case 'rejected': return 'Refusée'
//       default: return status
//     }
//   }

//   const getStatusColor = (status: Application['status']) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800'
//       case 'reviewed': return 'bg-blue-100 text-blue-800'
//       case 'accepted': return 'bg-green-100 text-green-800'
//       case 'rejected': return 'bg-red-100 text-red-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('fr-FR', {
//       day: 'numeric',
//       month: 'short',
//       hour: '2-digit',
//       minute: '2-digit'
//     })
//   }

//   const filteredApplications = applications.filter(app => {
//     const matchesSearch = 
//       searchTerm === '' ||
//       app.seeker.profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.seeker.seeker_data.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.seeker.seeker_data.skills?.some(skill => 
//         skill.toLowerCase().includes(searchTerm.toLowerCase())
//       )
    
//     const matchesFilter = 
//       statusFilter === 'all' ||
//       app.status === statusFilter
    
//     return matchesSearch && matchesFilter
//   })

//   const sortedApplications = [...filteredApplications].sort((a, b) => {
//     if (sortBy === 'newest') {
//       return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     } else {
//       return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
//     }
//   })

//   const stats = {
//     total: applications.length,
//     pending: applications.filter(a => a.status === 'pending').length,
//     reviewed: applications.filter(a => a.status === 'reviewed').length,
//     accepted: applications.filter(a => a.status === 'accepted').length,
//     rejected: applications.filter(a => a.status === 'rejected').length
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto p-4 md:p-6">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="mb-6">
//             <h1 className="text-2xl font-normal text-black mb-2">
//               Toutes les candidatures
//             </h1>
//             <p className="text-gray-600">
//               Gérez toutes les candidatures reçues pour vos offres
//             </p>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
//             {[
//               { label: 'Total', value: stats.total, icon: Users, color: 'bg-gray-100' },
//               { label: 'En attente', value: stats.pending, icon: Clock, color: 'bg-yellow-100' },
//               { label: 'Consultées', value: stats.reviewed, icon: Eye, color: 'bg-blue-100' },
//               { label: 'Acceptées', value: stats.accepted, icon: CheckCircle, color: 'bg-green-100' },
//               { label: 'Refusées', value: stats.rejected, icon: XCircle, color: 'bg-red-100' },
//             ].map((stat, idx) => (
//               <div key={idx} className="border border-gray-300 p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                     <p className="text-sm text-gray-600">{stat.label}</p>
//                   </div>
//                   <div className={`p-2 rounded ${stat.color}`}>
//                     <stat.icon className="w-5 h-5" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Filters */}
//           <div className="bg-white border border-gray-300 rounded p-4 mb-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Rechercher un candidat, un poste, une compétence..."
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-300 focus:outline-none focus:border-black"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300">
//                   <Filter className="w-5 h-5 text-gray-400" />
//                   <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="focus:outline-none bg-transparent"
//                   >
//                     <option value="all">Tous les statuts</option>
//                     <option value="pending">En attente</option>
//                     <option value="reviewed">Consultées</option>
//                     <option value="accepted">Acceptées</option>
//                     <option value="rejected">Refusées</option>
//                   </select>
//                 </div>
                
//                 <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300">
//                   <Calendar className="w-5 h-5 text-gray-400" />
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value as any)}
//                     className="focus:outline-none bg-transparent"
//                   >
//                     <option value="newest">Plus récentes</option>
//                     <option value="oldest">Plus anciennes</option>
//                   </select>
//                 </div>
                
//                 <button
//                   onClick={fetchApplications}
//                   className="px-4 py-2.5 border border-gray-300 hover:border-gray-400 transition-colors"
//                   title="Rafraîchir"
//                 >
//                   <RefreshCw className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Applications List */}
//         {sortedApplications.length === 0 ? (
//           <div className="text-center py-12 border border-gray-300">
//             <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {applications.length === 0 
//                 ? 'Aucune candidature reçue' 
//                 : 'Aucune candidature ne correspond aux critères'}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {applications.length === 0
//                 ? 'Les candidatures apparaîtront ici une fois vos offres publiées'
//                 : 'Essayez de modifier vos critères de recherche'}
//             </p>
//             {applications.length === 0 && (
//               <button
//                 onClick={() => router.push('/employer/jobs/create')}
//                 className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
//               >
//                 Créer une offre
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {sortedApplications.map((app) => (
//               <div key={app.id} className="border border-gray-300">
//                 {/* Application Summary */}
//                 <div className="p-5">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-4 flex-1">
//                       {/* Avatar */}
//                       <div className="flex-shrink-0">
//                         {app.seeker.profile.avatar_url ? (
//                           <img
//                             src={app.seeker.profile.avatar_url}
//                             alt={app.seeker.profile.full_name}
//                             className="w-12 h-12 rounded-full object-cover border"
//                           />
//                         ) : (
//                           <div className="w-12 h-12 rounded-full bg-gray-100 border flex items-center justify-center">
//                             <User className="w-6 h-6 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Info */}
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h3 className="font-medium text-gray-900 text-lg">
//                             {app.seeker.profile.full_name}
//                           </h3>
//                           <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
//                             {getStatusLabel(app.status)}
//                           </span>
//                         </div>
                        
//                         <p className="text-gray-600 mb-2">
//                           {app.seeker.seeker_data.headline || 'Chercheur d\'emploi'}
//                         </p>
                        
//                         <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
//                           <span className="flex items-center gap-1">
//                             <Briefcase className="w-4 h-4" />
//                             {app.job.title}
//                           </span>
                          
//                           {app.seeker.seeker_data.location && (
//                             <span className="flex items-center gap-1">
//                               <MapPin className="w-4 h-4" />
//                               {app.seeker.seeker_data.location}
//                             </span>
//                           )}
                          
//                           {app.seeker.seeker_data.experience_years !== null && (
//                             <span className="flex items-center gap-1">
//                               <Calendar className="w-4 h-4" />
//                               {app.seeker.seeker_data.experience_years} ans
//                             </span>
//                           )}
                          
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             {formatDate(app.created_at)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="flex items-center gap-1">
//                       <button
//                         onClick={() => window.open(`mailto:${app.seeker.profile.email}`)}
//                         className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                         title="Contacter"
//                       >
//                         <Mail className="w-4 h-4" />
//                       </button>
                      
//                       {app.seeker.seeker_data.cv_url && (
//                         <button
//                           onClick={() => downloadCV(
//                             app.seeker.seeker_data.cv_url!,
//                             app.seeker.seeker_data.cv_name || 'CV.pdf'
//                           )}
//                           className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                           title="Télécharger CV"
//                         >
//                           <Download className="w-4 h-4" />
//                         </button>
//                       )}
                      
//                       <button
//                         onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
//                         className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                       >
//                         {expandedId === app.id ? (
//                           <ChevronUp className="w-4 h-4" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Status Actions */}
//                   <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
//                     <button
//                       onClick={() => updateStatus(app.id, 'reviewed')}
//                       disabled={updatingStatus === app.id || app.status === 'reviewed'}
//                       className={`px-3 py-1.5 text-sm ${
//                         app.status === 'reviewed'
//                           ? 'bg-blue-100 text-blue-800'
//                           : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       <Eye className="w-4 h-4 inline mr-1" />
//                       Marquer comme vu
//                     </button>
                    
//                     <button
//                       onClick={() => updateStatus(app.id, 'accepted')}
//                       disabled={updatingStatus === app.id || app.status === 'accepted'}
//                       className={`px-3 py-1.5 text-sm ${
//                         app.status === 'accepted'
//                           ? 'bg-green-100 text-green-800'
//                           : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       <CheckCircle className="w-4 h-4 inline mr-1" />
//                       Accepter
//                     </button>
                    
//                     <button
//                       onClick={() => updateStatus(app.id, 'rejected')}
//                       disabled={updatingStatus === app.id || app.status === 'rejected'}
//                       className={`px-3 py-1.5 text-sm ${
//                         app.status === 'rejected'
//                           ? 'bg-red-100 text-red-800'
//                           : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       <XCircle className="w-4 h-4 inline mr-1" />
//                       Refuser
//                     </button>
                    
//                     <button
//                       onClick={() => router.push(`/employer/jobs/${app.job.id}`)}
//                       className="ml-auto text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                       Voir l'offre
//                     </button>
//                   </div>
//                 </div>

//                 {/* Expanded Details */}
//                 {expandedId === app.id && (
//                   <div className="border-t border-gray-300 p-5 bg-gray-50">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                       {/* Left Column */}
//                       <div className="space-y-6">
//                         {/* Cover Letter */}
//                         {app.cover_letter && (
//                           <div>
//                             <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
//                               <MessageSquare className="w-5 h-5 text-gray-400" />
//                               Lettre de motivation
//                             </h4>
//                             <div className="p-4 bg-white border border-gray-300 rounded">
//                               <p className="text-gray-700 whitespace-pre-line text-sm">
//                                 {app.cover_letter}
//                               </p>
//                             </div>
//                           </div>
//                         )}

//                         {/* Skills */}
//                         {app.seeker.seeker_data.skills && app.seeker.seeker_data.skills.length > 0 && (
//                           <div>
//                             <h4 className="font-medium text-gray-900 mb-3">Compétences</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {app.seeker.seeker_data.skills.map((skill, index) => (
//                                 <span
//                                   key={index}
//                                   className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded"
//                                 >
//                                   {skill}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                         {/* Bio */}
//                         {app.seeker.seeker_data.bio && (
//                           <div>
//                             <h4 className="font-medium text-gray-900 mb-3">À propos</h4>
//                             <div className="p-4 bg-white border border-gray-300 rounded">
//                               <p className="text-gray-700 whitespace-pre-line text-sm">
//                                 {app.seeker.seeker_data.bio}
//                               </p>
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       {/* Right Column */}
//                       <div className="space-y-6">
//                         {/* Contact Info */}
//                         <div>
//                           <h4 className="font-medium text-gray-900 mb-3">Informations de contact</h4>
//                           <div className="space-y-3 p-4 bg-white border border-gray-300 rounded">
//                             <div className="flex justify-between items-center">
//                               <span className="text-gray-600">Email</span>
//                               <a
//                                 href={`mailto:${app.seeker.profile.email}`}
//                                 className="font-medium text-gray-900 hover:text-gray-700"
//                               >
//                                 {app.seeker.profile.email}
//                               </a>
//                             </div>
                            
//                             {app.seeker.profile.phone && (
//                               <div className="flex justify-between items-center">
//                                 <span className="text-gray-600">Téléphone</span>
//                                 <a
//                                   href={`tel:${app.seeker.profile.phone}`}
//                                   className="font-medium text-gray-900 hover:text-gray-700"
//                                 >
//                                   {app.seeker.profile.phone}
//                                 </a>
//                               </div>
//                             )}
                            
//                             {app.seeker.seeker_data.experience_years !== null && (
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600">Expérience</span>
//                                 <span className="font-medium text-gray-900">
//                                   {app.seeker.seeker_data.experience_years} ans
//                                 </span>
//                               </div>
//                             )}
                            
//                             {app.seeker.seeker_data.location && (
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600">Localisation</span>
//                                 <span className="font-medium text-gray-900">
//                                   {app.seeker.seeker_data.location}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Job Info */}
//                         <div>
//                           <h4 className="font-medium text-gray-900 mb-3">Poste concerné</h4>
//                           <div className="p-4 bg-white border border-gray-300 rounded">
//                             <p className="font-medium text-gray-900 mb-2">{app.job.title}</p>
//                             <button
//                               onClick={() => router.push(`/employer/jobs/${app.job.id}/applications`)}
//                               className="text-sm text-gray-600 hover:text-gray-800"
//                             >
//                               Voir toutes les candidatures pour ce poste
//                             </button>
//                           </div>
//                         </div>

//                         {/* Quick Links */}
//                         <div className="flex items-center gap-4">
//                           {app.seeker.seeker_data.cv_url && (
//                             <a
//                               href={app.seeker.seeker_data.cv_url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
//                             >
//                               <ExternalLink className="w-4 h-4" />
//                               Voir CV
//                             </a>
//                           )}
                          
//                           {app.seeker.profile.phone && (
//                             <a
//                               href={`tel:${app.seeker.profile.phone}`}
//                               className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
//                             >
//                               <Phone className="w-4 h-4" />
//                               Appeler
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Summary Footer */}
//         {sortedApplications.length > 0 && (
//           <div className="mt-8 pt-6 border-t border-gray-300">
//             <div className="flex items-center justify-between text-sm text-gray-600">
//               <div>
//                 <span className="font-medium">{sortedApplications.length}</span> candidature{sortedApplications.length !== 1 ? 's' : ''} affichée{sortedApplications.length !== 1 ? 's' : ''}
//                 {sortedApplications.length !== applications.length && (
//                   <span> (sur {applications.length} au total)</span>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => {
//                     const allExpanded = new Set(sortedApplications.map(app => app.id))
//                     setExpandedId(Array.from(allExpanded)[0] || null)
//                   }}
//                   className="text-gray-600 hover:text-gray-800"
//                 >
//                   Développer tout
//                 </button>
                
//                 <button
//                   onClick={() => setExpandedId(null)}
//                   className="text-gray-600 hover:text-gray-800"
//                 >
//                   Réduire tout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Search, Filter, Mail, FileText, CheckCircle, XCircle, 
  Eye, Clock, User, Calendar, MapPin, Briefcase, Download,
  ChevronDown, ChevronUp, Building, Users, RefreshCw,
  ExternalLink, Phone, MessageSquare
} from 'lucide-react'

interface Application {
  id: string
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted'
  created_at: string
  cover_letter: string | null
  job: {
    id: string
    title: string
  }
  seeker: {
    profile: {
      full_name: string
      email: string
      phone: string | null
      avatar_url: string | null
    }
    seeker_data: {
      headline: string | null
      location: string | null
      experience_years: number | null
      skills: string[] | null
      cv_url: string | null
      cv_name: string | null
      bio: string | null
    }
  }
}

export default function AllEmployerApplications() {
  const router = useRouter()
  const supabase = createClient()
  
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Récupérer l'employeur
      const { data: employer } = await supabase
        .from('employers')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (!employer) {
        router.push('/complete-profile')
        return
      }

      // Récupérer toutes les applications pour cet employeur
      const { data } = await supabase
        .from('applications')
        .select(`
          id,
          status,
          created_at,
          cover_letter,
          job_offer:job_offers!inner(
            id,
            title
          ),
          seeker:seekers!inner(
            profile:profiles!inner(
              full_name,
              email,
              phone,
              avatar_url
            ),
            headline,
            location,
            experience_years,
            skills,
            cv_url,
            cv_name,
            bio
          )
        `)
        .eq('job_offers.employer_id', employer.id)
        .order('created_at', { ascending: false })

      const formatted: Application[] = (data || []).map((app: any) => ({
        id: app.id,
        status: app.status,
        created_at: app.created_at,
        cover_letter: app.cover_letter,
        job: {
          id: app.job_offer.id,
          title: app.job_offer.title
        },
        seeker: {
          profile: {
            full_name: app.seeker?.profile?.full_name || 'Candidat',
            email: app.seeker?.profile?.email || '',
            phone: app.seeker?.profile?.phone || null,
            avatar_url: app.seeker?.profile?.avatar_url || null
          },
          seeker_data: {
            headline: app.seeker?.headline || null,
            location: app.seeker?.location || null,
            experience_years: app.seeker?.experience_years || null,
            skills: app.seeker?.skills || null,
            cv_url: app.seeker?.cv_url || null,
            cv_name: app.seeker?.cv_name || null,
            bio: app.seeker?.bio || null
          }
        }
      }))

      setApplications(formatted)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: Application['status']) => {
    setUpdatingStatus(id)
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      // Mettre à jour localement
      setApplications(prev => prev.map(app =>
        app.id === id ? { ...app, status } : app
      ))
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Erreur lors de la mise à jour du statut')
    } finally {
      setUpdatingStatus(null)
    }
  }

  // CORRIGÉ : Logique de téléchargement de CV adaptée de votre premier composant
  const downloadCV = async (seeker: Application['seeker']) => {
    const cvUrl = seeker.seeker_data.cv_url
    const cvName = seeker.seeker_data.cv_name
    const fullName = seeker.profile.full_name

    if (!cvUrl) {
      alert('CV non disponible')
      return
    }

    try {
      let cvPath = cvUrl
      
      // Si c'est déjà une URL complète, extraire le chemin
      if (cvPath.includes('supabase.co/storage/v1/object/public/cvs/')) {
        cvPath = cvPath.split('supabase.co/storage/v1/object/public/cvs/')[1]
      }
      
      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('cvs')
        .getPublicUrl(cvPath)

      const response = await fetch(publicUrl)
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = cvName || `CV_${fullName.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading CV:', error)
      alert('Erreur lors du téléchargement du CV')
    }
  }

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />
      case 'reviewed': return <Eye className="w-4 h-4 text-blue-500" />
      default: return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'reviewed': return 'Consultée'
      case 'accepted': return 'Acceptée'
      case 'rejected': return 'Refusée'
      default: return status
    }
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      searchTerm === '' ||
      app.seeker.profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.seeker.seeker_data.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.seeker.seeker_data.skills?.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    
    const matchesFilter = 
      statusFilter === 'all' ||
      app.status === statusFilter
    
    return matchesSearch && matchesFilter
  })

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }
  })

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewed: applications.filter(a => a.status === 'reviewed').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-normal text-black mb-2">
              Toutes les candidatures
            </h1>
            <p className="text-gray-600">
              Gérez toutes les candidatures reçues pour vos offres
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: 'Total', value: stats.total, icon: Users, color: 'bg-gray-100' },
              { label: 'En attente', value: stats.pending, icon: Clock, color: 'bg-yellow-100' },
              { label: 'Consultées', value: stats.reviewed, icon: Eye, color: 'bg-blue-100' },
              { label: 'Acceptées', value: stats.accepted, icon: CheckCircle, color: 'bg-green-100' },
              { label: 'Refusées', value: stats.rejected, icon: XCircle, color: 'bg-red-100' },
            ].map((stat, idx) => (
              <div key={idx} className="border border-gray-300 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                  <div className={`p-2 rounded ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-300 rounded p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un candidat, un poste, une compétence..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 focus:outline-none focus:border-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="focus:outline-none bg-transparent"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="reviewed">Consultées</option>
                    <option value="accepted">Acceptées</option>
                    <option value="rejected">Refusées</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="focus:outline-none bg-transparent"
                  >
                    <option value="newest">Plus récentes</option>
                    <option value="oldest">Plus anciennes</option>
                  </select>
                </div>
                
                <button
                  onClick={fetchApplications}
                  className="px-4 py-2.5 border border-gray-300 hover:border-gray-400 transition-colors"
                  title="Rafraîchir"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {sortedApplications.length === 0 ? (
          <div className="text-center py-12 border border-gray-300">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {applications.length === 0 
                ? 'Aucune candidature reçue' 
                : 'Aucune candidature ne correspond aux critères'}
            </h3>
            <p className="text-gray-600 mb-6">
              {applications.length === 0
                ? 'Les candidatures apparaîtront ici une fois vos offres publiées'
                : 'Essayez de modifier vos critères de recherche'}
            </p>
            {applications.length === 0 && (
              <button
                onClick={() => router.push('/employer/jobs/create')}
                className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Créer une offre
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedApplications.map((app) => (
              <div key={app.id} className="border border-gray-300">
                {/* Application Summary */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {app.seeker.profile.avatar_url ? (
                          <img
                            src={app.seeker.profile.avatar_url}
                            alt={app.seeker.profile.full_name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-100 border flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-lg">
                            {app.seeker.profile.full_name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-2">
                          {app.seeker.seeker_data.headline || 'Chercheur d\'emploi'}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {app.job.title}
                          </span>
                          
                          {app.seeker.seeker_data.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {app.seeker.seeker_data.location}
                            </span>
                          )}
                          
                          {app.seeker.seeker_data.experience_years !== null && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {app.seeker.seeker_data.experience_years} ans
                            </span>
                          )}
                          
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(app.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => window.open(`mailto:${app.seeker.profile.email}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Contacter"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      
                      {/* CORRIGÉ : Utilisation de la nouvelle fonction downloadCV */}
                      {app.seeker.seeker_data.cv_url && (
                        <button
                          onClick={() => downloadCV(app.seeker)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Télécharger CV"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        {expandedId === app.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => updateStatus(app.id, 'reviewed')}
                      disabled={updatingStatus === app.id || app.status === 'reviewed'}
                      className={`px-3 py-1.5 text-sm ${
                        app.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      Marquer comme vu
                    </button>
                    
                    <button
                      onClick={() => updateStatus(app.id, 'accepted')}
                      disabled={updatingStatus === app.id || app.status === 'accepted'}
                      className={`px-3 py-1.5 text-sm ${
                        app.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Accepter
                    </button>
                    
                    <button
                      onClick={() => updateStatus(app.id, 'rejected')}
                      disabled={updatingStatus === app.id || app.status === 'rejected'}
                      className={`px-3 py-1.5 text-sm ${
                        app.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <XCircle className="w-4 h-4 inline mr-1" />
                      Refuser
                    </button>
                    
                    <button
                      onClick={() => router.push(`/employer/jobs/${app.job.id}`)}
                      className="ml-auto text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Voir l'offre
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === app.id && (
                  <div className="border-t border-gray-300 p-5 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Cover Letter */}
                        {app.cover_letter && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                              <MessageSquare className="w-5 h-5 text-gray-400" />
                              Lettre de motivation
                            </h4>
                            <div className="p-4 bg-white border border-gray-300 rounded">
                              <p className="text-gray-700 whitespace-pre-line text-sm">
                                {app.cover_letter}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Skills */}
                        {app.seeker.seeker_data.skills && app.seeker.seeker_data.skills.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Compétences</h4>
                            <div className="flex flex-wrap gap-2">
                              {app.seeker.seeker_data.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Bio */}
                        {app.seeker.seeker_data.bio && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">À propos</h4>
                            <div className="p-4 bg-white border border-gray-300 rounded">
                              <p className="text-gray-700 whitespace-pre-line text-sm">
                                {app.seeker.seeker_data.bio}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Contact Info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Informations de contact</h4>
                          <div className="space-y-3 p-4 bg-white border border-gray-300 rounded">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Email</span>
                              <a
                                href={`mailto:${app.seeker.profile.email}`}
                                className="font-medium text-gray-900 hover:text-gray-700"
                              >
                                {app.seeker.profile.email}
                              </a>
                            </div>
                            
                            {app.seeker.profile.phone && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Téléphone</span>
                                <a
                                  href={`tel:${app.seeker.profile.phone}`}
                                  className="font-medium text-gray-900 hover:text-gray-700"
                                >
                                  {app.seeker.profile.phone}
                                </a>
                              </div>
                            )}
                            
                            {app.seeker.seeker_data.experience_years !== null && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Expérience</span>
                                <span className="font-medium text-gray-900">
                                  {app.seeker.seeker_data.experience_years} ans
                                </span>
                              </div>
                            )}
                            
                            {app.seeker.seeker_data.location && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Localisation</span>
                                <span className="font-medium text-gray-900">
                                  {app.seeker.seeker_data.location}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Job Info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Poste concerné</h4>
                          <div className="p-4 bg-white border border-gray-300 rounded">
                            <p className="font-medium text-gray-900 mb-2">{app.job.title}</p>
                            <button
                              onClick={() => router.push(`/employer/jobs/${app.job.id}/applications`)}
                              className="text-sm text-gray-600 hover:text-gray-800"
                            >
                              Voir toutes les candidatures pour ce poste
                            </button>
                          </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex items-center gap-4">
                          {/* CORRIGÉ : Utilisation de la nouvelle fonction downloadCV pour le lien "Voir CV" */}
                          {app.seeker.seeker_data.cv_url && (
                            <button
                              onClick={() => downloadCV(app.seeker)}
                              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                            >
                              <Download className="w-4 h-4" />
                              Télécharger CV
                            </button>
                          )}
                          
                          {app.seeker.profile.phone && (
                            <a
                              href={`tel:${app.seeker.profile.phone}`}
                              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                            >
                              <Phone className="w-4 h-4" />
                              Appeler
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {sortedApplications.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <span className="font-medium">{sortedApplications.length}</span> candidature{sortedApplications.length !== 1 ? 's' : ''} affichée{sortedApplications.length !== 1 ? 's' : ''}
                {sortedApplications.length !== applications.length && (
                  <span> (sur {applications.length} au total)</span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const allExpanded = new Set(sortedApplications.map(app => app.id))
                    setExpandedId(Array.from(allExpanded)[0] || null)
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Développer tout
                </button>
                
                <button
                  onClick={() => setExpandedId(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Réduire tout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}