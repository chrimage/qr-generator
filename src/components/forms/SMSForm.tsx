import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData, SMSData } from '../../types/qr-types';

interface SMSFormProps {
  onDataChange: (data: QRData | null) => void;
}

export function SMSForm({ onDataChange }: SMSFormProps) {
  const { register, watch, formState: { errors } } = useForm<SMSData>();
  const formData = watch();

  React.useEffect(() => {
    if (formData.phone && formData.phone.trim()) {
      onDataChange({ 
        type: 'sms', 
        data: {
          phone: formData.phone.trim(),
          message: formData.message || ''
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
          Phone Number *
        </label>
        <input
          type="tel"
          {...register('phone', { 
            required: 'Phone number is required',
            pattern: {
              value: /^[\+]?[0-9\s\-\(\)]+$/,
              message: 'Please enter a valid phone number'
            }
          })}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="+1234567890"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-400">
          Include country code for international numbers
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          {...register('message')}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Pre-filled SMS message (optional)"
          maxLength={160}
        />
        <p className="mt-1 text-sm text-gray-400">
          Standard SMS limit is 160 characters
        </p>
      </div>
    </div>
  );
}