import { createContext, useContext, type FC, type ReactNode } from 'react';

const NonceContext = createContext<string | undefined>(undefined);

export const NonceProvider: FC<{ children: ReactNode; nonce: string }> = ({ nonce, children }) => {
  return <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>;
};
export const useNonce = () => {
  const nonce = useContext(NonceContext);
  return nonce;
};


