
import React, { createContext, useState, useContext } from 'react';

type UserSubscription = 'free' | 'premium';

interface User {
  isLoggedIn: boolean;
  name: string | null;
  email: string | null;
  subscription: UserSubscription;
}

interface UserContextType {
  user: User;
  login: (email: string, name: string) => void;
  logout: () => void;
  upgradeToPremium: () => void;
}

const defaultUser: User = {
  isLoggedIn: false,
  name: null,
  email: null,
  subscription: 'free',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  const login = (email: string, name: string) => {
    const newUser = {
      isLoggedIn: true,
      email,
      name,
      subscription: 'free' as UserSubscription,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(defaultUser);
    localStorage.removeItem('user');
  };

  const upgradeToPremium = () => {
    const updatedUser = { ...user, subscription: 'premium' as UserSubscription };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, upgradeToPremium }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
