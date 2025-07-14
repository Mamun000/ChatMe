import { View, Text } from 'react-native'
import React from 'react'
import "../global.css"
import { Slot } from 'expo-router'
import { AuthContext } from '../context/authContext'
import { useSegments, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthContextProvider } from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(()=>{
    if(typeof isAuthenticated === 'undefined') return;
    const inApp=segments[0]=='(app)';
    if(isAuthenticated && !inApp){
      // Redirect to home if authenticated
     router.replace('/(app)/home');
    }else if(isAuthenticated ==false){
      // Redirect to sign in if not authenticated
      router.replace('/SignIn');
    }
    
  }, [isAuthenticated]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
    </MenuProvider>
    
  )
}