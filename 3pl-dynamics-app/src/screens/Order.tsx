// src/screens/OrdersScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Order = {
  id: string;
  orderNo: string;
  status: 'Pending' | 'Processing' | 'In transit' | 'Delivered' | 'Cancelled' | 'Returned';
  items: number;
  customer: string;
  eta: string; // e.g. '2025-11-18'
  tracking: string;
  pickup: string;
  weight: string;
  total: string;
};

const ORDERS: Order[] = [
  {
    id: 'o1',
    orderNo: 'ORD-1001',
    status: 'In transit',
    items: 3,
    customer: 'Ayesha Khan',
    eta: 'Nov 18, 2025',
    tracking: 'TRK-334455',
    pickup: 'WH-01 / Dock 3',
    weight: '12.6 kg',
    total: 'PKR 4,200',
  },
  {
    id: 'o2',
    orderNo: 'ORD-1002',
    status: 'Delivered',
    items: 1,
    customer: 'Bilal Ali',
    eta: 'Nov 12, 2025',
    tracking: 'TRK-334456',
    pickup: 'WH-02 / Dock 1',
    weight: '2.3 kg',
    total: 'PKR 1,200',
  },
  {
    id: 'o3',
    orderNo: 'ORD-1003',
    status: 'Processing',
    items: 5,
    customer: 'Sana Raza',
    eta: 'Nov 20, 2025',
    tracking: 'TRK-334457',
    pickup: 'WH-01 / Rack A3',
    weight: '8.9 kg',
    total: 'PKR 6,500',
  },
  {
    id: 'o4',
    orderNo: 'ORD-1004',
    status: 'Pending',
    items: 2,
    customer: 'Omar Farooq',
    eta: 'Nov 25, 2025',
    tracking: 'TRK-334458',
    pickup: 'WH-03 / Shelf S2',
    weight: '4.1 kg',
    total: 'PKR 2,900',
  },
  {
    id: 'o5',
    orderNo: 'ORD-1005',
    status: 'Cancelled',
    items: 1,
    customer: 'Hira Shah',
    eta: '—',
    tracking: 'N/A',
    pickup: 'Returns Area / R1',
    weight: '0.7 kg',
    total: 'PKR 0',
  },
  {
    id: 'o6',
    orderNo: 'ORD-1006',
    status: 'In transit',
    items: 10,
    customer: 'Zain Logistics',
    eta: 'Nov 19, 2025',
    tracking: 'TRK-334459',
    pickup: 'Bulk Yard / Slot D4',
    weight: '220 kg',
    total: 'PKR 34,000',
  },
  {
    id: 'o7',
    orderNo: 'ORD-1007',
    status: 'Returned',
    items: 2,
    customer: 'Rashid Pvt Ltd',
    eta: '—',
    tracking: 'TRK-334460',
    pickup: 'Returns Area / R2',
    weight: '3.4 kg',
    total: 'PKR 0',
  },
  {
    id: 'o8',
    orderNo: 'ORD-1008',
    status: 'Processing',
    items: 4,
    customer: 'Nida Enterprises',
    eta: 'Nov 22, 2025',
    tracking: 'TRK-334461',
    pickup: 'Kitting Station / K-2',
    weight: '9.0 kg',
    total: 'PKR 9,800',
  },
  {
    id: 'o9',
    orderNo: 'ORD-1009',
    status: 'In transit',
    items: 6,
    customer: 'Ali & Co.',
    eta: 'Nov 17, 2025',
    tracking: 'TRK-334462',
    pickup: 'WH-02 / Rack E5',
    weight: '18.7 kg',
    total: 'PKR 12,600',
  },
  {
    id: 'o10',
    orderNo: 'ORD-1010',
    status: 'Delivered',
    items: 12,
    customer: 'Marketing Team',
    eta: 'Nov 10, 2025',
    tracking: 'TRK-334463',
    pickup: 'Promo Shelf / P1',
    weight: '6.0 kg',
    total: 'PKR 3,000',
  },
];

function statusColor(status: Order['status']) {
  switch (status) {
    case 'Pending':
      return '#F59E0B'; // amber
    case 'Processing':
      return '#2563EB'; // blue
    case 'In transit':
      return '#06B6D4'; // teal
    case 'Delivered':
      return '#10B981'; // green
    case 'Cancelled':
      return '#EF4444'; // red
    case 'Returned':
      return '#7C3AED'; // purple
    default:
      return Colors.muted;
  }
}

function OrderCard({ item, index }: { item: Order; index: number }) {
  return (
    <Animated.View entering={FadeInUp.duration(360).delay(index * 60)} style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => console.log('Open order', item.orderNo)}
      >
        <View style={styles.left}>
          <View style={styles.orderIcon}>
            <Feather name="package" size={20} color={Colors.primary} />
          </View>
        </View>

        <View style={styles.center}>
          <View style={styles.topRow}>
            <Text style={styles.orderNo}>{item.orderNo}</Text>
            <View style={[styles.badge, { backgroundColor: statusColor(item.status) }]}>
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
          </View>

          <Text style={styles.customer}>{item.customer} • {item.items} items</Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>ETA: <Text style={styles.metaStrong}>{item.eta}</Text></Text>
            <Text style={styles.meta}>Weight: <Text style={styles.metaStrong}>{item.weight}</Text></Text>
          </View>

          <Text style={styles.pickup} numberOfLines={1}>
            <Feather name="map-pin" size={12} color={Colors.muted} />  {item.pickup}
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.total}>{item.total}</Text>
          <Feather name="chevron-right" size={18} color={Colors.muted} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.sub}>Live order tracking & fulfillment</Text>
      </View>

      <FlatList
        data={ORDERS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => <OrderCard item={item} index={index} />}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E9F0',
    backgroundColor: Colors.white,
  },
  title: { fontSize: 22, fontWeight: '700', color: Colors.primary },
  sub: { fontSize: 13, color: Colors.muted, marginTop: 4 },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },

  cardWrapper: {
    // placeholder for animation space
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  left: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    paddingRight: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNo: { fontSize: 15, fontWeight: '700', color: Colors.text },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  customer: { marginTop: 6, color: Colors.muted, fontSize: 13 },
  metaRow: { flexDirection: 'row', marginTop: 8, gap: 12 },
  meta: { fontSize: 12, color: Colors.primary },
  metaStrong: { fontWeight: '700', color: Colors.text },
  pickup: { marginTop: 10, color: Colors.muted, fontSize: 12 },

  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 56,
  },
  total: { fontSize: 13, fontWeight: '700', color: Colors.primary },
});
