import { useState, useCallback } from 'react';
import Webcam from 'react-webcam';

export const useCamera = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);

  const captureImage = useCallback((webcamRef: React.RefObject<Webcam>) => {
    if (!webcamRef.current) return null;
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  }, []);

  const toggleCamera = useCallback(() => {
    setIsCameraOn(prev => !prev);
  }, []);

  return {
    isCameraOn,
    captureImage,
    toggleCamera
  };
};