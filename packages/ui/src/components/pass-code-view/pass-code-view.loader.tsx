import React from 'react';

export function PassCodeViewLoader({ length }: { length: number }) {
  return (
    <div className="w-full px-4">
      <div className="linear-gradient-style -mx-4 mb-2 h-4 rounded" />
      <div className="flex justify-center gap-2">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="linear-gradient-style h-7 w-6 rounded-md" />
        ))}
      </div>
    </div>
  );
}
