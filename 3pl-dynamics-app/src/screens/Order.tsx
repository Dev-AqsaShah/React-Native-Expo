// src/screens/OrdersScreen.tsx
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../theme';

const ORDERS = [
  { id: 'o1', order: 'ORD-001', status: 'In transit' },
  { id: 'o2', order: 'ORD-002', status: 'Delivered' },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={ORDERS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.order}>{item.order}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colors.white },
  title: { fontSize: 20, fontWeight: '700', color: Colors.primary, marginBottom: 12 },
  row: { padding: 12, borderRadius: 8, backgroundColor: '#F7FAFF', marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
  order: { fontWeight: '700' },
  status: { color: Colors.muted }
});
