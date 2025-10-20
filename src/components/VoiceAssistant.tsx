'use client';

import { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, SpeakerWaveIcon, StopIcon } from '@heroicons/react/24/outline';

interface VoiceAssistantProps {
  onToggle?: (isActive: boolean) => void;
}

export default function VoiceAssistant({ onToggle }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition and synthesis
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);
      synthRef.current = speechSynthesis;
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        onToggle?.(true);
      };
      
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        handleVoiceInput(result);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        onToggle?.(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        onToggle?.(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [onToggle]);

  const handleVoiceInput = async (input: string) => {
    const response = await generateResponse(input);
    setResponse(response);
    speak(response);
  };

  const generateResponse = async (input: string): Promise<string> => {
    const lowerInput = input.toLowerCase();
    
    // BandayGlam specific responses
    if (lowerInput.includes('banday') || lowerInput.includes('glam')) {
      return "BandayGlam is your one-stop shop for glamorous fashion. We offer custom t-shirts, hoodies, and tank tops with our design studio.";
    }
    
    if (lowerInput.includes('design') || lowerInput.includes('studio')) {
      return "Our design studio lets you create custom designs on t-shirts and other apparel. You can add text, images, and choose colors to make your perfect garment.";
    }
    
    if (lowerInput.includes('product') || lowerInput.includes('shop')) {
      return "We offer t-shirts starting at $19.99, hoodies, and tank tops. All products come with free design tools, quality guarantee, and fast shipping.";
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return "Our products start at $19.99. We offer competitive pricing with quality guarantee and free design tools.";
    }
    
    if (lowerInput.includes('shipping')) {
      return "We offer fast shipping on all orders. Shipping details are available during checkout.";
    }
    
    // General responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! I'm your BandayGlam voice assistant. I can help you with information about our products, design studio, and services. What would you like to know?";
    }
    
    if (lowerInput.includes('help')) {
      return "I can help you with information about BandayGlam products, our design studio, pricing, and shipping. You can also ask me general questions. What would you like to know?";
    }
    
    if (lowerInput.includes('time')) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}.`;
    }
    
    if (lowerInput.includes('date')) {
      const now = new Date();
      return `Today's date is ${now.toLocaleDateString()}.`;
    }
    
    if (lowerInput.includes('weather')) {
      return "I don't have access to current weather data, but you can check your local weather app or website for the most up-to-date information.";
    }
    
    // Default response
    return "I heard you say: " + input + ". I'm still learning! You can ask me about BandayGlam products, our design studio, or general questions like the time and date.";
  };

  const speak = (text: string) => {
    if (!synthRef.current) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current || isListening) return;
    
    setTranscript('');
    setResponse('');
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  };

  const stopSpeaking = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsSpeaking(false);
  };

  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          Voice assistant is not supported in your browser. Please use Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Assistant</h3>
        <p className="text-sm text-gray-600">
          Click the microphone to ask me anything about BandayGlam or general questions!
        </p>
      </div>

      <div className="flex justify-center mb-6">
        {!isListening && !isSpeaking && (
          <button
            onClick={startListening}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
            aria-label="Start voice input"
          >
            <MicrophoneIcon className="w-8 h-8" />
          </button>
        )}
        
        {isListening && (
          <button
            onClick={stopListening}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-colors shadow-lg animate-pulse"
            aria-label="Stop listening"
          >
            <StopIcon className="w-8 h-8" />
          </button>
        )}
        
        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full transition-colors shadow-lg"
            aria-label="Stop speaking"
          >
            <SpeakerWaveIcon className="w-8 h-8 animate-bounce" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {isListening && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-800 text-sm font-medium">🎤 Listening...</p>
          </div>
        )}
        
        {transcript && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-gray-700 text-sm">
              <strong>You said:</strong> {transcript}
            </p>
          </div>
        )}
        
        {response && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 text-sm">
              <strong>Assistant:</strong> {response}
            </p>
          </div>
        )}
        
        {isSpeaking && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 text-sm font-medium">🔊 Speaking...</p>
          </div>
        )}
      </div>
    </div>
  );
}