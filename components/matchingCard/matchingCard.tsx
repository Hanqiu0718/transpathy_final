'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useUser } from '@/providers/context';

export default function MatchingCard() {
  const router = useRouter();
  const { mturkId, name, index } = useUser();
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (!mturkId || !name) {
      router.push('/');
    }
  }, [mturkId, name, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMatched(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleNextClick = () => {
    router.push('/chatbot');
  };

  const expertDetails = {
    image: '/expert.jpg', 
    name: 'Emily Carter',
  };

  return (
    <Card className="w-full flex flex-col items-center justify-center h-screen p-4">
      {!matched ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Matching you with an expert ...</h2>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Congrats, you're matched with an expert in emotion regulation.
          </h2>
          {(index === 1 || index === 3) && (
            <div className="flex items-center justify-between bg-gray-100 p-6 rounded-lg mb-6">
              <div className="flex-1 mr-4">
                <h3 className="text-xl font-bold mb-2">{expertDetails.name}</h3>
                <p className="text-sm text-gray-700">
                Emotion Regulation Expert | Behavioral Science Consultant
                </p>
              </div>
              <div className="w-40 h-40 relative">
                <Image
                  src={expertDetails.image}
                  alt="Expert Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <Button onClick={handleNextClick}>Next</Button>
          </div>
        </div>
      )}
    </Card>
  );
}
