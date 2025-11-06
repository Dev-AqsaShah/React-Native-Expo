import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Colors = {
  primary: '#003366', // Dark Blue
  primaryLight: '#E6EEF9',
  white: '#FFFFFF',
};

export default function SignInScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back 👋</Text>
      <Text style={styles.subHeading}>Sign in to continue to 3PL Dynamics</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#7A7A7A" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#7A7A7A"
      />

      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
        <Text style={styles.link}>
          Dont have an account? <Text style={styles.linkBold}>Create Account</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E6EEF9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    backgroundColor: Colors.primaryLight,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  primaryText: {
    color: Colors.white,
    fontWeight: '600' as const,
  },
  link: {
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
  linkBold: {
    fontWeight: '700' as const,
  },
});
