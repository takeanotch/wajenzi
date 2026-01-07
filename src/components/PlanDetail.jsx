'use client';

import { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function PlanDetail({ plan, onBack, onEdit }) {
    const [activeImage, setActiveImage] = useState(plan.image_urls?.plan_2d || '');
    const [activeTab, setActiveTab] = useState('details');

    const imageLabels = {
        plan_2d: 'Plan 2D',
        plan_cote: 'Plan en côte',
        plan_implentation: 'Plan d\'implantation',
        image_ambiance: 'Image d\'ambiance',
        image_4: 'Image 4',
        image_5: 'Image 5'
    };

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

    const images = plan.image_urls ? Object.entries(plan.image_urls)
        .filter(([_, url]) => url && url.trim() !== '')
        .map(([key, url]) => ({ key, url, label: imageLabels[key] || key })) : [];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour à la liste
                </button>
                
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{plan.nom_plan}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plan.statut)}`}>
                                {plan.statut}
                            </span>
                            <span className={`px-3 py-1 rounded text-sm font-medium border ${getTypeColor(plan.type_projet)}`}>
                                {plan.type_projet}
                            </span>
                        </div>
                        <p className="text-gray-600 text-lg">Code: <span className="font-mono font-medium">{plan.code_plan}</span></p>
                    </div>
                    
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Modifier
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'details'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Détails du plan
                    </button>
                    <button
                        onClick={() => setActiveTab('images')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'images'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Galerie ({images.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('commercial')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'commercial'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Informations commerciales
                    </button>
                </nav>
            </div>

            {activeTab === 'details' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Caractéristiques techniques</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Surface totale</p>
                                    <p className="text-lg font-semibold">{plan.surface_totale} m²</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Nombre de pièces</p>
                                    <p className="text-lg font-semibold">{plan.nombre_pieces}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Nombre de niveaux</p>
                                    <p className="text-lg font-semibold">{plan.nombre_niveaux}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Hauteur totale</p>
                                    <p className="text-lg font-semibold">{plan.hauteur_totale} m</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations générales</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Auteur</p>
                                    <p className="font-medium">{plan.auteur}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Date de création</p>
                                    <p className="font-medium">{formatDate(plan.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Dernière modification</p>
                                    <p className="font-medium">{formatDate(plan.updated_at || plan.created_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white shadow-sm rounded-lg p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Aperçu du plan</h2>
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                {activeImage ? (
                                    <img 
                                        src={activeImage} 
                                        alt="Plan principal" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            
                            {images.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {images.map((img) => (
                                        <button
                                            key={img.key}
                                            onClick={() => setActiveImage(img.url)}
                                            className={`aspect-square rounded overflow-hidden border-2 ${
                                                activeImage === img.url ? 'border-blue-500' : 'border-transparent'
                                            }`}
                                        >
                                            <img 
                                                src={img.url} 
                                                alt={img.label}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'images' && (
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Galerie d'images</h2>
                    
                    {images.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-4 text-gray-500">Aucune image disponible</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {images.map((img) => (
                                <div key={img.key} className="border rounded-lg overflow-hidden">
                                    <div className="aspect-video bg-gray-100">
                                        <img 
                                            src={img.url} 
                                            alt={img.label}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-900">{img.label}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'commercial' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations de vente</h2>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Prix</p>
                                <p className="text-3xl font-bold text-blue-600">
                                    {formatCurrency(plan.prix_plan)}
                                </p>
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Type de vente</p>
                                <p className="font-medium capitalize">{plan.type_vente}</p>
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Droits d'utilisation</p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {plan.droits_utilisation || 'Aucune information spécifiée'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-500">Statut actuel</p>
                                    <p className="text-lg font-semibold capitalize">{plan.statut}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full ${getStatusColor(plan.statut)}`}>
                                    {plan.statut}
                                </div>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Identifiant unique</p>
                                <p className="font-mono text-sm break-all">{plan.id}</p>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500 mb-1">Date de création</p>
                                <p className="font-medium">{formatDate(plan.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}