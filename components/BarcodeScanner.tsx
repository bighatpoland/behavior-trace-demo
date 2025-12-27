"use client";

import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Camera, X, Check } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<string>("");
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();
    
    const scanBarcode = async () => {
      if (!webcamRef.current || !scanning) return;

      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc && readerRef.current) {
          const result = await readerRef.current.decodeFromImageUrl(imageSrc);
          if (result) {
            setScanning(false);
            onScan(result.getText());
          }
        }
      } catch (err) {
        // Continue scanning
      }

      if (scanning) {
        requestAnimationFrame(scanBarcode);
      }
    };

    if (scanning) {
      scanBarcode();
    }

    return () => {
      setScanning(false);
      if (readerRef.current) {
        readerRef.current.reset();
      }
    };
  }, [scanning, onScan]);

  const videoConstraints = {
    facingMode: { ideal: "environment" }, // Use back camera on mobile
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-white" />
            <h3 className="text-white font-semibold text-lg">Scan Barcode</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner */}
        <div className="relative bg-gray-900">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full"
            onUserMediaError={(err) => {
              setError("Camera access denied. Please enable camera permissions.");
              console.error(err);
            }}
          />
          
          {/* Scanning overlay */}
          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-4 border-amber-500 w-64 h-40 rounded-lg animate-pulse">
                <div className="w-full h-0.5 bg-rose-500 absolute top-1/2 left-0 animate-scan"></div>
              </div>
            </div>
          )}

          {!scanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-full p-4">
                <Check className="w-12 h-12 text-green-500" />
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-gray-50">
          {error ? (
            <p className="text-red-600 text-sm text-center">{error}</p>
          ) : (
            <p className="text-gray-600 text-sm text-center">
              Position the barcode within the frame. It will scan automatically.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-20px); }
          50% { transform: translateY(20px); }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
