import React from 'react';
import { Trash2 } from 'lucide-react';
import { Solution } from '../types';

interface SolutionCardProps {
  solution: Solution;
  onDelete: (id: string) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={solution.image}
        alt="Problem"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            {solution.timestamp.toLocaleString()}
          </span>
          <button
            onClick={() => onDelete(solution.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{solution.solution}</p>
      </div>
    </div>
  );
};