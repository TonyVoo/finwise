import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@components/Header';
import { addTransaction } from '@services/transactions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackButton from '@components/BackButton';

export default function Add () {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const router = useRouter();

  const { type } = useLocalSearchParams();

  const handleCreate = async () => {
    if(!amount || !category) {
      return Alert.alert(('Missing fields!'));
    }
    try {
      await addTransaction({
        amount: parseFloat(amount),
        category,
        title,
        type,
        date: date.toISOString()
      });

      // Clear inputs
      setAmount('');
      setCategory('');
      setTitle('');
      setNote('');
      setDate(new Date());

      router.replace('/(tabs)/add')
    } catch(err) {
      Alert.alert('Error', 'Could not add transaction');
    }
  }
  return (
    <View style={styles.container}>
      <BackButton/>
      <Text style={styles.content}>Add {type === 'income' ? 'Income' : 'Expense'}</Text>
        <View style={styles.subcontainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder='e.g. Transportation, Food'
            value={category}
            onChangeText={setCategory}
          />
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder='0.00'
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder='Short description'
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Optional note"
            value={note}
            onChangeText={setNote}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
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
  label: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 26,
    fontWeight: 600
  },
  input: {
    marginHorizontal: 24,
    backgroundColor: '#DFF7E2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#00D09E',
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 30, 
    fontWeight: '700', 
    marginBottom: 20, 
    textAlign: 'center'
  }
});