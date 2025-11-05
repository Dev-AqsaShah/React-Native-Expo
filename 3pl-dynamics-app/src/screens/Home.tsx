import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


export default function HomeScreen({ navigation }: Props) {
return (
<View style={styles.container}>
<Text style={styles.title}>Dashboard</Text>
<Text style={styles.subtitle}>Welcome to 3PL Dynamics</Text>


<TouchableOpacity style={styles.signOut} onPress={() => navigation.replace('Welcome')}>
<Text style={{ color: Colors.primary }}>Sign out</Text>
</TouchableOpacity>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: Colors.white, padding: 24, alignItems: 'center', justifyContent: 'center' },
title: { fontSize: 22, fontWeight: '700', color: Colors.text },
subtitle: { color: Colors.muted, marginTop: 8 },
signOut: { marginTop: 20 }
});