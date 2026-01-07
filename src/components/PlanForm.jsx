// 'use client';

// import { useState, useEffect } from 'react';
// import { supabase } from '@/lib/supabase';
// import { generatePlanCode } from '@/lib/utils';
// import ImageUploader from './ImageUploader';

// export default function PlanForm({ plan, onSuccess, onCancel }) {
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         nom_plan: '',
//         type_projet: 'maison',
//         statut: 'brouillon',
//         auteur: '',
//         surface_totale: '',
//         nombre_niveaux: '',
//         hauteur_totale: '',
//         nombre_pieces: '',
//         prix_plan: '',
//         type_vente: 'standard',
//         droits_utilisation: '',
//         image_urls: {
//             plan_2d: '',
//             plan_cote: '',
//             plan_implentation: '',
//             image_ambiance: '',
//             image_4: '',
//             image_5: ''
//         }
//     });

//     useEffect(() => {
//         if (plan) {
//             setFormData({
//                 ...plan,
//                 surface_totale: plan.surface_totale || '',
//                 nombre_niveaux: plan.nombre_niveaux || '',
//                 hauteur_totale: plan.hauteur_totale || '',
//                 nombre_pieces: plan.nombre_pieces || '',
//                 prix_plan: plan.prix_plan || '',
//                 image_urls: plan.image_urls || {
//                     plan_2d: '',
//                     plan_cote: '',
//                     plan_implentation: '',
//                     image_ambiance: '',
//                     image_4: '',
//                     image_5: ''
//                 }
//             });
//         } else {
//             // Générer un nouveau code plan pour les nouvelles entrées
//             setFormData(prev => ({
//                 ...prev,
//                 code_plan: generatePlanCode()
//             }));
//         }
//     }, [plan]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleImageUpdate = (key, url) => {
//         setFormData(prev => ({
//             ...prev,
//             image_urls: {
//                 ...prev.image_urls,
//                 [key]: url
//             }
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const dataToSend = {
//                 ...formData,
//                 surface_totale: parseFloat(formData.surface_totale) || null,
//                 nombre_niveaux: parseInt(formData.nombre_niveaux) || null,
//                 hauteur_totale: parseFloat(formData.hauteur_totale) || null,
//                 nombre_pieces: parseInt(formData.nombre_pieces) || null,
//                 prix_plan: parseFloat(formData.prix_plan) || null
//             };

//             if (plan) {
//                 // Mise à jour
//                 const { error } = await supabase
//                     .from('plans')
//                     .update(dataToSend)
//                     .eq('id', plan.id);

//                 if (error) throw error;
//             } else {
//                 // Création
//                 const { error } = await supabase
//                     .from('plans')
//                     .insert([{
//                         ...dataToSend,
//                         code_plan: formData.code_plan || generatePlanCode()
//                     }]);

//                 if (error) throw error;
//             }

//             onSuccess();
//         } catch (error) {
//             console.error('Error saving plan:', error);
//             alert('Erreur lors de la sauvegarde');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto">
//             <div className="mb-6">
//                 <button
//                     onClick={onCancel}
//                     className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
//                 >
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                     </svg>
//                     Retour à la liste
//                 </button>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                     {plan ? 'Modifier le Plan' : 'Nouveau Plan'}
//                 </h2>
//                 {!plan && (
//                     <p className="text-gray-600 mt-2">
//                         Code généré: <span className="font-mono font-medium">{formData.code_plan}</span>
//                     </p>
//                 )}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="bg-white shadow-sm rounded-lg p-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Informations principales</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Nom du plan *
//                             </label>
//                             <input
//                                 type="text"
//                                 name="nom_plan"
//                                 value={formData.nom_plan}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Ex: Villa Moderne 3 chambres"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Type de projet *
//                             </label>
//                             <select
//                                 name="type_projet"
//                                 value={formData.type_projet}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             >
//                                 <option value="maison">Maison</option>
//                                 <option value="villa">Villa</option>
//                                 <option value="immeuble">Immeuble</option>
//                                 <option value="bureau">Bureau</option>
//                                 <option value="appartement">Appartement</option>
//                                 <option value="autre">Autre</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Statut *
//                             </label>
//                             <select
//                                 name="statut"
//                                 value={formData.statut}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             >
//                                 <option value="brouillon">Brouillon</option>
//                                 <option value="publie">Publié</option>
//                                 <option value="vendu">Vendu</option>
//                                 <option value="archive">Archivé</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Auteur *
//                             </label>
//                             <input
//                                 type="text"
//                                 name="auteur"
//                                 value={formData.auteur}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Nom de l'architecte/designer"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white shadow-sm rounded-lg p-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques techniques</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Surface totale (m²)
//                             </label>
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 name="surface_totale"
//                                 value={formData.surface_totale}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Nombre de niveaux
//                             </label>
//                             <input
//                                 type="number"
//                                 name="nombre_niveaux"
//                                 value={formData.nombre_niveaux}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Hauteur totale (m)
//                             </label>
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 name="hauteur_totale"
//                                 value={formData.hauteur_totale}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Nombre de pièces
//                             </label>
//                             <input
//                                 type="number"
//                                 name="nombre_pieces"
//                                 value={formData.nombre_pieces}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white shadow-sm rounded-lg p-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Informations commerciales</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Prix du plan (€)
//                             </label>
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 name="prix_plan"
//                                 value={formData.prix_plan}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Type de vente
//                             </label>
//                             <select
//                                 name="type_vente"
//                                 value={formData.type_vente}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             >
//                                 <option value="standard">Standard</option>
//                                 <option value="exclusif">Exclusif</option>
//                                 <option value="personnalisable">Personnalisable</option>
//                             </select>
//                         </div>

//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Droits d'utilisation
//                             </label>
//                             <textarea
//                                 name="droits_utilisation"
//                                 value={formData.droits_utilisation}
//                                 onChange={handleChange}
//                                 rows="3"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Conditions d'utilisation, restrictions, etc."
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white shadow-sm rounded-lg p-6">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Images du plan</h3>
//                     <p className="text-sm text-gray-600 mb-4">
//                         Téléchargez les images pour chaque vue du plan
//                     </p>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <ImageUploader
//                             label="Plan 2D"
//                             imageKey="plan_2d"
//                             currentImage={formData.image_urls.plan_2d}
//                             onImageUploaded={handleImageUpdate}
//                         />
//                         <ImageUploader
//                             label="Plan en côte"
//                             imageKey="plan_cote"
//                             currentImage={formData.image_urls.plan_cote}
//                             onImageUploaded={handleImageUpdate}
//                         />
//                         <ImageUploader
//                             label="Plan d'implantation"
//                             imageKey="plan_implentation"
//                             currentImage={formData.image_urls.plan_implentation}
//                             onImageUploaded={handleImageUpdate}
//                         />
//                         <ImageUploader
//                             label="Image d'ambiance"
//                             imageKey="image_ambiance"
//                             currentImage={formData.image_urls.image_ambiance}
//                             onImageUploaded={handleImageUpdate}
//                         />
//                         <ImageUploader
//                             label="Image 4"
//                             imageKey="image_4"
//                             currentImage={formData.image_urls.image_4}
//                             onImageUploaded={handleImageUpdate}
//                         />
//                         <ImageUploader
//                             label="Image 5"
//                             imageKey="image_5"
//                             currentImage={formData.image_urls.image_5}
//                             onImageUploaded={handleImageUpdate}
//                         />
//                     </div>
//                 </div>

//                 <div className="flex justify-end gap-4 pt-6 border-t">
//                     <button
//                         type="button"
//                         onClick={onCancel}
//                         className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                         disabled={loading}
//                     >
//                         Annuler
//                     </button>
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {loading ? 'Sauvegarde...' : (plan ? 'Mettre à jour' : 'Créer le plan')}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { generatePlanCode } from '@/lib/utils';
import ImageUploader from './ImageUploader';

export default function PlanForm({ plan, onSuccess, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nom_plan: '',
        type_projet: 'maison',
        statut: 'brouillon',
        auteur: '',
        surface_totale: '',
        nombre_niveaux: '',
        hauteur_totale: '',
        nombre_pieces: '',
        prix_plan: '',
        type_vente: 'standard',
        droits_utilisation: '',
        image_urls: {
            plan_2d: '',
            plan_cote: '',
            plan_implentation: '',
            image_ambiance: '',
            image_4: '',
            image_5: ''
        }
    });

    useEffect(() => {
        if (plan) {
            console.log('Plan data loaded:', plan);
            setFormData({
                ...plan,
                surface_totale: plan.surface_totale?.toString() || '',
                nombre_niveaux: plan.nombre_niveaux?.toString() || '',
                hauteur_totale: plan.hauteur_totale?.toString() || '',
                nombre_pieces: plan.nombre_pieces?.toString() || '',
                prix_plan: plan.prix_plan?.toString() || '',
                image_urls: plan.image_urls || {
                    plan_2d: '',
                    plan_cote: '',
                    plan_implentation: '',
                    image_ambiance: '',
                    image_4: '',
                    image_5: ''
                }
            });
        } else {
            // Générer un nouveau code plan pour les nouvelles entrées
            setFormData(prev => ({
                ...prev,
                code_plan: generatePlanCode()
            }));
        }
    }, [plan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpdate = (key, url) => {
        console.log('Image updated:', key, url);
        setFormData(prev => ({
            ...prev,
            image_urls: {
                ...prev.image_urls,
                [key]: url
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSend = {
                nom_plan: formData.nom_plan,
                type_projet: formData.type_projet,
                statut: formData.statut,
                auteur: formData.auteur,
                surface_totale: parseFloat(formData.surface_totale) || null,
                nombre_niveaux: parseInt(formData.nombre_niveaux) || null,
                hauteur_totale: parseFloat(formData.hauteur_totale) || null,
                nombre_pieces: parseInt(formData.nombre_pieces) || null,
                prix_plan: parseFloat(formData.prix_plan) || null,
                type_vente: formData.type_vente,
                droits_utilisation: formData.droits_utilisation,
                image_urls: formData.image_urls
            };

            console.log('Data to send:', dataToSend);

            if (plan) {
                // Mise à jour
                const { error } = await supabase
                    .from('plans')
                    .update(dataToSend)
                    .eq('id', plan.id);

                if (error) throw error;
            } else {
                // Création
                const { error } = await supabase
                    .from('plans')
                    .insert([{
                        ...dataToSend,
                        code_plan: formData.code_plan || generatePlanCode()
                    }]);

                if (error) throw error;
            }

            onSuccess();
        } catch (error) {
            console.error('Error saving plan:', error);
            alert(`Erreur lors de la sauvegarde: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <button
                    onClick={onCancel}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour à la liste
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                    {plan ? 'Modifier le Plan' : 'Nouveau Plan'}
                </h2>
                {!plan && (
                    <p className="text-gray-600 mt-2">
                        Code généré: <span className="font-mono font-medium">{formData.code_plan}</span>
                    </p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informations principales</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom du plan *
                            </label>
                            <input
                                type="text"
                                name="nom_plan"
                                value={formData.nom_plan}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                                placeholder="Ex: Villa Moderne 3 chambres"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type de projet *
                            </label>
                            <select
                                name="type_projet"
                                value={formData.type_projet}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            >
                                <option value="maison">Maison</option>
                                <option value="villa">Villa</option>
                                <option value="immeuble">Immeuble</option>
                                <option value="bureau">Bureau</option>
                                <option value="appartement">Appartement</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Statut *
                            </label>
                            <select
                                name="statut"
                                value={formData.statut}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            >
                                <option value="brouillon">Brouillon</option>
                                <option value="publie">Publié</option>
                                <option value="vendu">Vendu</option>
                                <option value="archive">Archivé</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Auteur *
                            </label>
                            <input
                                type="text"
                                name="auteur"
                                value={formData.auteur}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                                placeholder="Nom de l'architecte/designer"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques techniques</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Surface totale (m²)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="surface_totale"
                                value={formData.surface_totale}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de niveaux
                            </label>
                            <input
                                type="number"
                                name="nombre_niveaux"
                                value={formData.nombre_niveaux}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hauteur totale (m)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="hauteur_totale"
                                value={formData.hauteur_totale}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de pièces
                            </label>
                            <input
                                type="number"
                                name="nombre_pieces"
                                value={formData.nombre_pieces}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Informations commerciales</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prix du plan (€)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                name="prix_plan"
                                value={formData.prix_plan}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type de vente
                            </label>
                            <select
                                name="type_vente"
                                value={formData.type_vente}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                            >
                                <option value="standard">Standard</option>
                                <option value="exclusif">Exclusif</option>
                                <option value="personnalisable">Personnalisable</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Droits d'utilisation
                            </label>
                            <textarea
                                name="droits_utilisation"
                                value={formData.droits_utilisation}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                                placeholder="Conditions d'utilisation, restrictions, etc."
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Images du plan</h3>
                    <p className="text-sm text-gray-600 mb-6">
                        Téléchargez les images pour chaque vue du plan (max 5MB par image)
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ImageUploader
                            label="Plan 2D"
                            imageKey="plan_2d"
                            currentImage={formData.image_urls.plan_2d}
                            onImageUploaded={handleImageUpdate}
                        />
                        <ImageUploader
                            label="Plan en côte"
                            imageKey="plan_cote"
                            currentImage={formData.image_urls.plan_cote}
                            onImageUploaded={handleImageUpdate}
                        />
                        <ImageUploader
                            label="Plan d'implantation"
                            imageKey="plan_implentation"
                            currentImage={formData.image_urls.plan_implentation}
                            onImageUploaded={handleImageUpdate}
                        />
                        <ImageUploader
                            label="Image d'ambiance"
                            imageKey="image_ambiance"
                            currentImage={formData.image_urls.image_ambiance}
                            onImageUploaded={handleImageUpdate}
                        />
                        <ImageUploader
                            label="Image 4"
                            imageKey="image_4"
                            currentImage={formData.image_urls.image_4}
                            onImageUploaded={handleImageUpdate}
                        />
                        <ImageUploader
                            label="Image 5"
                            imageKey="image_5"
                            currentImage={formData.image_urls.image_5}
                            onImageUploaded={handleImageUpdate}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                        disabled={loading}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sauvegarde...' : (plan ? 'Mettre à jour' : 'Créer le plan')}
                    </button>
                </div>
            </form>
        </div>
    );
}