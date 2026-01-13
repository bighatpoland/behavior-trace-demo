"use client";

import { useState } from "react";
import { Fingerprint, X } from "lucide-react";

interface FaceIDPromptProps {
  onEnable: () => void;
  onSkip: () => void;
}

export default function FaceIDPrompt({ onEnable, onSkip }: FaceIDPromptProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnable = async () => {
    setIsLoading(true);
    try {
      await onEnable();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
            <Fingerprint className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Enable Biometric Login?
          </h2>
          <p className="text-gray-600">
            Use Face ID, Touch ID, or fingerprint to sign in quickly and securely on this device.
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-amber-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Benefits:
          </h3>
          <ul className="text-sm text-gray-700 space-y-1 pl-7">
            <li>• Faster sign-in (no password needed)</li>
            <li>• More secure than passwords</li>
            <li>• Your biometric data never leaves your device</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleEnable}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Setting up..." : "Enable Biometric Login"}
          </button>
          
          <button
            onClick={onSkip}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Maybe Later
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center">
          You can change this setting anytime in your account settings.
        </p>
      </div>
    </div>
  );
}
