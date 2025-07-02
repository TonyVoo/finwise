import { Alert, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';
import { useRouter, Link } from 'expo-router';
import { auth, firestore } from '@services/firebase';
import { Pressable, TextInput } from 'react-native-gesture-handler';
import { getDocs, where, query, collection } from 'firebase/firestore';
import BackButton from '@components/BackButton';

export default function LoginScreen () {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const resolveEmail = async (input: string): Promise<string> => {
    if(input.includes('@')) return input;

    const q = query(
      collection(firestore, 'users'),
      where('username', '==', input)
    );
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty) throw new Error('Username not found');
    return querySnapshot.docs[0].data().email;
  }

  const handleLogin = async() => {
    try {
      const email = await resolveEmail(identifier);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/home');
    } catch(error: any) {
      let msg = error.message;
      Alert.alert('Login Error', msg)
    }
  }
  return (
    <View style={styles.container}>
        <BackButton/>
        <Text style={{fontSize: 36, fontWeight: '700', marginBottom: 50, textAlign: 'center'}}>Login</Text>
        <View style={styles.subcontainer}>
          <Text style={{fontSize: 20, marginTop: 30, marginLeft: 20, marginBottom: 10}}>Email</Text>
          <TextInput style={styles.inputContainer} placeholder='example@gmail.com' value={identifier} onChangeText={setIdentifier} autoCapitalize='none'/>
          <Text style={{fontSize: 20, marginTop: 30, marginLeft: 20, marginBottom: 10}}>Password</Text>
          <TextInput style={styles.inputContainer} placeholder='*********' value={password} onChangeText={setPassword} secureTextEntry/>
          <View style={styles.loginbuttonContainer}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.buttonText}>
                Login
              </Text>
            </TouchableOpacity>
          </View> 
          <View style={styles.footer}>
            <Text style={{fontSize: 16}}>
              Don't have an account?
            </Text>
            <Link href="/(auth)/forgot-password">
              <Text style={{ color: 'blue', textAlign: 'center' }}>
                Forgot Password?
              </Text>
            </Link>
          </View> 
          <View style={styles.signupbuttonContainer}>
            <TouchableOpacity onPress={() => router.navigate('/(auth)/register')}>
              <Text style={styles.buttonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00D09E',
    flex: 1,
    paddingTop: 100,
  },
  subcontainer: {
    width: 401,
    backgroundColor: '#F1FFF3',
    flex: 1,
    borderRadius: 40,
  },
  inputContainer: {
    backgroundColor: '#DFF7E2',
    width: 350,
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
    paddingLeft: 10
  },
  loginbuttonContainer: {
    backgroundColor: '#00D09E',
    marginTop: 30,
    width: 350,
    height: 50,
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 700
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  signupbuttonContainer: {
    backgroundColor: '#DFF7E2',
    width: 350,
    height: 50,
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
})