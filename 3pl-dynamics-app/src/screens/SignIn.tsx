import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';


type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;


export default function SignInScreen({ navigation }: Props) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


function handleSignIn() {
// For now just navigate to Home — later we'll add real auth
navigation.replace('Home');
}


return (
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
<Text style={styles.heading}>Welcome back</Text>


<TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />


<TouchableOpacity style={styles.primaryBtn} onPress={handleSignIn}>
<Text style={styles.primaryText}>Sign In</Text>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
<Text style={styles.link}>Don’t have an account? Create one</Text>
</TouchableOpacity>
</KeyboardAvoidingView>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: Colors.white, padding: 24, justifyContent: 'center' },
heading: { fontSize: 28, fontWeight: '700', color: Colors.primary, marginBottom: 24 },
input: { borderWidth: 1, borderColor: '#E6EEF9', padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor: Colors.primaryLight },
primaryBtn: { backgroundColor: Colors.primary, padding: 14, borderRadius: 10,