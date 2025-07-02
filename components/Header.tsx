import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '@services/firebase';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';

interface HeaderProps {
  showLogout?: boolean;
  showNotification?: boolean;
}

export default function Header({ showLogout = true, showNotification = true }: HeaderProps) {
  const router = useRouter();
  const [username, setUsername] = useState<string>('User');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/welcome');
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }
  };

  const fetchUsername = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUsername(data.username || 'User');
      }
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>Welcome, {username}</Text>
      <View style={styles.iconWrapper}>
        {showNotification && (
          <TouchableOpacity onPress={() => Alert.alert('Notifications clicked')}>
            <View style={styles.iconCircle}>
              <Ionicons size={24} name="notifications-outline" color="#000" />
            </View>
          </TouchableOpacity>
        )}
        {showLogout && (
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.iconCircle}>
              <Ionicons size={24} name="log-out-outline" color="#000" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 50,
    paddingLeft: 16,
    paddingRight: 16
  },
  iconCircle: {
    backgroundColor: '#DFF7E2',
    borderRadius: 999,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#DFF7E2',
  },
  iconWrapper: {
    flexDirection: 'row',
    gap: 16,
  },
});