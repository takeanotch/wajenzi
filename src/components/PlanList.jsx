'use client';

import { supabase } from '@/lib/supabase';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function PlanList({ plans, onSelectPlan, onEditPlan, onRefresh }) {
    const getStatusColor = (statut) => {
        switch(statut) {
            case 'publie': return 'bg-green-100 text-green-800';
            case 'brouillon': return 'bg-yellow-100 text-yellow-800';
            case 'vendu': return 'bg-blue-100 text-blue-800';
            case 'archive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch(type) {
            case 'maison': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'villa': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'immeuble': return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'bureau': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    async function deletePlan(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce plan ?')) return;
        
        try {
            const { error } = await supabase
                .from('plans')
                .delete()
                .eq('id', id);

            if (error) throw error;
            onRefresh();
        } catch (error) {
            console.error('Error deleting plan:', error);
            alert('Erreur lors de la suppression');
        }
    }

    if (plans.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun plan disponible</h3>
                <p className="text-gray-500">Commencez par ajouter votre premier plan</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    {/* Image principale */}
                    <div 
                        className="h-48 bg-gray-100 cursor-pointer relative overflow-hidden"
                        onClick={() => onSelectPlan(plan)}
                    >
                        {plan.image_urls?.plan_2d ? (
                            <img 
                                src={plan.image_urls.plan_2d} 
                                alt={plan.nom_plan}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                        <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.statut)}`}>
                                {plan.statut}
                            </span>
                        </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 
                                    className="font-bold text-lg text-gray-900 cursor-pointer hover:text-blue-600"
                                    onClick={() => onSelectPlan(plan)}
                                >
                                    {plan.nom_plan}
                                </h3>
                                <p className="text-sm text-gray-500">{plan.code_plan}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(plan.type_projet)}`}>
                                {plan.type_projet}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-gray-600">Surface:</div>
                                <div className="font-medium">{plan.surface_totale} m²</div>
                                
                                <div className="text-gray-600">Pièces:</div>
                                <div className="font-medium">{plan.nombre_pieces}</div>
                                
                                <div className="text-gray-600">Niveaux:</div>
                                <div className="font-medium">{plan.nombre_niveaux}</div>
                                
                                <div className="text-gray-600">Prix:</div>
                                <div className="font-medium text-blue-600">
                                    {formatCurrency(plan.prix_plan)}
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-gray-500 mb-4">
                            <p>Auteur: {plan.auteur}</p>
                            <p>Créé le: {formatDate(plan.created_at)}</p>
                        </div>

                        <div className="flex justify-between pt-4 border-t">
                            <button
                                onClick={() => onSelectPlan(plan)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                                Voir détails
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEditPlan(plan)}
                                    className="text-gray-600 hover:text-gray-900 text-sm"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => deletePlan(plan.id)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}