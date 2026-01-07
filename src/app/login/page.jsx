'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Vérifier si déjà connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      router.push('/admin')
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Stocker l'état de connexion
        localStorage.setItem('isLoggedIn', 'true')
        router.push(redirect)
      } else {
        setError(data.error || 'Erreur de connexion')
      }
    } catch (err) {
      setError('Erreur réseau')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Accès protégé à la zone d&apos;administration
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="login" className="sr-only">
                Login
              </label>
              <input
                id="login"
                name="login"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Login (admin)"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe (admin)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700 text-center">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
          
          <div className="text-center">
            <a
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500 text-sm"
            >
              ← Retour à l&apos;accueil
            </a>
          </div>
        </form>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            <strong>Identifiants de test:</strong> login: <code>admin</code> / mot de passe: <code>admin</code>
          </p>
        </div>
      </div>
    </div>
  )
}