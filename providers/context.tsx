'use client';

import { createContext, useContext, useState } from 'react';

type UserContextType = {
    response: string;
    mturkId: string;
    name: string;
    index: number;
    response_consent: string | null;
    setResponse: (value: string) => void;
    setMturkId: (value: string) => void;
    setName: (value: string) => void;
    setIndex: (value: number) => void;
    setResponse_consent: (value: string) => void;
};
  
  const userContextDefaultValues: UserContextType = {
    response: '',
    mturkId: '',
    name: '',
    index: 0,
    response_consent: null,
    setResponse: () => {},
    setMturkId: () => {},
    setName: () => {},
    setIndex: () => {},
    setResponse_consent: () => { },
};

const UserContext = createContext<UserContextType>(userContextDefaultValues);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [response, setResponse] = useState<string>('');
  const [mturkId, setMturkId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [response_consent, setResponse_consent] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ response, setResponse, mturkId, setMturkId, name, setName, index, setIndex, response_consent, setResponse_consent}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

