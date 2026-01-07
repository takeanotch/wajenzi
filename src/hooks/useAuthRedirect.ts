'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function useAuthRedirect(requireProfileComplete = false) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      try {
        setIsLoading(true)
        
        // 1. Vérifier si l'utilisateur est connecté
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          router.push('/login')
          return
        }

        setUser(user)

        // 2. Récupérer le profil
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Erreur profil:', profileError)
          router.push('/login')
          return
        }

        setProfile(profile)

        // 3. Si on exige un profil complet, vérifier
        if (requireProfileComplete) {
          const isProfileComplete = profile && 
            profile.full_name && 
            profile.phone && 
            (profile.role === 'seeker' ? 
              (profile.date_of_birth && profile.address) : 
              true)

          if (isProfileComplete) {
            router.push('/dashboard')
            return
          }
        }

      } catch (error) {
        console.error('Erreur de vérification:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndProfile()
  }, [router, supabase, requireProfileComplete])

  return { isLoading, user, profile }
}