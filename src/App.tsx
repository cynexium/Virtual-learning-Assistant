import React from 'react';
import { Brain } from 'lucide-react';
import { AppContent } from './components/AppContent';
import { AppHeader } from './components/AppHeader';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader />
      <AppContent />
    </div>
  );
}