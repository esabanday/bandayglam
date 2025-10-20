'use client';

import { useState } from 'react';
import VoiceAssistant from './VoiceAssistant';
import { MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function VoiceAssistantFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className={`bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              isActive ? 'animate-pulse bg-red-600 hover:bg-red-700' : ''
            }`}
            aria-label="Open voice assistant"
          >
            <MicrophoneIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Voice Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors z-10"
              aria-label="Close voice assistant"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
            <VoiceAssistant onToggle={setIsActive} />
          </div>
        </div>
      )}
    </>
  );
}