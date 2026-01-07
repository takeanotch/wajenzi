'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  ArrowLeft, MapPin, Briefcase, DollarSign, Calendar, Clock, 
  Users, Check, FileText, Mail, Globe 
} from 'lucide-react'

export default function JobDetail() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const [job, setJob] = useState<any>(null)
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'seeker' | 'employer' | null>(null)

  const jobId = params.id as string

  useEffect(() => {
    fetchJobDetails()
    checkUserRole()
  }, [jobId])

  useEffect(() => {
    if (jobId) {
      // Incrémenter le compteur de vues
      supabase.rpc('increment_job_offer_views', { job_id: jobId })
    }
  }, [jobId, supabase])

  const fetchJobDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('job_offers')
        .select(`
          *,
          employers (
            company_name,
            company_logo,
            description,
            website,
            industry,
            company_size
          )
        `)
        .eq('id', jobId)
        .single()

      if (error) throw error
      
      setJob(data)
      setCompany(data.employers)
    } catch (error) {
      console.error('Error fetching job:', error)
      router.push('/jobs')
    } finally {
      setLoading(false)
    }
  }

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      setUserRole(profile?.role || null)
    } catch (error) {
      console.error('Error checking role:', error)
    }
  }

  const formatWorkType = (type: string) => {
    const types: Record<string, string> = {
      full_time: 'Temps plein',
      part_time: 'Temps partiel',
      contract: 'Contrat',
      remote: 'Remote',
      hybrid: 'Hybride'
    }
    return types[type] || type
  }

  const formatExperienceLevel = (level: string) => {
    const levels: Record<string, string> = {
      internship: 'Stage',
      entry: 'Débutant',
      mid: 'Intermédiaire',
      senior: 'Senior',
      lead: 'Lead/Manager'
    }
    return levels[level] || level
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Non spécifié'
    if (min && !max) return `À partir de ${min}€`
    if (!min && max) return `Jusqu'à ${max}€`
    return `${min}€ - ${max}€`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-medium text-gray-900 mb-2">Offre non trouvée</h1>
          <button
            onClick={() => router.push('/jobs')}
            className="text-gray-600 hover:text-gray-800"
          >
            Retour aux offres
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                {company?.company_logo ? (
                  <div className="w-16 h-16 border border-gray-300 overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={company.company_logo}
                      alt={company.company_name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 border border-gray-300 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                
                <div>
                  <h1 className="text-2xl font-normal text-black mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className="text-gray-600">{company?.company_name || 'Entreprise'}</span>
                    {job.location && (
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {job.views_count} vue{job.views_count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {userRole === 'seeker' ? (
                <button
                  onClick={() => router.push(`/jobs/${jobId}/apply`)}
                  className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Postuler maintenant
                </button>
              ) : (
                <button
                  onClick={() => router.push('/signup?role=seeker')}
                  className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Créer un compte pour postuler
                </button>
              )}
              
              <button
                onClick={() => window.print()}
                className="px-6 py-3 border border-gray-300 hover:border-gray-400 transition-colors"
              >
                Imprimer l'offre
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Description du poste</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Exigences</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {job.skills_required && job.skills_required.length > 0 && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Compétences requises</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sectors */}
            {job.sectors && job.sectors.length > 0 && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Secteurs</h2>
                <div className="flex flex-wrap gap-2">
                  {job.sectors.map((sector: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <div className="border border-gray-200 p-5">
              <h3 className="font-medium text-gray-900 mb-4">Détails de l'offre</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Type de travail</p>
                    <p className="font-medium">{formatWorkType(job.work_type)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Niveau d'expérience</p>
                    <p className="font-medium">{formatExperienceLevel(job.experience_level)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Salaire</p>
                    <p className="font-medium">{formatSalary(job.salary_min, job.salary_max)}</p>
                  </div>
                </div>

                {job.deadline && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date limite</p>
                      <p className="font-medium">{formatDate(job.deadline)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Publiée le</p>
                    <p className="font-medium">{formatDate(job.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="border border-gray-200 p-5">
              <h3 className="font-medium text-gray-900 mb-4">À propos de l'entreprise</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-2">{company?.company_name}</p>
                  {company?.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">{company.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  {company?.industry && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{company.industry}</span>
                    </div>
                  )}
                  
                  {company?.company_size && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{company.company_size} employés</span>
                    </div>
                  )}
                  
                  {company?.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Site web
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="border border-gray-200 p-5 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-3">Intéressé par cette offre ?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Postulez maintenant et augmentez vos chances d'être contacté.
              </p>
              
              {userRole === 'seeker' ? (
                <button
                  onClick={() => router.push(`/jobs/${jobId}/apply`)}
                  className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Postuler maintenant
                </button>
              ) : (
                <button
                  onClick={() => router.push('/signup?role=seeker')}
                  className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Créer un compte candidat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}