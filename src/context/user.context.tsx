/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { hasUserName, normalizeUserName } from "@/utils/user-name";

type UserContextType = {
  name: string;
  setName: (name: string) => void;
  clearName: () => void;
  isNameSet: boolean;
};

const USER_STORAGE_KEY = "doodle-chat-user-name";

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [name, setNameState] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return localStorage.getItem(USER_STORAGE_KEY) ?? "";
  });

  const setName = (value: string) => {
    const trimmedValue = normalizeUserName(value);
    setNameState(trimmedValue);

    if (trimmedValue) {
      localStorage.setItem(USER_STORAGE_KEY, trimmedValue);
      return;
    }

    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const clearName = () => {
    setNameState("");
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      name,
      setName,
      clearName,
      isNameSet: hasUserName(name),
    }),
    [name]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}