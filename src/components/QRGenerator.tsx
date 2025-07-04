import { useState } from 'react';
import type { QRData, QRDataType, QROptions } from '../types/qr-types';
import { QRPreview } from './QRPreview';
import { TextForm } from './forms/TextForm';
import { URLForm } from './forms/URLForm';
import { WiFiForm } from './forms/WiFiForm';
import { EmailForm } from './forms/EmailForm';
import { SMSForm } from './forms/SMSForm';
import { PhoneForm } from './forms/PhoneForm';
import { VCardForm } from './forms/VCardForm';
import { CalendarForm } from './forms/CalendarForm';
import { GeoForm } from './forms/GeoForm';

const QR_TYPES: { value: QRDataType; label: string; icon: string }[] = [
  { value: 'text', label: 'Text', icon: '📝' },
  { value: 'url', label: 'URL', icon: '🔗' },
  { value: 'wifi', label: 'WiFi', icon: '📶' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'sms', label: 'SMS', icon: '💬' },
  { value: 'phone', label: 'Phone', icon: '📞' },
  { value: 'vcard', label: 'Contact', icon: '👤' },
  { value: 'calendar', label: 'Event', icon: '📅' },
  { value: 'geo', label: 'Location', icon: '📍' },
];

export function QRGenerator() {
  const [activeType, setActiveType] = useState<QRDataType>('text');
  const [qrData, setQRData] = useState<QRData | null>(null);
  const [options, setOptions] = useState<QROptions>({
    size: 256,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    errorCorrectionLevel: 'M',
  });

  const renderForm = () => {
    const formProps = { onDataChange: setQRData };
    
    switch (activeType) {
      case 'text':
        return <TextForm {...formProps} />;
      case 'url':
        return <URLForm {...formProps} />;
      case 'wifi':
        return <WiFiForm {...formProps} />;
      case 'email':
        return <EmailForm {...formProps} />;
      case 'sms':
        return <SMSForm {...formProps} />;
      case 'phone':
        return <PhoneForm {...formProps} />;
      case 'vcard':
        return <VCardForm {...formProps} />;
      case 'calendar':
        return <CalendarForm {...formProps} />;
      case 'geo':
        return <GeoForm {...formProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4 shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            No Bullshit QR Generator
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Create QR codes instantly for URLs, WiFi, contacts, and more. No ads, no tracking, no premium features. 
            Just pure functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Create QR Code
            </h2>
            
            {/* Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                QR Code Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {QR_TYPES.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setActiveType(value);
                      setQRData(null);
                    }}
                    className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                      activeType === value
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <span className="text-lg mb-1">{icon}</span>
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="border-t border-gray-600 pt-6">
              {renderForm()}
            </div>

            {/* Options */}
            <div className="border-t border-gray-600 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Customization
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Size
                  </label>
                  <select
                    value={options.size}
                    onChange={(e) => setOptions({ ...options, size: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={128}>Small (128px)</option>
                    <option value={256}>Medium (256px)</option>
                    <option value={512}>Large (512px)</option>
                    <option value={1024}>Extra Large (1024px)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Error Correction
                  </label>
                  <select
                    value={options.errorCorrectionLevel}
                    onChange={(e) => setOptions({ ...options, errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={options.bgColor}
                    onChange={(e) => setOptions({ ...options, bgColor: e.target.value })}
                    className="w-full h-10 border border-gray-600 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Foreground Color
                  </label>
                  <input
                    type="color"
                    value={options.fgColor}
                    onChange={(e) => setOptions({ ...options, fgColor: e.target.value })}
                    className="w-full h-10 border border-gray-600 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <QRPreview data={qrData} options={options} />
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg border border-gray-700">
            <span className="text-blue-400">⚡</span>
            <span className="text-gray-300 font-medium">
              Made with zero bullshit by developers who hate ads
            </span>
            <span className="text-red-400">💜</span>
          </div>
        </div>
      </div>
    </div>
  );
}