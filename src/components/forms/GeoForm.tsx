import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData, GeoData } from '../../types/qr-types';

interface GeoFormProps {
  onDataChange: (data: QRData | null) => void;
}

export function GeoForm({ onDataChange }: GeoFormProps) {
  const { register, watch, formState: { errors } } = useForm<GeoData>();
  const formData = watch();

  React.useEffect(() => {
    if (formData.latitude !== undefined && formData.longitude !== undefined && 
        !isNaN(formData.latitude) && !isNaN(formData.longitude)) {
      onDataChange({ 
        type: 'geo', 
        data: {
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude)
        }
      });
    } else {
      onDataChange(null);
    }
  }, [formData, onDataChange]);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // Update form values
          const latInput = document.querySelector('input[name="latitude"]') as HTMLInputElement;
          const lngInput = document.querySelector('input[name="longitude"]') as HTMLInputElement;
          if (latInput && lngInput) {
            latInput.value = lat.toString();
            lngInput.value = lng.toString();
            // Trigger change events
            latInput.dispatchEvent(new Event('input', { bubbles: true }));
            lngInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        },
        () => {
          alert('Unable to get your location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Latitude *
        </label>
        <input
          type="number"
          step="any"
          {...register('latitude', { 
            required: 'Latitude is required',
            min: { value: -90, message: 'Latitude must be between -90 and 90' },
            max: { value: 90, message: 'Latitude must be between -90 and 90' }
          })}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="40.7128"
        />
        {errors.latitude && (
          <p className="mt-1 text-sm text-red-400">{errors.latitude.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Longitude *
        </label>
        <input
          type="number"
          step="any"
          {...register('longitude', { 
            required: 'Longitude is required',
            min: { value: -180, message: 'Longitude must be between -180 and 180' },
            max: { value: 180, message: 'Longitude must be between -180 and 180' }
          })}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="-74.0060"
        />
        {errors.longitude && (
          <p className="mt-1 text-sm text-red-400">{errors.longitude.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={getCurrentLocation}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        <span>📍</span>
        Use My Current Location
      </button>

      <div className="p-3 bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-300">
          <strong>Tip:</strong> You can find coordinates by:
        </p>
        <ul className="text-sm text-blue-400 mt-1 space-y-1">
          <li>• Using the "Use My Current Location" button</li>
          <li>• Right-clicking on Google Maps and selecting coordinates</li>
          <li>• Using GPS coordinates from your device</li>
        </ul>
      </div>
    </div>
  );
}