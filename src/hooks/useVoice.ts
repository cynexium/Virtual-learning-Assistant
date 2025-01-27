import { useCallback } from 'react';

export const useVoice = (enabled: boolean) => {
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const speak = useCallback((text: string) => {
    if (!enabled) return;
    
    // Cancel any ongoing speech first
    stopSpeaking();
    
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }, [enabled]);

  return { speak, stopSpeaking };
};