import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData, EmailData } from '../../types/qr-types';

interface EmailFormProps {
  onDataChange: (data: QRData | null) => void;
}

export function EmailForm({ onDataChange }: EmailFormProps) {
  const { register, watch, formState: { errors } } = useForm<EmailData>();
  const formData = watch();

  React.useEffect(() => {
    if (formData.email && formData.email.trim()) {
      onDataChange({ 
        type: 'email', 
        data: {
          email: formData.email.trim(),
          subject: formData.subject || '',
          body: formData.body || ''
        }
      });
    } else {
      onDataChange(null);
    }
  }, [formData, onDataChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="user@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          {...register('subject')}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email subject (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message Body
        </label>
        <textarea
          {...register('body')}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Pre-filled email message (optional)"
        />
      </div>
    </div>
  );
}