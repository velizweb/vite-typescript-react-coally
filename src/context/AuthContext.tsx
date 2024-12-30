import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";


type AppContextType = {
  token: string | null;
  setToken: (token: string) => void;
  userStora: string | null;
  setUserS: (user: string) => void;
};


type ContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AppContextType>({} as AppContextType);

const AuthProvider = ({ children }: ContextProviderProps) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userStora, setUserStora_] = useState(localStorage.getItem("user"));

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  const setUserS = (user: string) => {
    setUserStora_(user);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (userStora) {
      localStorage.setItem("user", userStora);
    } else {
      localStorage.removeItem("user");
    }
  }, [userStora]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userStora,
      setUserS
    }),
    [token, userStora]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
