import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  type User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', firebaseUser?.uid || 'null');
      
      try {
        if (firebaseUser) {
          const userData: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || undefined,
            createdAt: new Date(firebaseUser.metadata.creationTime!)
          };
          setUser(userData);
          console.log('User set:', userData.email);
        } else {
          setUser(null);
          console.log('User set to null');
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setUser(null);
      }
      
      // Limpiar timeout si el auth state cambió
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      setLoading(false);
      console.log('Loading set to false');
    });

    // Timeout de seguridad reducido
    timeoutId = setTimeout(() => {
      console.warn('Auth timeout reached, forcing loading to false');
      setLoading(false);
    }, 5000); // Reducido a 5 segundos

    return () => {
      unsubscribe();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string): Promise<void> => {
    try {
      console.log('Starting registration process...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created in Firebase Auth:', userCredential.user.uid);
      
      await updateProfile(userCredential.user, { displayName });
      console.log('Profile updated with displayName:', displayName);
      
      // No crear documento de Firestore inmediatamente para evitar bloqueos
      // Se creará más tarde cuando sea necesario
      console.log('Registration completed successfully');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const syncData = async (data: Partial<UserData>): Promise<void> => {
    if (!user) throw new Error('No user authenticated');
    
    try {
      await setDoc(doc(db, 'users', user.id), data, { merge: true });
    } catch (error) {
      throw error;
    }
  };

  const getUserData = async (): Promise<UserData | null> => {
    if (!user) return null;
    
    try {
      const docRef = doc(db, 'users', user.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
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
