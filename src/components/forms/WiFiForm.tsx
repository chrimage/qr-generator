import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData, WiFiData } from '../../types/qr-types';

interface WiFiFormProps {
  onDataChange: (data: QRData | null) => void;
}

export function WiFiForm({ onDataChange }: WiFiFormProps) {
  const { register, watch, formState: { errors } } = useForm<WiFiData>();
  const formData = watch();

  React.useEffect(() => {
    if (formData.ssid && formData.ssid.trim()) {
      onDataChange({ 
        type: 'wifi', 
        data: {
          ssid: formData.ssid.trim(),
          password: formData.password || '',
          security: formData.security || 'WPA2',
          hidden: formData.hidden || false
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
          Network Name (SSID) *
        </label>
        <input
          type="text"
          {...register('ssid', { required: 'Network name is required' })}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="MyWiFiNetwork"
        />
        {errors.ssid && (
          <p className="mt-1 text-sm text-red-400">{errors.ssid.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Security Type
        </label>
        <select
          {...register('security')}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="WPA2">WPA2</option>
          <option value="WPA">WPA</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          {...register('password')}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter WiFi password"
        />
        <p className="mt-1 text-sm text-gray-400">
          Leave empty for open networks
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('hidden')}
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm font-medium text-gray-300">
          Hidden Network
        </label>
      </div>
    </div>
  );
}