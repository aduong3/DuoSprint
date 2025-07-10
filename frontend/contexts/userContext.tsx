import { createContext, useContext, useState } from "react";

type UserData = {
  userId: string;
  username: string;
};

type UserContextType = {
  user?: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserContextProvider({ children }) {
  const [user, setUser] = useState<UserData>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext was used outside of UserContextProvider");
  }
  return context;
}

export { UserContextProvider, useUserContext };
