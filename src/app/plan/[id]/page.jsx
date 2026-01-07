'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPlan();
    }
  }, [params.id]);

  async function fetchPlan() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      
      setPlan(data);
      
      // Définir l'image active par défaut
      if (data.image_urls?.plan_2d) {
        setActiveImage(data.image_urls.plan_2d);
      } else if (data.image_urls) {
        // Trouver la première image disponible
        const firstImage = Object.values(data.image_urls).find(img => img);
        if (firstImage) {
          setActiveImage(firstImage);
        }
      }
    } catch (error) {
      console.error('Error fetching plan:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(amount) {
    if (!amount) return 'Sur demande';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function getStatusText(statut) {
    switch (statut) {
      case 'publie': return 'Publié';
      case 'brouillon': return 'Brouillon';
      case 'vendu': return 'Vendu';
      case 'archive': return 'Archivé';
      default: return statut;
    }
  }

  function getTypeText(type) {
    switch (type) {
      case 'maison': return 'Maison';
      case 'villa': return 'Villa';
      case 'immeuble': return 'Immeuble';
      case 'bureau': return 'Bureau';
      case 'appartement': return 'Appartement';
      default: return type;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="aspect-[16/9] bg-gray-200 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  // Collecter toutes les images disponibles
  const availableImages = plan.image_urls ? 
    Object.entries(plan.image_urls)
      .filter(([key, url]) => url && url.trim() !== '')
      .map(([key, url]) => ({ 
        key, 
        url,
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })) : [];

  return (
    <div className="min-h-screen z-0 mt-14 bg-white">
      {/* Header */}
      <header className="sticky top-0  bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </button>
            <div className="text-sm text-gray-500">
              {plan.code_plan}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Titre et informations principales */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.nom_plan}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">{getTypeText(plan.type_projet)}</span>
            <span>•</span>
            <span>Par {plan.auteur}</span>
            <span>•</span>
            <span>Créé le {new Date(plan.created_at).toLocaleDateString('fr-FR')}</span>
            <span>•</span>
            <span className={`px-2 py-1 ${plan.statut === 'publie' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {getStatusText(plan.statut)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Image principale et galerie */}
          <div className="lg:col-span-2">
            {/* Image principale */}
            <div className="mb-6 border border-gray-200">
              <div className="relative aspect-[16/9] bg-gray-100">
                {activeImage && !imageError ? (
                  <img
                    src={activeImage}
                    alt={plan.nom_plan}
                    className="w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">Image non disponible</p>
                  </div>
                )}
              </div>
            </div>

            {/* Galerie d'images */}
            {availableImages.length > 1 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Vues disponibles</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {availableImages.map((img) => (
                    <button
                      key={img.key}
                      onClick={() => {
                        setActiveImage(img.url);
                        setImageError(false);
                      }}
                      className={`aspect-square border-2 overflow-hidden ${
                        activeImage === img.url ? 'border-gray-900' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover hover:opacity-90"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Droits d'utilisation */}
            {plan.droits_utilisation && (
              <div className="border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Conditions d'utilisation</h2>
                <p className="text-gray-700 whitespace-pre-line">{plan.droits_utilisation}</p>
              </div>
            )}
          </div>

          {/* Colonne droite - Informations détaillées */}
          <div className="space-y-6">
            {/* Prix */}
            <div className="border border-gray-200 p-6">
              <div className="text-sm text-gray-500 mb-2">PRIX DU PLAN</div>
              <div className="text-3xl font-bold text-gray-900 mb-4">{formatCurrency(plan.prix_plan)}</div>
              <div className="text-sm text-gray-600 capitalize">
                Type de vente: {plan.type_vente || 'Standard'}
              </div>
            </div>

            {/* Caractéristiques techniques */}
            <div className="border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Surface totale</span>
                  <span className="font-medium text-gray-900">{plan.surface_totale || '—'} m²</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Nombre de pièces</span>
                  <span className="font-medium text-gray-900">{plan.nombre_pieces || '—'}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Nombre de niveaux</span>
                  <span className="font-medium text-gray-900">{plan.nombre_niveaux || '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hauteur totale</span>
                  <span className="font-medium text-gray-900">{plan.hauteur_totale || '—'} m</span>
                </div>
              </div>
            </div>

            {/* Code du plan */}
            <div className="border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Identification</h2>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Code du plan</div>
                  <div className="font-mono text-lg text-gray-900">{plan.code_plan}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">ID unique</div>
                  <div className="font-mono text-sm text-gray-600 truncate">{plan.id}</div>
                </div>
              </div>
            </div>

            {/* Bouton d'action */}
            <button
              onClick={() => alert('Fonctionnalité de contact à implémenter')}
              className="w-full bg-black text-white py-3 text-center font-medium hover:bg-gray-800 transition-colors"
            >
              Contacter pour l'achat
            </button>
          </div>
        </div>

        {/* Plans similaires (optionnel) */}
        {/* <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Plans similaires</h2>
          // Ici vous pourriez ajouter une section de plans similaires
        </div> */}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Tous les plans sont protégés par des droits d'auteur
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}