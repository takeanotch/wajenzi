'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function ImageUploader({ label, imageKey, currentImage, onImageUploaded }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage);

    const handleImageUpload = async (event) => {
        try {
            setUploading(true);

            const file = event.target.files[0];
            if (!file) return;

            // Créer un aperçu
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload vers Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('plan-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Obtenir l'URL publique
            const { data: { publicUrl } } = supabase.storage
                .from('plan-images')
                .getPublicUrl(filePath);

            onImageUploaded(imageKey, publicUrl);

        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erreur lors du téléchargement de l\'image');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview('');
        onImageUploaded(imageKey, '');
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                {preview ? (
                    <div className="relative">
                        <img 
                            src={preview} 
                            alt={label}
                            className="w-full h-40 object-cover rounded"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center h-40">
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-600">Cliquez pour uploader</span>
                            <span className="text-xs text-gray-500">PNG, JPG, WEBP (max. 5MB)</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>
            
            {uploading && (
                <div className="text-sm text-blue-600">
                    Téléchargement en cours...
                </div>
            )}
        </div>
    );
}