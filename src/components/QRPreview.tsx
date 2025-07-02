import { useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import type { QRData, QROptions } from '../types/qr-types';
import { formatQRData } from '../utils/qr-formatters';

interface QRPreviewProps {
  data: QRData | null;
  options: QROptions;
}

export function QRPreview({ data, options }: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const qrValue = data ? formatQRData(data) : '';

  useEffect(() => {
    if (!canvasRef.current || !qrValue) {
      return;
    }

    // Display canvas (limited to 300px for UI)
    QRCode.toCanvas(canvasRef.current, qrValue, {
      width: Math.min(options.size, 300),
      color: {
        dark: options.fgColor,
        light: options.bgColor
      },
      errorCorrectionLevel: options.errorCorrectionLevel
    }).catch(err => {
      console.error('QR Code generation failed:', err);
    });

    // Download canvas (full size)
    if (downloadCanvasRef.current) {
      QRCode.toCanvas(downloadCanvasRef.current, qrValue, {
        width: options.size,
        color: {
          dark: options.fgColor,
          light: options.bgColor
        },
        errorCorrectionLevel: options.errorCorrectionLevel
      }).catch(err => {
        console.error('Download QR Code generation failed:', err);
      });
    }
  }, [qrValue, options]);

  const downloadQR = () => {
    if (!downloadCanvasRef.current || !data) return;

    const downloadLink = document.createElement('a');
    downloadLink.href = downloadCanvasRef.current.toDataURL('image/png');
    downloadLink.download = `qr-code-${data.type}.png`;
    downloadLink.click();
  };

  const copyQRImage = async () => {
    if (!downloadCanvasRef.current) return;
    
    try {
      downloadCanvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          alert('QR code image copied to clipboard!');
        }
      }, 'image/png');
    } catch (err) {
      console.error('Failed to copy image:', err);
      alert('Copy not supported in this browser');
    }
  };

  if (!data || !qrValue) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
            <span className="text-4xl">📱</span>
          </div>
          <p className="text-lg font-semibold text-white mb-2">QR Code Preview</p>
          <p className="text-gray-400 text-sm">Fill out the form to generate your QR code</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-6">
        Your QR Code
      </h2>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="p-4 rounded-lg shadow-lg border border-gray-600">
          <canvas
            ref={canvasRef}
            className="block"
            style={{ backgroundColor: options.bgColor }}
          />
        </div>
        
        <div className="mt-6 flex gap-3">
          <button
            onClick={downloadQR}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            <span>📥</span>
            Download PNG
          </button>
          <button
            onClick={copyQRImage}
            className="px-6 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium"
          >
            <span>📋</span>
            Copy Image
          </button>
        </div>
        
        {/* Hidden canvas for full-size downloads */}
        <canvas ref={downloadCanvasRef} style={{ display: 'none' }} />
        
        <div className="mt-4 max-w-md w-full">
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-400 hover:text-gray-300 font-medium mb-2">
              🔍 View Raw Data
            </summary>
            <pre className="mt-2 p-3 bg-gray-700 rounded-lg border border-gray-600 text-xs overflow-auto max-h-32 text-gray-300 font-mono">
              {qrValue}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}