'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Search, MapPin, Briefcase, Clock, Eye, DollarSign, Filter, X } from 'lucide-react'

interface JobOffer {
  id: string
  title: string
  description: string
  location: string | null
  work_type: string
  experience_level: string
  salary_min: number | null
  salary_max: number | null
  created_at: string
  views_count: number
  company_name: string
  company_logo: string | null
}

export default function JobOffersList() {
  const router = useRouter()
  const supabase = createClient()
  const [jobs, setJobs] = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    work_type: '',
    experience_level: '',
    location: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
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
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedJobs = (data || []).map(job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        work_type: job.work_type,
        experience_level: job.experience_level,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        created_at: job.created_at,
        views_count: job.views_count,
        company_name: job.employers?.company_name || 'Entreprise',
        company_logo: job.employers?.company_logo
      }))

      setJobs(formattedJobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24))
    
    if (diffDays === 0) return "Aujourd'hui"
    if (diffDays === 1) return 'Hier'
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`
    return `Il y a ${Math.floor(diffDays / 30)} mois`
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Non spécifié'
    if (min && !max) return `À partir de ${min}€`
    if (!min && max) return `Jusqu'à ${max}€`
    return `${min}€ - ${max}€`
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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesWorkType = !filters.work_type || job.work_type === filters.work_type
    const matchesExperience = !filters.experience_level || job.experience_level === filters.experience_level
    const matchesLocation = !filters.location || 
      (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()))
    
    return matchesSearch && matchesWorkType && matchesExperience && matchesLocation
  })

  const clearFilters = () => {
    setFilters({
      work_type: '',
      experience_level: '',
      location: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-black mb-2">
            Offres d'emploi disponibles
          </h1>
          <p className="text-gray-600 text-sm">
            Découvrez les opportunités correspondant à votre profil
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par titre, entreprise, compétence..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 p-2 border border-gray-300 bg-white">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filters.work_type}
                onChange={(e) => setFilters(prev => ({ ...prev, work_type: e.target.value }))}
                className="text-sm focus:outline-none bg-transparent"
              >
                <option value="">Type de travail</option>
                <option value="full_time">Temps plein</option>
                <option value="part_time">Temps partiel</option>
                <option value="contract">Contrat</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybride</option>
              </select>
            </div>

            <div className="flex items-center gap-2 p-2 border border-gray-300 bg-white">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filters.experience_level}
                onChange={(e) => setFilters(prev => ({ ...prev, experience_level: e.target.value }))}
                className="text-sm focus:outline-none bg-transparent"
              >
                <option value="">Niveau d'expérience</option>
                <option value="internship">Stage</option>
                <option value="entry">Débutant</option>
                <option value="mid">Intermédiaire</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead/Manager</option>
              </select>
            </div>

            <div className="flex items-center gap-2 p-2 border border-gray-300 bg-white">
              <MapPin className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Localisation"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="text-sm focus:outline-none w-32"
              />
            </div>

            {(filters.work_type || filters.experience_level || filters.location) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400"
              >
                <X className="w-4 h-4" />
                Effacer les filtres
              </button>
            )}
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-4 text-sm text-gray-600">
          {filteredJobs.length} offre{filteredJobs.length !== 1 ? 's' : ''} trouvée{filteredJobs.length !== 1 ? 's' : ''}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-3 text-gray-600">Chargement des offres...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 border border-gray-300 bg-white">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Aucune offre ne correspond à vos critères</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white border border-gray-300 hover:border-gray-400 transition-colors">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      {job.company_logo ? (
                        <div className="w-12 h-12 border border-gray-300 overflow-hidden bg-white">
                          <img
                            src={job.company_logo}
                            alt={job.company_name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 border border-gray-300 flex items-center justify-center bg-gray-50">
                          <Briefcase className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900 text-lg mb-1">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.company_name}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </button>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        {job.location && (
                          <span className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-gray-600">
                          <Briefcase className="w-4 h-4" />
                          {formatWorkType(job.work_type)}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          {formatSalary(job.salary_min, job.salary_max)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />
                        {formatDate(job.created_at)}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {job.views_count} vue{job.views_count !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => router.push(`/jobs/${job.id}/apply`)}
                      className="w-full py-2.5 bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                    >
                      Postuler maintenant
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}