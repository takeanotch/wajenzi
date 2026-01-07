'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  ArrowLeft, Users, Mail, FileText, Check, X, 
  User, Calendar, MapPin, Briefcase, Download,
  ChevronDown, ChevronUp, Eye, Clock, Filter
} from 'lucide-react'

interface Application {
  id: string
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted'
  created_at: string
  cover_letter: string | null
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
    }
  }
}

export default function JobApplications() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  
  const [applications, setApplications] = useState<Application[]>([])
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  const jobId = params.id as string

  useEffect(() => {
    fetchJobAndApplications()
  }, [jobId])

  const fetchJobAndApplications = async () => {
    try {
      // Récupérer le job
      const { data: jobData } = await supabase
        .from('job_offers')
        .select('*')
        .eq('id', jobId)
        .single()

      if (!jobData) {
        router.push('/employer/jobs')
        return
      }

      setJob(jobData)

      // Récupérer les applications
      const { data: applicationsData } = await supabase
        .from('applications')
        .select(`
          id,
          status,
          created_at,
          cover_letter,
          seeker:seekers(
            id,
            headline,
            location,
            experience_years,
            skills,
            cv_url,
            cv_name,
            profile:profiles(
              full_name,
              email,
              phone,
              avatar_url
            )
          )
        `)
        .eq('job_offer_id', jobId)
        .order('created_at', { ascending: false })

      const formatted: Application[] = (applicationsData || []).map((app: any) => ({
        id: app.id,
        status: app.status,
        created_at: app.created_at,
        cover_letter: app.cover_letter,
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
            cv_name: app.seeker?.cv_name || null
          }
        }
      }))

      setApplications(formatted)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: Application['status']) => {
    setUpdatingStatus(id)
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      setApplications(prev => prev.map(app =>
        app.id === id ? { ...app, status } : app
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdatingStatus(null)
    }
  }

  const downloadCV = (url: string, name: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = name || 'CV.pdf'
    link.click()
  }

  const filteredApplications = applications.filter(app => 
    statusFilter === 'all' || app.status === statusFilter
  )

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
        <div className="mb-6">
          <button
            onClick={() => router.push('/employer/jobs')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux offres
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-normal text-black mb-2">
              {job?.title}
            </h1>
            <p className="text-gray-600">
              {applications.length} candidature{applications.length !== 1 ? 's' : ''} reçue{applications.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {[
              { label: 'Total', value: stats.total, color: 'bg-gray-100' },
              { label: 'En attente', value: stats.pending, color: 'bg-yellow-100' },
              { label: 'Consultées', value: stats.reviewed, color: 'bg-blue-100' },
              { label: 'Acceptées', value: stats.accepted, color: 'bg-green-100' },
              { label: 'Refusées', value: stats.rejected, color: 'bg-red-100' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className={`${stat.color} p-4`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 w-fit">
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
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12 border border-gray-300">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              {applications.length === 0 
                ? 'Aucune candidature reçue pour cette offre'
                : 'Aucune candidature ne correspond au filtre'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApplications.map((app) => (
              <div key={app.id} className="border border-gray-300">
                {/* Summary */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex items-start gap-3 flex-1 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                    >
                      <div className="flex-shrink-0">
                        {app.seeker.profile.avatar_url ? (
                          <img
                            src={app.seeker.profile.avatar_url}
                            alt={app.seeker.profile.full_name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            {app.seeker.profile.full_name}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status === 'pending' ? 'En attente' :
                             app.status === 'reviewed' ? 'Consultée' :
                             app.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">
                          {app.seeker.seeker_data.headline || 'Chercheur d\'emploi'}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          {app.seeker.seeker_data.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {app.seeker.seeker_data.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(app.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => window.open(`mailto:${app.seeker.profile.email}`)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Contacter"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      
                      {app.seeker.seeker_data.cv_url && (
                        <button
                          onClick={() => downloadCV(app.seeker.seeker_data.cv_url!, app.seeker.seeker_data.cv_name || 'CV')}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title="Télécharger CV"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        {expandedId === app.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => updateStatus(app.id, 'reviewed')}
                      disabled={updatingStatus === app.id || app.status === 'reviewed'}
                      className={`px-3 py-1.5 text-sm ${
                        app.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
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
                      <Check className="w-4 h-4 inline mr-1" />
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
                      <X className="w-4 h-4 inline mr-1" />
                      Refuser
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === app.id && (
                  <div className="border-t border-gray-300 p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        {/* Cover Letter */}
                        {app.cover_letter && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Lettre de motivation</h4>
                            <div className="p-3 bg-white border border-gray-300 text-sm">
                              <p className="text-gray-700 whitespace-pre-line">
                                {app.cover_letter}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Skills */}
                        {app.seeker.seeker_data.skills && app.seeker.seeker_data.skills.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Compétences</h4>
                            <div className="flex flex-wrap gap-1">
                              {app.seeker.seeker_data.skills.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white border border-gray-300 text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        {/* Contact Info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                          <div className="space-y-2 p-3 bg-white border border-gray-300">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Email</span>
                              <span className="font-medium">{app.seeker.profile.email}</span>
                            </div>
                            {app.seeker.profile.phone && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Téléphone</span>
                                <span className="font-medium">{app.seeker.profile.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Experience */}
                        {app.seeker.seeker_data.experience_years !== null && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Expérience</h4>
                            <div className="p-3 bg-white border border-gray-300">
                              <p className="text-gray-700">
                                {app.seeker.seeker_data.experience_years} ans
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}