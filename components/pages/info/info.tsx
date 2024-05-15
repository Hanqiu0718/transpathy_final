import { InfoCard } from '@/components/infoCard/infoCard';
import React from 'react';

const Info = () => {
  return (
    <div className="md:flex space-between w-full px-2 md:px-0 md:space-x-10">
      <div className="flex-1">
        <InfoCard />
      </div>
    </div>
  );
};

export default Info;
