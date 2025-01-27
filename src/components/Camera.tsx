import React from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, CameraOff } from 'lucide-react';

interface CameraProps {
  isOn: boolean;
  onToggle: () => void;
  webcamRef: React.RefObject<Webcam>;
  capturedImage: string | null;
}

export const Camera: React.FC<CameraProps> = ({ isOn, onToggle, webcamRef, capturedImage }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured problem"
            className="w-full h-full object-contain"
          />
        ) : isOn ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CameraOff className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      <button
        onClick={onToggle}
        className="absolute bottom-4 right-4 p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
      >
        {isOn ? <CameraOff className="w-6 h-6" /> : <CameraIcon className="w-6 h-6" />}
      </button>
    </div>
  );
};