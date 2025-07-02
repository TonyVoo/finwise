import { Alert, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth/cordova';
import { useRouter } from 'expo-router';
import { auth, firestore } from '@services/firebase';
import { Pressable, TextInput } from 'react-native-gesture-handler';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore'
import BackButton from '@components/BackButton';

export default function RegisterScreen () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const checkUsernameExists = async (username: string): Promise<boolean> => {
    const q = query(collection(firestore, 'users'), where('username', '==', username));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  const handleRegister = async() => {
    if(password !== confirmPassword) {
      return Alert.alert('Password do not match!');
    }

    if(await checkUsernameExists(username)) {
      return Alert.alert('Password do not match!');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(firestore, 'users', uid), {
        email,
        username,
        createdAt: new Date()
      });
      Alert.alert('Account created sucessfully');
    } catch(error: any) {
      let msg = error.message;
      Alert.alert('Registration Error', msg)
    }
  }
  return (
    <View style={styles.container}>
        <BackButton/>
        <Text style={{fontSize: 36, fontWeight: '700', marginBottom: 50, textAlign: 'center'}}>Register</Text>
        <View style={styles.subcontainer}>
          <Text style={{fontSize: 20, marginTop: 30, marginLeft: 20, marginBottom: 10}}>Username</Text>
          <TextInput style={styles.inputContainer} placeholder='John Doe' value={username} onChangeText={setUsername} autoCapitalize='none'/>

          <Text style={{fontSize: 20, marginTop: 30, marginLeft: 20, marginBottom: 10}}>Email</Text>
          <TextInput style={styles.inputContainer} placeholder='example@gmail.com' value={email} onChangeText={setEmail} autoCapitalize='none'/>

          <Text style={{fontSize: 20, marginTop: 30, marginLeft: 20, marginBottom: 10}}>Password</Text>
          <TextInput style={styles.inputContainer} placeholder='*********' value={password} onChangeText={setPassword} secureTextEntry/>

          <Text style={{fontSize: 20, marginTop: 30, marginLeft: 20, marginBottom: 10}}>Confirm Password</Text>
          <TextInput style={styles.inputContainer} placeholder='*********' value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry/>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.buttonText}>
                Register
              </Text>
            </TouchableOpacity>
          </View> 
          <View style={styles.footer}>
            <Text style={{fontSize: 16}}>
              Already have an account
            </Text>
            <Pressable onPress={() => router.push('/(auth)/login')}>
              <Text style={{fontSize: 16, fontStyle: 'italic', color: '#3299FF'}}>
                Login
              </Text>
            </Pressable>
          </View> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00D09E',
    flex: 1,
    justifyContent: 'flex-start',
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
  buttonContainer: {
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
    marginTop: 10
  }
})