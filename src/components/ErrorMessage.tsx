import React from 'react';

interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="w-full max-w-md px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">
      {error}
    </div>
  );
};