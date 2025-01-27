import React from 'react';
import { Settings as SettingsIcon, Volume2, VolumeX } from 'lucide-react';
import { ApiKeyInput } from './ApiKeyInput';
import { Settings } from '../types';

interface SettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const SettingsPanel: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <SettingsIcon className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <div className="space-y-6">
        <ApiKeyInput
          value={settings.apiKey}
          onChange={(apiKey) => onSettingsChange({ ...settings, apiKey })}
        />

        <div className="space-y-2">
          {/* <span className="text-sm font-medium text-gray-700">Voice Assistant</span> */}
          {/* <button
            onClick={() => onSettingsChange({ ...settings, voiceEnabled: !settings.voiceEnabled })}
            className={`w-full flex items-center justify-between p-3 rounded-md border ${
              settings.voiceEnabled 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            <span className="text-sm font-medium">
              {settings.voiceEnabled ? 'Enabled' : 'Disabled'}
            </span>
            {settings.voiceEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
};