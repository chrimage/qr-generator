import React from 'react';
import { useForm } from 'react-hook-form';
import type { QRData, CalendarData } from '../../types/qr-types';

interface CalendarFormProps {
  onDataChange: (data: QRData | null) => void;
}

export function CalendarForm({ onDataChange }: CalendarFormProps) {
  const { register, watch, formState: { errors } } = useForm<CalendarData>();
  const formData = watch();

  React.useEffect(() => {
    if (formData.title && formData.title.trim() && formData.startDate && formData.startTime) {
      onDataChange({ 
        type: 'calendar', 
        data: {
          title: formData.title.trim(),
          description: formData.description || '',
          location: formData.location || '',
          startDate: formData.startDate,
          endDate: formData.endDate || formData.startDate,
          startTime: formData.startTime,
          endTime: formData.endTime || formData.startTime
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
          Event Title *
        </label>
        <input
          type="text"
          {...register('title', { required: 'Event title is required' })}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Team Meeting"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Event description (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Location
        </label>
        <input
          type="text"
          {...register('location')}
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Conference Room A"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            {...register('startDate', { required: 'Start date is required' })}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-400">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            End Date
          </label>
          <input
            type="date"
            {...register('endDate')}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-400">
            Defaults to start date if not specified
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Start Time *
          </label>
          <input
            type="time"
            {...register('startTime', { required: 'Start time is required' })}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-400">{errors.startTime.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            End Time
          </label>
          <input
            type="time"
            {...register('endTime')}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-400">
            Defaults to start time if not specified
          </p>
        </div>
      </div>
    </div>
  );
}