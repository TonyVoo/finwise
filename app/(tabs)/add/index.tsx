import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Header from '@components/Header';
import TransactionCalendar from '@components/TransactionCalendar';
import { useState } from 'react';

export default function AddSelector() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.subcontainer}>
        <TransactionCalendar
          selectedDate={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
        />
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary for {new Date(selectedDate).toLocaleString('default', { month: 'long', year: 'numeric' })}</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Income:</Text>
            <Text style={[styles.value, { color: '#00D09E' }]}>+ ${monthlyData.income.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.label}>Expense:</Text>
            <Text style={[styles.value, { color: '#FF7262' }]}>– ${monthlyData.expense.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#00D09E' }]}
            onPress={() => router.push('/(tabs)/add/income')}
          >
            <Text style={styles.buttonText}>Add Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF7262' }]}
            onPress={() => router.push('/(tabs)/add/expense')}
          >
            <Text style={styles.buttonText}>Add Expense</Text>
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
    paddingTop: 90,
  },
  buttonContainer: {
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  button: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subcontainer: {
    width: 401,
    backgroundColor: '#F1FFF3',
    flex: 1,
    borderRadius: 40,
    justifyContent: 'center',
  },
});
