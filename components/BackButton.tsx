import React from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BackButtonProps {
  label?: string;
  style?: ViewStyle;
  color?: string;
}

export default function BackButton ({ label = 'Back', style, color = '#333' }: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={20} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    marginLeft: 6,
  },
});
