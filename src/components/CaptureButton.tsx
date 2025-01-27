import React from 'react';
import { Camera as CameraIcon } from 'lucide-react';

interface CaptureButtonProps {
  capturedImage: string | null;
  isCameraOn: boolean;
  isProcessing: boolean;
  onCapture: () => void;
  onAnalyze: () => void;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({
  capturedImage,
  isCameraOn,
  isProcessing,
  onCapture,
  onAnalyze,
}) => {
  if (!capturedImage) {
    return (
      <button
        onClick={onCapture}
        disabled={!isCameraOn}
        className={`px-6 py-3 rounded-lg text-white font-medium flex items-center gap-2 ${
          !isCameraOn
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <CameraIcon className="w-5 h-5" />
        Capture Image
      </button>
    );
  }

  return (
    <button
      onClick={onAnalyze}
      disabled={isProcessing}
      className={`px-6 py-3 rounded-lg text-white font-medium ${
        isProcessing
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isProcessing ? 'Analyzing...' : 'Analyze Problem'}
    </button>
  );
};