import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from 'context/AuthContext';

SplashScreen.preventAutoHideAsync(); // Keeps splash visible on launch

export default function Index() {
  const { user, loading } = useContext(AuthContext);
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  // Check if first launch (welcome screen)
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setShowWelcome(true);
        } else {
          setShowWelcome(false);
        }
      } catch (e) {
        console.warn('Error reading hasLaunched', e);
        setShowWelcome(false);
      }
    };

    if (!loading) {
      checkFirstLaunch();
    }
  }, [loading]);

  // Hide splash only when auth + welcome logic is resolved
  const onReady = useCallback(async () => {
    if (!loading && showWelcome !== null) {
      await SplashScreen.hideAsync();
    }
  }, [loading, showWelcome]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  // Show nothing while loading
  if (loading || showWelcome === null) return null;

  // Navigation decisions
  if (showWelcome) return <Redirect href="/welcome" />;
  return <Redirect href={user ? '/(tabs)/home' : '/(auth)/login'} />;
}
