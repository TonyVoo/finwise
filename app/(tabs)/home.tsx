import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Header from '@components/Header';
import { deleteTransaction, getTransactions } from '@services/transactions';

type Transaction = { id: string };

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Header/>
        
      </View>
      <View style={styles.subcontainer}>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00D09E',
    flex: 1,
    paddingTop: 90,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  subcontainer: {
    width: 401,
    backgroundColor: '#F1FFF3',
    flex: 1,
    borderRadius: 40,
  },
  totalContainer: {

  }
});
