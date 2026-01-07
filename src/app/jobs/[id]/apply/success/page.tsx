'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Briefcase, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ApplicationSuccess() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const jobId = params.id as string

  useEffect(() => {
    // Incrémenter le compteur de vues
    if (jobId) {
      supabase.rpc('increment_job_offer_views', { job_id: jobId })
    }
  }, [jobId, supabase])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-normal text-black mb-3">
            Candidature envoyée !
          </h1>
          
          <p className="text-gray-600 mb-6">
            Votre candidature a été soumise avec succès. Le recruteur la consultera bientôt.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 border border-gray-200 rounded-lg text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded">
                <Briefcase className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Prochaines étapes</p>
                <p className="text-sm text-gray-600">Le recruteur vous contactera par email</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Vérifiez vos emails</p>
                <p className="text-sm text-gray-600">Consultez régulièrement votre boîte de réception</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/jobs')}
            className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Voir d'autres offres
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 border border-gray-300 hover:border-gray-400 transition-colors"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  )
}