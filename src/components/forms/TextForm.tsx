import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData } from '../../types/qr-types';

interface TextFormProps {
  onDataChange: (data: QRData | null) => void;
}

interface TextFormData {
  text: string;
}

export function TextForm({ onDataChange }: TextFormProps) {
  const { register, watch, formState: { errors } } = useForm<TextFormData>();
  const text = watch('text');

  React.useEffect(() => {
    if (text && text.trim()) {
      onDataChange({ type: 'text', text: text.trim() });
    } else {
      onDataChange(null);
    }
  }, [text, onDataChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Text Content
        </label>
        <textarea
          {...register('text', { required: 'Text is required' })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
          placeholder="Enter any text you want to encode in the QR code..."
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-400">{errors.text.message}</p>
        )}
      </div>
    </div>
  );
}