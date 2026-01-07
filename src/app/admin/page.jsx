// 'use client';

// import { useState, useEffect } from 'react';
// import PlanList from '@/components/PlanList';
// import PlanForm from '@/components/PlanForm';
// import PlanDetail from '@/components/PlanDetail';
// import { supabase } from '@/lib/supabase';

// export default function HomePage() {
//     const [plans, setPlans] = useState([]);
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [view, setView] = useState('list'); // 'list', 'detail', 'form'
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterType, setFilterType] = useState('tous');

//     useEffect(() => {
//         fetchPlans();
//     }, []);

//     async function fetchPlans() {
//         try {
//             setLoading(true);
//             const { data, error } = await supabase
//                 .from('plans')
//                 .select('*')
//                 .order('created_at', { ascending: false });

//             if (error) throw error;
//             setPlans(data || []);
//         } catch (error) {
//             console.error('Error fetching plans:', error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const filteredPlans = plans.filter(plan => {
//         const matchesSearch = plan.nom_plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             plan.code_plan.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesType = filterType === 'tous' || plan.type_projet === filterType;
//         return matchesSearch && matchesType;
//     });

//     return (
//         <div className="min-h-screen mt-14 bg-gray-50">
//             <header className="bg-white shadow-sm border-b">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                     <div className="flex justify-between items-center">
//                         <h1 className="text-2xl font-bold text-gray-900">Système de Vente de Plans</h1>
//                         <button
//                             onClick={() => {
//                                 setView('form');
//                                 setSelectedPlan(null);
//                             }}
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
//                         >
//                             + Nouveau Plan
//                         </button>
//                     </div>
//                 </div>
//             </header>

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {view === 'list' && (
//                     <div className="mb-6">
//                         <div className="flex flex-col md:flex-row gap-4 mb-6">
//                             <div className="flex-1">
//                                 <input
//                                     type="text"
//                                     placeholder="Rechercher un plan..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                             </div>
//                             <select
//                                 value={filterType}
//                                 onChange={(e) => setFilterType(e.target.value)}
//                                 className="px-4 py-2 border border-gray-300 rounded-lg"
//                             >
//                                 <option value="tous">Tous les types</option>
//                                 <option value="maison">Maison</option>
//                                 <option value="villa">Villa</option>
//                                 <option value="immeuble">Immeuble</option>
//                                 <option value="bureau">Bureau</option>
//                                 <option value="appartement">Appartement</option>
//                                 <option value="autre">Autre</option>
//                             </select>
//                         </div>

//                         {loading ? (
//                             <div className="text-center py-12">
//                                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                                 <p className="mt-2 text-gray-600">Chargement des plans...</p>
//                             </div>
//                         ) : (
//                             <PlanList 
//                                 plans={filteredPlans}
//                                 onSelectPlan={(plan) => {
//                                     setSelectedPlan(plan);
//                                     setView('detail');
//                                 }}
//                                 onEditPlan={(plan) => {
//                                     setSelectedPlan(plan);
//                                     setView('form');
//                                 }}
//                                 onRefresh={fetchPlans}
//                             />
//                         )}
//                     </div>
//                 )}

//                 {view === 'detail' && selectedPlan && (
//                     <PlanDetail 
//                         plan={selectedPlan}
//                         onBack={() => setView('list')}
//                         onEdit={() => {
//                             setView('form');
//                         }}
//                     />
//                 )}

//                 {view === 'form' && (
//                     <PlanForm 
//                         plan={selectedPlan}
//                         onSuccess={() => {
//                             setView('list');
//                             fetchPlans();
//                         }}
//                         onCancel={() => setView('list')}
//                     />
//                 )}
//             </main>

//             <footer className="bg-white border-t mt-8">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <p className="text-center text-gray-500 text-sm">
//                         © {new Date().getFullYear()} Système de Vente de Plans - MVP
//                     </p>
//                 </div>
//             </footer>
//         </div>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import PlanList from '@/components/PlanList';
import PlanForm from '@/components/PlanForm';
import PlanDetail from '@/components/PlanDetail';
import { supabase } from '@/lib/supabase';
import AuthGuard from '@/components/AuthGuard';
import { useRouter } from 'next/navigation';

function AdminContent() {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list'); // 'list', 'detail', 'form'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('tous');
    const router = useRouter();

    useEffect(() => {
        fetchPlans();
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        router.push('/login');
    };

    const filteredPlans = plans.filter(plan => {
        const matchesSearch = plan.nom_plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            plan.code_plan.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'tous' || plan.type_projet === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header avec bouton déconnexion */}
            <header className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        <h1 className="text-xl font-bold text-gray-900">Système de Vente de Plans</h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100 transition"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal avec marge pour le header fixe */}
            <div className="pt-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Bouton Nouveau Plan seulement sur la vue liste */}
                    {view === 'list' && (
                        <div className="mb-6 flex justify-between items-center">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Rechercher un plan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="ml-4 flex gap-3">
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="tous">Tous les types</option>
                                    <option value="maison">Maison</option>
                                    <option value="villa">Villa</option>
                                    <option value="immeuble">Immeuble</option>
                                    <option value="bureau">Bureau</option>
                                    <option value="appartement">Appartement</option>
                                    <option value="autre">Autre</option>
                                </select>
                                <button
                                    onClick={() => {
                                        setView('form');
                                        setSelectedPlan(null);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium whitespace-nowrap"
                                >
                                    + Nouveau Plan
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Bouton Retour pour les autres vues */}
                    {view !== 'list' && (
                        <button
                            onClick={() => setView('list')}
                            className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Retour à la liste
                        </button>
                    )}

                    {view === 'list' && (
                        <>
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <p className="mt-2 text-gray-600">Chargement des plans...</p>
                                </div>
                            ) : (
                                <PlanList 
                                    plans={filteredPlans}
                                    onSelectPlan={(plan) => {
                                        setSelectedPlan(plan);
                                        setView('detail');
                                    }}
                                    onEditPlan={(plan) => {
                                        setSelectedPlan(plan);
                                        setView('form');
                                    }}
                                    onRefresh={fetchPlans}
                                />
                            )}
                        </>
                    )}

                    {view === 'detail' && selectedPlan && (
                        <PlanDetail 
                            plan={selectedPlan}
                            onBack={() => setView('list')}
                            onEdit={() => {
                                setView('form');
                            }}
                        />
                    )}

                    {view === 'form' && (
                        <PlanForm 
                            plan={selectedPlan}
                            onSuccess={() => {
                                setView('list');
                                fetchPlans();
                            }}
                            onCancel={() => setView('list')}
                        />
                    )}
                </div>
            </div>

            <footer className="bg-white border-t mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Système de Vente de Plans - Accès protégé
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default function AdminPage() {
    return (
        <AuthGuard>
            <AdminContent />
        </AuthGuard>
    );
}