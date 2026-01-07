'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'tous',
    statut: 'publie', // Par défaut seulement les publiés
    minPieces: '',
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    filterPlans();
  }, [plans, searchTerm, filters]);

  async function fetchPlans() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterPlans() {
    let result = [...plans];

    // Recherche par nom ou code
    if (searchTerm) {
      result = result.filter(plan =>
        plan.nom_plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.code_plan.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par type
    if (filters.type !== 'tous') {
      result = result.filter(plan => plan.type_projet === filters.type);
    }

    // Filtre par statut
    if (filters.statut !== 'tous') {
      result = result.filter(plan => plan.statut === filters.statut);
    }

    // Filtre par nombre minimum de pièces
    if (filters.minPieces) {
      result = result.filter(plan => plan.nombre_pieces >= parseInt(filters.minPieces));
    }

    setFilteredPlans(result);
  }

  function formatCurrency(amount) {
    if (!amount) return 'Sur demande';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  function getStatusColor(statut) {
    switch (statut) {
      case 'publie': return 'bg-green-500';
      case 'vendu': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  }

  function getTypeIcon(type) {
    switch (type) {
      case 'maison': return '🏠';
      case 'villa': return '🏰';
      case 'immeuble': return '🏢';
      case 'bureau': return '💼';
      case 'appartement': return '🏘️';
      default: return '📐';
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-7">
          
        </div>
      </div>

      {/* Filtres Section */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un plan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-900 text-sm"
              >
                <option value="tous">Tous types</option>
                <option value="maison">Maison</option>
                <option value="villa">Villa</option>
                <option value="immeuble">Immeuble</option>
                <option value="bureau">Bureau</option>
                <option value="appartement">Appartement</option>
              </select>

              <select
                value={filters.statut}
                onChange={(e) => setFilters({...filters, statut: e.target.value})}
                className="px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-900 text-sm"
              >
                <option value="tous">Tous statuts</option>
                <option value="publie">Publiés</option>
                <option value="vendu">Vendus</option>
              </select>

              <select
                value={filters.minPieces}
                onChange={(e) => setFilters({...filters, minPieces: e.target.value})}
                className="px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-900 text-sm"
              >
                <option value="">Pièces: Tous</option>
                <option value="1">1+ pièces</option>
                <option value="2">2+ pièces</option>
                <option value="3">3+ pièces</option>
                <option value="4">4+ pièces</option>
                <option value="5">5+ pièces</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Stats */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              {filteredPlans.length} plan{filteredPlans.length !== 1 ? 's' : ''} disponible{filteredPlans.length !== 1 ? 's' : ''}
            </h2>
            <button
              onClick={fetchPlans}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Actualiser
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border border-gray-200 bg-white animate-pulse">
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Empty State */}
            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun plan trouvé</h3>
                <p className="text-gray-500">Modifiez vos critères de recherche</p>
              </div>
            )}

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border border-gray-200 bg-white hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => router.push(`/plan/${plan.id}`)}
                >
                  {/* Image principale */}
                  <div className="relative aspect-[5/3] bg-gray-100 overflow-hidden">
                    {plan.image_urls?.plan_2d ? (
                      <img
                        src={plan.image_urls.plan_2d}
                        alt={plan.nom_plan}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-4xl mb-2">{getTypeIcon(plan.type_projet)}</span>
                        <span className="text-sm text-gray-400">Aucune image</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-block w-2 h-2 ${getStatusColor(plan.statut)}`}></span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-2 py-1">
                      {plan.type_projet}
                    </div>
                  </div>

                  {/* Informations */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{plan.nom_plan}</h3>
                      <p className="text-xs text-gray-500 font-mono">{plan.code_plan}</p>
                    </div>

                    {/* Caractéristiques */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">SURFACE</div>
                        <div className="font-bold text-gray-900">{plan.surface_totale || '—'} m²</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">PIÈCES</div>
                        <div className="font-bold text-gray-900">{plan.nombre_pieces || '—'}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">PRIX</div>
                        <div className="font-bold text-gray-900 text-sm">{formatCurrency(plan.prix_plan)}</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        Par <span className="font-medium">{plan.auteur}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(plan.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Collection de plans architecturaux
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}