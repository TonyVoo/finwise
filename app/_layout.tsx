import { Stack} from 'expo-router'
import { AuthProvider } from 'context/AuthContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
export default function Layout() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <AuthProvider>
                <Stack screenOptions={{headerShown: false}}/>
            </AuthProvider>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});