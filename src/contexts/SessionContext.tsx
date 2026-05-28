import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface SessionContextType {
  sessionToken: string;
  isDisclaimerAccepted: boolean;
  acceptDisclaimer: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string>('');
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('monerSathi_session');
    const disclaimerAccepted = localStorage.getItem('monerSathi_disclaimer');

    if (!token) {
      token = uuidv4();
      localStorage.setItem('monerSathi_session', token);
    }

    if (disclaimerAccepted === 'true') {
      setIsDisclaimerAccepted(true);
    }

    setSessionToken(token);
  }, []);

  const acceptDisclaimer = () => {
    setIsDisclaimerAccepted(true);
    localStorage.setItem('monerSathi_disclaimer', 'true');
  };

  return (
    <SessionContext.Provider value={{ sessionToken, isDisclaimerAccepted, acceptDisclaimer }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
