'use client';

import { createContext, useContext, useState } from 'react';

type UserContextType = {
    response_consent: string | null;
    mturkId: string;
    name: string;
    response: string;
    index: number;
    setResponse_consent: (value: string) => void;
    setMturkId: (value: string) => void;
    setName: (value: string) => void;
    setResponse: (value: string) => void;
    setIndex: (value: number) => void;
};
  
  const userContextDefaultValues: UserContextType = {
    response_consent: null,
    mturkId: '',
    name: '',
    response: '',
    index: 0,
    setResponse_consent: () => { },
    setMturkId: () => {},
    setName: () => {},
    setResponse: () => {},
    setIndex: () => {},
};

const UserContext = createContext<UserContextType>(userContextDefaultValues);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [response_consent, setResponse_consent] = useState<string | null>(null);
  const [mturkId, setMturkId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [index, setIndex] = useState<number>(0);


  return (
    <UserContext.Provider value={{response_consent, setResponse_consent, mturkId, setMturkId, name, setName, response, setResponse, index, setIndex}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
