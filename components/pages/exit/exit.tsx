import { ExitCard } from '@/components/exitCard/exitCard';
import React from 'react';

const Exit = () => {
  return (
    <div className="md:flex space-between w-full px-2 md:px-0 md:space-x-10">
      <div className="flex-1">
        <ExitCard />
      </div>
    </div>
  );
};

export default Exit;
