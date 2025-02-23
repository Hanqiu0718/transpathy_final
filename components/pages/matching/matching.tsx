import MatchingCard from '@/components/matchingCard/matchingCard';
import React from 'react';

const Match = () => {
  return (
    <div className="md:flex space-between w-full px-2 md:px-0 md:space-x-10">
      <div className="flex-1">
        <MatchingCard />
      </div>
    </div>
  );
};

export default Match;
