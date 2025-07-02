import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData } from '../../types/qr-types';

interface PhoneFormProps {
  onDataChange: (data: QRData | null) => void;
}

interface PhoneFormData {
  phone: string;
}

export function PhoneForm({ onDataChange }: PhoneFormProps) {
  const { register, watch, formState: { errors } } = useForm<PhoneFormData>();
  const phone = watch('phone');

  React.useEffect(() => {
    if (phone && phone.trim()) {
      onDataChange({ type: 'phone', phone: phone.trim() });
    } else {
      onDataChange(null);
    }
  }, [phone, onDataChange]);

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
          Include country code for international numbers. Scanning this QR code will open the phone dialer.
        </p>
      </div>
    </div>
  );
}