import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';


type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;


export default function WelcomeScreen({ navigation }: Props) {
return (
<View style={styles.container}>
<View style={styles.brand}>
{/* optional logo */}
<Text style={styles.title}>3PL Dynamics</Text>
</View>


<Text style={styles.subtitle}>Smart, simple logistics.</Text>


<View style={styles.actions}>
<TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('SignIn')}>
<Text style={styles.primaryText}>Sign In</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('SignUp')}>
<Text style={styles.outlineText}>Create account</Text>
</TouchableOpacity>
</View>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', padding: 24 },
brand: { alignItems: 'center', marginBottom: 20 },
logo: { width: 96, height: 96, marginBottom: 12, resizeMode: 'contain' },
title: { fontSize: 24, fontWeight: '700', color: Colors.primary },
subtitle: { color: Colors.muted, marginBottom: 40 },
actions: { width: '100%' },
primaryBtn: { backgroundColor: Colors.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
primaryText: { color: Colors.white, fontWeight: '600' },
outlineBtn: { borderWidth: 1, borderColor: Colors.primary, padding: 12, borderRadius: 10, alignItems: 'center' },
outlineText: { color: Colors.primary, fontWeight: '600' },
});