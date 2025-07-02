import { sendPasswordResetEmail } from 'firebase/auth/cordova';
import {useState} from 'react';
import { Alert, Button, TextInput, View, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from '@services/firebase';
import { Link, useRouter } from 'expo-router';
import BackButton from '@components/BackButton';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleReset = async () => {
        if(!email) {
            return Alert.alert('Please enter your email address.');
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Password reset email sent. Please check your inbox!');
            router.replace('/(auth)/login');
        } catch(error: any) {
            let msg = error.message;
            Alert.alert('Error:', msg);
        }
    };
    return (
        <View style={styles.container}>
            <BackButton/>
            <Text style={{fontSize: 36, fontWeight: '700', marginBottom: 50, textAlign: 'center'}}>Forgot Password</Text>
            <View style={styles.subcontainer}>
                <Text style={{fontSize: 20, marginTop: 30, marginLeft: 20, marginBottom: 10}}>Enter Email Address</Text>
                <TextInput style={styles.inputContainer} placeholder='Enter your email' value={email} onChangeText={setEmail} autoCapitalize='none'/>
                <View style={styles.sendText}>
                    <Button title="Send Reset Email" onPress={handleReset}/>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => router.navigate('/(auth)/register')}>
                        <Text style={styles.buttonText}>
                            Sign Up
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
    sendText: {
        marginTop: 20
    }
})