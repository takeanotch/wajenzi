'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Search, Filter, Calendar, MapPin, Briefcase, 
  Clock, CheckCircle, XCircle, Eye, ExternalLink,
  FileText, Building, DollarSign, ChevronDown, ChevronUp,
  RefreshCw
} from 'lucide-react'

interface Application {
  id: string
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted'
  created_at: string
  cover_letter: string | null
  job: {
    id: string
    title: string
    location: string | null
    work_type: string
    salary_min: number | null
    salary_max: number | null
    company_name: string
    company_logo: string | null
  }
}

export default function SeekerApplications() {
  const router = useRouter()
  const supabase = createClient()
  
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Récupérer le profil seeker
      const { data: seeker } = await supabase
        .from('seekers')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (!seeker) {
        router.push('/seeker/profile')
        return
      }

      // Récupérer toutes les candidatures avec les détails du job
      const { data } = await supabase
        .from('applications')
        .select(`
          id,
          status,
          created_at,
          cover_letter,
          job_offer:job_offers!inner(
            id,
            title,
            location,
            work_type,
            salary_min,
            salary_max,
            employer:employers!inner(
              company_name,
              company_logo
            )
          )
        `)
        .eq('seeker_id', seeker.id)
        .order('created_at', { ascending: false })

      const formatted: Application[] = (data || []).map((app: any) => ({
        id: app.id,
        status: app.status,
        created_at: app.created_at,
        cover_letter: app.cover_letter,
        job: {
          id: app.job_offer.id,
          title: app.job_offer.title,
          location: app.job_offer.location,
          work_type: app.job_offer.work_type,
          salary_min: app.job_offer.salary_min,
          salary_max: app.job_offer.salary_max,
          company_name: app.job_offer.employer?.company_name || 'Entreprise',
          company_logo: app.job_offer.employer?.company_logo
        }
      }))

      setApplications(formatted)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />
      case 'reviewed': return <Eye className="w-5 h-5 text-blue-500" />
      default: return <Clock className="w-5 h-5 text-yellow-500" />
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
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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
      month: 'short',
      year: 'numeric'
    })
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      searchTerm === '' ||
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      statusFilter === 'all' ||
      app.status === statusFilter
    
    return matchesSearch && matchesFilter
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
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-normal text-black mb-2">
              Mes candidatures
            </h1>
            <p className="text-gray-600">
              Suivez l'état de vos candidatures
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</div>
              <div className="text-sm text-gray-600">En attente</div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.reviewed}</div>
              <div className="text-sm text-gray-600">Consultées</div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.accepted}</div>
              <div className="text-sm text-gray-600">Acceptées</div>
            </div>
            
            <div className="border border-gray-300 p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Refusées</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par poste ou entreprise..."
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

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12 border border-gray-300">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {applications.length === 0 
                ? 'Vous n\'avez pas encore postulé'
                : 'Aucune candidature ne correspond aux filtres'}
            </h3>
            <p className="text-gray-600 mb-6">
              {applications.length === 0
                ? 'Commencez par explorer les offres disponibles'
                : 'Essayez de modifier vos critères de recherche'}
            </p>
            <button
              onClick={() => router.push('/jobs')}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Explorer les offres
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div key={app.id} className="border border-gray-300">
                {/* Summary */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        {app.job.company_logo ? (
                          <div className="w-12 h-12 border border-gray-300 overflow-hidden bg-white">
                            <img
                              src={app.job.company_logo}
                              alt={app.job.company_name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 border border-gray-300 bg-gray-50 flex items-center justify-center">
                            <Building className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-lg">
                            {app.job.title}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs rounded ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{app.job.company_name}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                          {app.job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {app.job.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {formatWorkType(app.job.work_type)}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {formatSalary(app.job.salary_min, app.job.salary_max)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Icon */}
                    <div className="ml-4">
                      {getStatusIcon(app.status)}
                    </div>
                  </div>

                  {/* Date and Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Postulée le {formatDate(app.created_at)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/jobs/${app.job.id}`)}
                        className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Voir l'offre
                      </button>
                      
                      <button
                        onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                        className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 ml-2"
                      >
                        {expandedId === app.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        Détails
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === app.id && (
                  <div className="border-t border-gray-300 p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column - Application Details */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Statut de la candidature</h4>
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{getStatusLabel(app.status)}</p>
                              <p className="text-sm text-gray-600">
                                {app.status === 'pending' && 'Votre candidature est en attente de traitement par le recruteur.'}
                                {app.status === 'reviewed' && 'Le recruteur a consulté votre candidature.'}
                                {app.status === 'accepted' && 'Félicitations ! Votre candidature a été acceptée.'}
                                {app.status === 'rejected' && 'Votre candidature n\'a pas été retenue pour ce poste.'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Historique</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <div className="text-sm text-gray-600">
                                Candidature envoyée le {formatDate(app.created_at)}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                app.status === 'pending' ? 'bg-gray-300' : 'bg-green-500'
                              }`}></div>
                              <div className={`text-sm ${
                                app.status === 'pending' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Candidature reçue par l'entreprise
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Cover Letter */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Votre lettre de motivation</h4>
                        {app.cover_letter ? (
                          <div className="p-4 bg-white border border-gray-300 rounded">
                            <p className="text-gray-700 whitespace-pre-line text-sm">
                              {app.cover_letter}
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-white border border-gray-300 rounded text-center">
                            <p className="text-gray-500 text-sm">
                              Aucune lettre de motivation fournie
                            </p>
                          </div>
                        )}
                        
                        {/* Next Steps */}
                        <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded">
                          <h5 className="font-medium text-gray-900 text-sm mb-1">Prochaines étapes</h5>
                          <p className="text-xs text-gray-600">
                            {app.status === 'pending' && 'Le recruteur vous contactera si votre profil l\'intéresse.'}
                            {app.status === 'reviewed' && 'L\'entreprise pourrait vous contacter pour un entretien.'}
                            {app.status === 'accepted' && 'Contactez l\'entreprise pour discuter des modalités.'}
                            {app.status === 'rejected' && 'Continuez à postuler à d\'autres offres qui vous intéressent.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-300">
                      <button
                        onClick={() => router.push(`/jobs/${app.job.id}`)}
                        className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                      >
                        Voir à nouveau l'offre
                      </button>
                      
                      <button
                        onClick={() => router.push('/jobs')}
                        className="px-4 py-2 border border-gray-300 hover:border-gray-400 transition-colors text-sm"
                      >
                        Chercher d'autres offres
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {filteredApplications.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
            {filteredApplications.length} candidature{filteredApplications.length !== 1 ? 's' : ''} affichée{filteredApplications.length !== 1 ? 's' : ''}
            {filteredApplications.length !== applications.length && (
              <span> (sur {applications.length} au total)</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}