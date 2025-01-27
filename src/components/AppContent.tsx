import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon } from 'lucide-react';
import { Camera } from './Camera';
import { SettingsPanel } from './Settings';
import { SolutionCard } from './SolutionCard';
import { CaptureButton } from './CaptureButton';
import { ErrorMessage } from './ErrorMessage';
import { useCamera } from '../hooks/useCamera';
import { useVoice } from '../hooks/useVoice';
import { useGemini } from '../hooks/useGemini';
import type { Settings, Solution } from '../types';

export const AppContent: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    apiKey: '',
    voiceEnabled: true,
  });
  
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  
  const { isCameraOn, toggleCamera, captureImage } = useCamera();
  const { speak, stopSpeaking } = useVoice(settings.voiceEnabled);
  const { analyzeProblem } = useGemini();

  const handleCapture = () => {
    setError(null);
    
    if (!settings.apiKey) {
      setError('Please enter your Gemini API key in settings');
      return;
    }

    if (!isCameraOn) {
      setError('Please turn on the camera first');
      return;
    }

    const imageData = captureImage(webcamRef);
    if (!imageData) {
      setError('Failed to capture image. Please try again');
      return;
    }

    setCapturedImage(imageData);
  };

  const handleAnalyze = async () => {
    if (!capturedImage || !settings.apiKey) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      const solution = await analyzeProblem(capturedImage, settings.apiKey);
      
      const newSolution: Solution = {
        id: Date.now().toString(),
        image: capturedImage,
        solution,
        timestamp: new Date(),
      };
      
      setSolutions(prev => [newSolution, ...prev]);
      if (settings.voiceEnabled) {
        speak(solution);
      }
      setCapturedImage(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate solution';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteSolution = useCallback((id: string) => {
    stopSpeaking(); // Stop any ongoing speech when deleting a solution
    setSolutions(prev => prev.filter(solution => solution.id !== id));
  }, [stopSpeaking]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Camera
            isOn={isCameraOn}
            onToggle={toggleCamera}
            webcamRef={webcamRef}
            capturedImage={capturedImage}
          />
          
          <div className="flex flex-col items-center gap-4">
            <ErrorMessage error={error} />
            <CaptureButton
              capturedImage={capturedImage}
              isCameraOn={isCameraOn}
              isProcessing={isProcessing}
              onCapture={handleCapture}
              onAnalyze={handleAnalyze}
            />
          </div>

          <div className="space-y-6">
            {solutions.map(solution => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                onDelete={deleteSolution}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <SettingsPanel
            settings={settings}
            onSettingsChange={setSettings}
          />
        </div>
      </div>
    </main>
  );
};