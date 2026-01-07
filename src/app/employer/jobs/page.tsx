'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  Plus, Eye, Edit, Users, Clock, MapPin, 
  Filter, Search, Calendar, CheckCircle, XCircle,
  MoreVertical, ExternalLink
} from 'lucide-react'

interface JobOffer {
  id: string
  title: string
  location: string | null
  created_at: string
  is_active: boolean
  applications_count: number
  pending_applications: number
  views_count: number
}

export default function EmployerJobs() {
  const router = useRouter()
  const supabase = createClient()
  
  const [jobs, setJobs] = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    applications: 0,
    pending: 0
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
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

      // Récupérer les offres avec le compte des applications
      const { data: jobsData, error } = await supabase
        .from('job_offers')
        .select(`
          *,
          applications!left (
            id,
            status
          )
        `)
        .eq('employer_id', employer.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedJobs: JobOffer[] = (jobsData || []).map(job => {
        const applications = job.applications || []
        const pending = applications.filter((app: any) => app.status === 'pending').length
        
        return {
          id: job.id,
          title: job.title,
          location: job.location,
          created_at: job.created_at,
          is_active: job.is_active,
          applications_count: applications.length,
          pending_applications: pending,
          views_count: job.views_count || 0
        }
      })

      setJobs(formattedJobs)
      
      // Calculer les stats
      const stats = {
        total: formattedJobs.length,
        active: formattedJobs.filter(j => j.is_active).length,
        applications: formattedJobs.reduce((acc, job) => acc + job.applications_count, 0),
        pending: formattedJobs.reduce((acc, job) => acc + job.pending_applications, 0)
      }
      setStats(stats)

    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    })
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && job.is_active) ||
      (statusFilter === 'inactive' && !job.is_active)
    
    return matchesSearch && matchesStatus
  })

  const toggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('job_offers')
        .update({ is_active: !currentStatus })
        .eq('id', jobId)

      if (error) throw error

      // Mettre à jour localement
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, is_active: !currentStatus } : job
      ))
    } catch (error) {
      console.error('Error toggling job status:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-normal text-black mb-2">
                Mes offres d'emploi
              </h1>
              <p className="text-gray-600 text-sm">
                Gérez et suivez vos offres publiées
              </p>
            </div>
            
            <button
              onClick={() => router.push('/employer/jobs/create')}
              className="px-4 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouvelle offre
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Offres totales</div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.active}</div>
              <div className="text-sm text-gray-600">Offres actives</div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.applications}</div>
              <div className="text-sm text-gray-600">Candidatures</div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</div>
              <div className="text-sm text-gray-600">En attente</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une offre..."
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
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="focus:outline-none bg-transparent"
                >
                  <option value="all">Toutes les offres</option>
                  <option value="active">Actives</option>
                  <option value="inactive">Inactives</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-3 text-gray-600">Chargement de vos offres...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 border border-gray-300">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune offre publiée
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre première offre d'emploi
            </p>
            <button
              onClick={() => router.push('/employer/job/create')}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Créer une offre
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border border-gray-300">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 text-lg">{job.title}</h3>
                        {job.is_active ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(job.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {job.views_count} vues
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => router.push(`/employer/jobs/${job.id}/applications`)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Voir les candidatures"
                      >
                        <Users className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => router.push(`/employer/jobs/${job.id}/edit`)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Applications Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {job.applications_count} candidature{job.applications_count !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      {job.pending_applications > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-yellow-700">
                            {job.pending_applications} en attente
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/jobs/${job.id}`)}
                        className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Voir l'offre
                      </button>
                      
                      <button
                        onClick={() => toggleJobStatus(job.id, job.is_active)}
                        className={`px-3 py-1 text-sm ${
                          job.is_active 
                            ? 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                            : 'text-green-700 hover:text-green-900 border border-green-300 hover:border-green-400'
                        }`}
                      >
                        {job.is_active ? 'Désactiver' : 'Activer'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {filteredJobs.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
            {filteredJobs.length} offre{filteredJobs.length !== 1 ? 's' : ''} affichée{filteredJobs.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}