import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';


type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;


export default function SignUpScreen({ navigation }: Props) {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


function handleSignUp() {
// stub — do validation later
navigation.replace('Home');
}


return (
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
<Text style={styles.heading}>Create account</Text>


<TextInput placeholder="Full name" value={name} onChangeText={setName} style={styles.input} />
<TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />


<TouchableOpacity style={styles.primaryBtn} onPress={handleSignUp}>
<Text style={styles.primaryText}>Create account</Text>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
<Text style={styles.link}>Already have an account? Sign in</Text>
</TouchableOpacity>
</KeyboardAvoidingView>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: Colors.white, padding: 24, justifyContent: 'center' },
heading: { fontSize: 28, fontWeight: '700', color: Colors.primary, marginBottom: 24 },
input: { borderWidth: 1, borderColor: '#E6EEF9', padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor: Colors.primaryLight },
primaryBtn: { backgroundColor: Colors.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
primaryText: { color: Colors.white, fontWeight: '600' },
link: { color: Colors.primary, textAlign: 'center', marginTop: 16 }
});