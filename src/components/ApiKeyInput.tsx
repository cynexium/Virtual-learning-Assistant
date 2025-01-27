import React, { useState } from 'react';
import { Check, Key } from 'lucide-react';

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ value, onChange }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    onChange(localValue);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Gemini API Key
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Key className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="password"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your API key"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={!localValue || localValue === value}
          className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
            isSaved
              ? 'bg-green-500'
              : !localValue || localValue === value
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSaved ? (
            <Check className="w-5 h-5" />
          ) : (
            'Save'
          )}
        </button>
      </div>
    </div>
  );
};