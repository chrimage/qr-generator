import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData } from '../../types/qr-types';

interface URLFormProps {
  onDataChange: (data: QRData | null) => void;
}

interface URLFormData {
  url: string;
}

export function URLForm({ onDataChange }: URLFormProps) {
  const { register, watch, formState: { errors } } = useForm<URLFormData>();
  const url = watch('url');

  React.useEffect(() => {
    if (url && url.trim()) {
      onDataChange({ type: 'url', url: url.trim() });
    } else {
      onDataChange(null);
    }
  }, [url, onDataChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Website URL
        </label>
        <input
          type="url"
          {...register('url', { 
            required: 'URL is required',
            pattern: {
              value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
              message: 'Please enter a valid URL'
            }
          })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
        />
        {errors.url && (
          <p className="mt-1 text-sm text-red-400">{errors.url.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-400">
          The URL will automatically be prefixed with https:// if no protocol is provided
        </p>
      </div>
    </div>
  );
}