import React from 'react';
import { Brain } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Visual Learning Assistant</h1>
          </div>
        </div>
      </div>
    </header>
  );
};