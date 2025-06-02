
"use client";

import type { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  GoogleAuthProvider, // Added
  signInWithPopup      // Added
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'; // Added getDoc
import { auth, db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialLoading: boolean;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<User | null>;
  signInWithEmail: (email: string, pass: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>; // Added
  appSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setInitialLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (name: string, email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName: name });
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: name,
        profilePictureUrl: userCredential.user.photoURL || "",
        createdAt: serverTimestamp(),
        role: "passenger", 
      });

      setUser(userCredential.user);
      toast({ title: "Registration Successful", description: "Welcome to Paradise Rides!" });
      return userCredential.user;
    } catch (error: unknown) {
      console.error("Sign up error:", error);
      toast({ variant: "destructive", title: "Registration Failed", description: error.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      setUser(userCredential.user);
      toast({ title: "Login Successful", description: "Welcome back!" });
      return userCredential.user;
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<User | null> => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      // Check if user exists in Firestore, if not, create them
      const userDocRef = doc(db, "users", googleUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: googleUser.uid,
          email: googleUser.email,
          name: googleUser.displayName,
          profilePictureUrl: googleUser.photoURL || "",
          createdAt: serverTimestamp(),
          role: "passenger",
        });
      }
      // The onAuthStateChanged listener will handle setting the user state.
      // However, we can set it here for immediate UI update if desired,
      // but it might cause a quick flicker if onAuthStateChanged is slightly delayed.
      // For simplicity, let onAuthStateChanged handle it, or update here:
      setUser(googleUser); 
      toast({ title: "Google Sign-In Successful", description: `Welcome, ${googleUser.displayName}!` });
      return googleUser;
    } catch (error: unknown) {
      console.error("Google sign in error:", error);
      // Handle specific errors like popup closed by user
      if (error.code === 'auth/popup-closed-by-user') {
        toast({ variant: "default", title: "Sign-In Cancelled", description: "Google Sign-In was cancelled." });
      } else {
        toast({ variant: "destructive", title: "Google Sign-In Failed", description: error.message });
      }
      return null;
    } finally {
      setLoading(false);
    }
  };


  const appSignOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
    } catch (error: unknown) {
      console.error("Sign out error:", error);
      toast({ variant: "destructive", title: "Logout Failed", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, initialLoading, signUpWithEmail, signInWithEmail, signInWithGoogle, appSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
