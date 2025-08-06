import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, UserData } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  syncData: (data: Partial<UserData>) => Promise<void>;
  getUserData: () => Promise<UserData | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Versión demo que funciona sin Firebase para desarrollo
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('demoUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('demoUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Verificar credenciales demo
      const savedUsers = JSON.parse(localStorage.getItem('demoUsers') || '{}');
      const userKey = email.toLowerCase();
      
      if (savedUsers[userKey] && savedUsers[userKey].password === password) {
        const userData: User = {
          id: savedUsers[userKey].id,
          email: email,
          displayName: savedUsers[userKey].displayName,
          createdAt: new Date(savedUsers[userKey].createdAt)
        };
        
        setUser(userData);
        localStorage.setItem('demoUser', JSON.stringify(userData));
      } else {
        throw new Error('Email o contraseña incorrectos');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string): Promise<void> => {
    setLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Verificar si el email ya existe
      const savedUsers = JSON.parse(localStorage.getItem('demoUsers') || '{}');
      const userKey = email.toLowerCase();
      
      if (savedUsers[userKey]) {
        throw new Error('Este email ya está registrado');
      }
      
      // Crear nuevo usuario demo
      const userId = Date.now().toString();
      const userData: User = {
        id: userId,
        email: email,
        displayName: displayName,
        createdAt: new Date()
      };
      
      // Guardar en "base de datos" demo
      savedUsers[userKey] = {
        id: userId,
        password: password,
        displayName: displayName,
        createdAt: new Date().toISOString(),
        userData: {
          studySessions: [],
          questions: [],
          notes: [],
          tasks: [],
          calendarEvents: [],
          moodEntries: []
        }
      };
      
      localStorage.setItem('demoUsers', JSON.stringify(savedUsers));
      localStorage.setItem('demoUser', JSON.stringify(userData));
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem('demoUser');
  };

  const syncData = async (data: Partial<UserData>): Promise<void> => {
    if (!user) throw new Error('No user authenticated');
    
    // Simular sincronización guardando en localStorage
    const savedUsers = JSON.parse(localStorage.getItem('demoUsers') || '{}');
    const userKey = user.email.toLowerCase();
    
    if (savedUsers[userKey]) {
      savedUsers[userKey].userData = { ...savedUsers[userKey].userData, ...data };
      localStorage.setItem('demoUsers', JSON.stringify(savedUsers));
    }
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const getUserData = async (): Promise<UserData | null> => {
    if (!user) return null;
    
    const savedUsers = JSON.parse(localStorage.getItem('demoUsers') || '{}');
    const userKey = user.email.toLowerCase();
    
    if (savedUsers[userKey]) {
      return savedUsers[userKey].userData;
    }
    
    return null;
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    syncData,
    getUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
