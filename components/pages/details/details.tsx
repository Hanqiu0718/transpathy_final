import { DetailsCard } from '@/components/detailsCard/detailsCard';
import React from 'react';

const Details = () => {
  return (
    <div className="md:flex space-between w-full px-2 md:px-0 md:space-x-10">
      <div className="flex-1">
        <DetailsCard />
      </div>
    </div>
  );
};

export default Details;
