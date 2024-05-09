import { HomeCard } from '@/components/homeCard/homeCard';
import React from 'react';

const Home = () => {
  return (
    <div className="md:flex space-between w-full px-2 md:px-0 md:space-x-10">
      <div className="flex-1">
        <HomeCard />
      </div>
    </div>
  );
};

export default Home;
