'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Plus, X, Briefcase, MapPin, DollarSign, Calendar, FileText } from 'lucide-react'

export default function CreateJobOffer() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: [''],
    location: '',
    work_type: 'full_time' as 'full_time' | 'part_time' | 'contract' | 'remote' | 'hybrid',
    experience_level: 'mid' as 'internship' | 'entry' | 'mid' | 'senior' | 'lead',
    salary_min: '',
    salary_max: '',
    sectors: [''],
    skills_required: [''],
    deadline: '',
    is_active: true
  })

  const workTypes = [
    { value: 'full_time', label: 'Temps plein' },
    { value: 'part_time', label: 'Temps partiel' },
    { value: 'contract', label: 'Contrat' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybride' }
  ]

  const experienceLevels = [
    { value: 'internship', label: 'Stage' },
    { value: 'entry', label: 'Débutant' },
    { value: 'mid', label: 'Intermédiaire' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead/Manager' }
  ]

  const addItem = (field: 'requirements' | 'sectors' | 'skills_required') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeItem = (field: 'requirements' | 'sectors' | 'skills_required', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const updateItem = (field: 'requirements' | 'sectors' | 'skills_required', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Non authentifié')

      // Récupérer l'employer_id
      const { data: employer, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (employerError || !employer) throw new Error('Profil employeur non trouvé')

      // Validation
      if (!formData.title.trim()) throw new Error('Le titre est requis')
      if (!formData.description.trim()) throw new Error('La description est requise')

      // Filtrer les tableaux vides
      const requirements = formData.requirements.filter(req => req.trim() !== '')
      const sectors = formData.sectors.filter(sector => sector.trim() !== '')
      const skills_required = formData.skills_required.filter(skill => skill.trim() !== '')

      const jobData = {
        employer_id: employer.id,
        title: formData.title,
        description: formData.description,
        requirements: requirements.length > 0 ? requirements : null,
        location: formData.location || null,
        work_type: formData.work_type,
        experience_level: formData.experience_level,
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : null,
        sectors: sectors.length > 0 ? sectors : null,
        skills_required: skills_required.length > 0 ? skills_required : null,
        deadline: formData.deadline || null,
        is_active: formData.is_active
      }

      const { error: insertError } = await supabase
        .from('job_offers')
        .insert([jobData])

      if (insertError) throw insertError

      router.push('/employer/jobs')
      router.refresh()

    } catch (error: any) {
      console.error('Error creating job:', error)
      setError(error.message || 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-normal text-black mb-2">
            Créer une nouvelle offre d'emploi
          </h1>
          <p className="text-gray-600 text-sm">
            Remplissez les détails de votre offre pour attirer les meilleurs talents
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">Informations de base</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du poste *
              </label>
              <div className="flex items-center gap-3 p-3 border border-gray-300">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="flex-1 focus:outline-none"
                  placeholder="Ex: Développeur Full Stack Senior"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <div className="flex items-center gap-3 p-3 border border-gray-300">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="flex-1 focus:outline-none"
                  placeholder="Ex: Paris, Remote, Hybride..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de travail
                </label>
                <select
                  value={formData.work_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, work_type: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                >
                  {workTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'expérience
                </label>
                <select
                  value={formData.experience_level}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience_level: e.target.value as any }))}
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none"
                >
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salaire minimum (€)
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-300">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.salary_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary_min: e.target.value }))}
                    className="flex-1 focus:outline-none"
                    placeholder="Ex: 40000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salaire maximum (€)
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-300">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.salary_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary_max: e.target.value }))}
                    className="flex-1 focus:outline-none"
                    placeholder="Ex: 60000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date limite
              </label>
              <div className="flex items-center gap-3 p-3 border border-gray-300">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="flex-1 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Description et exigences */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900 pb-2 border-b">Description et exigences</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description du poste *
              </label>
              <div className="p-3 border border-gray-300">
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full focus:outline-none resize-none"
                  placeholder="Décrivez les responsabilités, missions, environnement de travail..."
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Exigences
                </label>
                <button
                  type="button"
                  onClick={() => addItem('requirements')}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateItem('requirements', index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 focus:border-black focus:outline-none"
                      placeholder="Ex: 3+ ans d'expérience en React"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('requirements', index)}
                        className="p-3 text-gray-400 hover:text-gray-600 border border-gray-300 hover:border-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Compétences requises
                </label>
                <button
                  type="button"
                  onClick={() => addItem('skills_required')}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.skills_required.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateItem('skills_required', index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 focus:border-black focus:outline-none"
                      placeholder="Ex: React, TypeScript, Node.js"
                    />
                    {formData.skills_required.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('skills_required', index)}
                        className="p-3 text-gray-400 hover:text-gray-600 border border-gray-300 hover:border-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Secteurs
                </label>
                <button
                  type="button"
                  onClick={() => addItem('sectors')}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.sectors.map((sector, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={sector}
                      onChange={(e) => updateItem('sectors', index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 focus:border-black focus:outline-none"
                      placeholder="Ex: Technologie, Finance, Santé"
                    />
                    {formData.sectors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem('sectors', index)}
                        className="p-3 text-gray-400 hover:text-gray-600 border border-gray-300 hover:border-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 border border-red-300 bg-red-50">
              <div className="flex items-center gap-2 text-red-700">
                <X className="w-5 h-5" />
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 hover:border-black transition-colors"
            >
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? 'Création...' : (
                <>
                  <Plus className="w-5 h-5" />
                  Publier l'offre
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}