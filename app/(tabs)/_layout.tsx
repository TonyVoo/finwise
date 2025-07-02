import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function BottomTabs () {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#DFF7E2',
          height: 100,
          paddingBottom: 10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          width: 60, // Adjusted for better spacing
        },
        tabBarIconStyle: {
          marginTop: 20,
        },
        tabBarIcon: ({ color, focused }) => {
          const size = 30;
          let iconName: React.ComponentProps<typeof Ionicons>['name'] | null;
          switch (route.name) {
            case 'home':
              iconName = 'home';
              break;
            case 'add':
              iconName = 'add-circle-outline';
              break;
            case 'stats':
              iconName = 'bar-chart-outline';
              break;
            case 'chatbot':
              iconName = 'chatbubble-ellipses';
              break;
            case 'profile':
              iconName = 'person-outline';
              break;
            default:
              iconName = null;
          }

          return (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              {iconName && <Ionicons name={iconName as React.ComponentProps<typeof Ionicons>['name']} size={size} color={color} />}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="stats" />
      <Tabs.Screen name="add" options={{ title: 'Add' }}/>
      <Tabs.Screen name="chatbot" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Size of the circular background
    height: 50,
    borderRadius: 25, // Half of width/height for perfect circle
  },
  activeIconContainer: {
    backgroundColor: '#00D09E', // Circular background color for active tab
  },
});

