'use client';

import { createContext, useContext, useState } from 'react';

type UserContextType = {
    response: string;
    mturkId: string;
    name: string;
    index: number;
    setResponse: (value: string) => void;
    setMturkId: (value: string) => void;
    setName: (value: string) => void;
    setIndex: (value: number) => void;
};
  
  const userContextDefaultValues: UserContextType = {
    response: '',
    mturkId: '',
    name: '',
    index: 0,
    setResponse: () => {},
    setMturkId: () => {},
    setName: () => {},
    setIndex: () => {},
};

const UserContext = createContext<UserContextType>(userContextDefaultValues);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [response, setResponse] = useState<string>('');
  const [mturkId, setMturkId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  return (
    <UserContext.Provider value={{ response, setResponse, mturkId, setMturkId, name, setName, index, setIndex}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
