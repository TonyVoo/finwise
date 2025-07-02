import { Calendar } from "react-native-calendars";
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
    selectedDate: string,
    onDateChange: (date: string) => void;
}

export default function TransactionCalendar({ selectedDate, onDateChange}: Props) {
    return (
        <Calendar
            onDayPress={(day) => {
                onDateChange(day.dateString);
            }}
            markedDates={{
                [selectedDate]: {
                    selected: true,
                    selectedColor: '#00D09E'
                }
            }}
            theme={{
                calendarBackground: '#F1FFF3',
                textSectionTitleColor: '#333',
                selectedDayBackgroundColor: '#00D09E',
                selectedDayTextColor: '#fff',
                todayTextColor: '#00D09E',
                dayTextColor: '#000',
                textDisabledColor: '#ccc',
                monthTextColor: '#000',
                arrowColor: '#00D09E',
                textDayFontSize: 18,
                textMonthFontSize: 30,
                textDayHeaderFontSize: 16,
                textDayFontWeight: '500',
                textMonthFontWeight: 'bold',
            }}
            style={styles.calendar}
        />
    )
}

const styles = StyleSheet.create({
  calendar: {
    paddingVertical: 20,
    marginVertical: 16,
    borderRadius: 40,
    backgroundColor: '#F1FFF3',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 8,
    width: 401,
    height: 400,
  },
});