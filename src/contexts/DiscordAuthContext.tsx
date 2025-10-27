import React, { createContext, useContext, useState, useEffect } from 'react';

interface DiscordUser {
  discord_id: string;
  discord_username: string;
  discord_avatar: string | null;
}

interface DiscordAuthContextType {
  user: DiscordUser | null;
  login: (userData: DiscordUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const DiscordAuthContext = createContext<DiscordAuthContextType | undefined>(undefined);

export const DiscordAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('discord_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: DiscordUser) => {
    setUser(userData);
    localStorage.setItem('discord_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('discord_user');
  };

  return (
    <DiscordAuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </DiscordAuthContext.Provider>
  );
};

export const useDiscordAuth = () => {
  const context = useContext(DiscordAuthContext);
  if (context === undefined) {
    throw new Error('useDiscordAuth must be used within a DiscordAuthProvider');
  }
  return context;
};
