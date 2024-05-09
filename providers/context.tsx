'use client';

import { createContext, useContext, useState } from 'react';

type UserContextType = {
    response: string;
    mturkId: string;
    setResponse: (value: string) => void;
    setMturkId: (value: string) => void;
};
  
  const userContextDefaultValues: UserContextType = {
    response: '',
    mturkId: '',
    setResponse: () => {},
    setMturkId: () => {},
};

const UserContext = createContext<UserContextType>(userContextDefaultValues);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [response, setResponse] = useState<string>('');
  const [mturkId, setMturkId] = useState('');

  return (
    <UserContext.Provider value={{ response, setResponse, mturkId, setMturkId}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
