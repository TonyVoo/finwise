import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {router} from 'expo-router'

export default function WelcomeScreen () {
  return (
    <View style={styles.container}>
        <View style={styles.titlecontainer}>
            <Text style={{fontSize: 36, fontWeight: '700'}}>Welcome to</Text>
            <Text style={{fontSize: 36, fontWeight: '700', marginBottom: 20}}>Expense Tracker</Text>
            <Text style={{ fontSize: 14,textAlign: 'center', marginBottom: 40 }}>
                Track your expenses, talk to your AI finance assistant, and stay in control of your money.
            </Text>
        </View>
        <View style={styles.subcontainer}>
            <View style={styles.circle}/>
            <Image source={require('../assets/welcome.png')} style={{ width: 300, height: 300, paddingBottom: 50 }} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text style={styles.buttonText}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00D09E',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titlecontainer: {
        paddingTop: 120,
        alignItems: 'center',
    },
    subcontainer: {
        width: 401,
        backgroundColor: '#F1FFF3',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    circle: {
        width: 300, 
        height: 300,
        borderRadius: 150, 
        backgroundColor: '#DFF7E2', 
        position: 'absolute',
        top: 100, 
        alignSelf: 'center', 
        zIndex: 0
    },
    buttonContainer: {
        backgroundColor: '#00D09E',
        width: 300,
        height: 50,
        borderRadius: 10,
        top: 40,
        fontWeight: 700,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 700
    }
})