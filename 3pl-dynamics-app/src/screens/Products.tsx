// src/screens/ProductsScreen.tsx
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

type Product = {
  id: string;
  name: string;
  sku: string;
  qty: number;
  weight: string;
  dims: string;
  location: string;
  desc: string;
};

const SAMPLE: Product[] = [
  {
    id: 'p1',
    name: 'Parcel A - Express',
    sku: '3PL-EX-001',
    qty: 34,
    weight: '2.4 kg',
    dims: '30×20×10 cm',
    location: 'WH-01 / Rack A3',
    desc: 'Priority parcel — fast handling & same-day dispatch for nearby zones.',
  },
  {
    id: 'p2',
    name: 'Box B - Fragile',
    sku: '3PL-FR-023',
    qty: 12,
    weight: '5.2 kg',
    dims: '45×30×25 cm',
    location: 'WH-02 / Bin B1',
    desc: 'Fragile items handled with extra packaging and careful pick-pack process.',
  },
  {
    id: 'p3',
    name: 'Crate C - Heavy',
    sku: '3PL-HV-110',
    qty: 5,
    weight: '48 kg',
    dims: '120×80×60 cm',
    location: 'Bulk Yard / Slot D4',
    desc: 'Heavy-duty crate for industrial shipments, forklift required for move.',
  },
  {
    id: 'p4',
    name: 'Pallet D - Standard',
    sku: '3PL-PL-045',
    qty: 18,
    weight: '320 kg',
    dims: '120×100×150 cm',
    location: 'WH-01 / Pallet Row 2',
    desc: 'Standard palletised inventory for regular outbound flow.',
  },
  {
    id: 'p5',
    name: 'Return Unit E',
    sku: '3PL-RT-010',
    qty: 7,
    weight: '1.1 kg',
    dims: '25×20×8 cm',
    location: 'Returns Area / Shelf R1',
    desc: 'Customer returns — inspected and awaiting restock or disposal.',
  },
  {
    id: 'p6',
    name: 'Kitting Pack F',
    sku: '3PL-KT-007',
    qty: 54,
    weight: '3.6 kg',
    dims: '35×25×12 cm',
    location: 'Kitting Station / K-2',
    desc: 'Pre-bundled kits for subscription orders — pick & pack optimized.',
  },
  {
    id: 'p7',
    name: 'Coldbox G (Temp-controlled)',
    sku: '3PL-CL-008',
    qty: 9,
    weight: '4.3 kg',
    dims: '40×30×20 cm',
    location: 'Cold Storage / Zone C',
    desc: 'Temperature controlled items, special handling & traceability enabled.',
  },
  {
    id: 'p8',
    name: 'Accessories Pack H',
    sku: '3PL-AC-066',
    qty: 120,
    weight: '0.2 kg',
    dims: '10×8×2 cm',
    location: 'WH-03 / Small Parts Rack',
    desc: 'Small accessories, high turnover — optimised for bin-picking.',
  },
  {
    id: 'p9',
    name: 'Bulky Item I',
    sku: '3PL-BU-014',
    qty: 3,
    weight: '75 kg',
    dims: '160×80×80 cm',
    location: 'Bulk Yard / Slot A1',
    desc: 'Oversized furniture items — scheduled delivery with 2-person lift.',
  },
  {
    id: 'p10',
    name: 'Sample J - Promo',
    sku: '3PL-PR-900',
    qty: 250,
    weight: '0.05 kg',
    dims: '8×6×1 cm',
    location: 'Promo Shelf / P1',
    desc: 'Promotional samples — allocated for marketing campaigns.',
  },
  {
    id: 'p11',
    name: 'Electro Kit K',
    sku: '3PL-EL-311',
    qty: 22,
    weight: '1.8 kg',
    dims: '28×22×10 cm',
    location: 'WH-02 / Rack E5',
    desc: 'Electronics kit — barcode-tracked, serial numbers available.',
  },
  {
    id: 'p12',
    name: 'Spare Parts L',
    sku: '3PL-SP-213',
    qty: 78,
    weight: '0.5 kg',
    dims: '18×12×6 cm',
    location: 'WH-03 / Spare Rack 6',
    desc: 'High-rotation spare parts, auto-reorder threshold configured.',
  },
];

function ProductCard({ item, index }: { item: Product; index: number }) {
  return (
    <Animated.View
      entering={FadeInUp.duration(360).delay(index * 60)}
      style={styles.cardWrapper}
    >
      <View style={styles.card}>
        <View style={styles.leading}>
          <View style={styles.iconCircle}>
            <Feather name="box" size={22} color={Colors.primary} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.sku}>{item.sku}</Text>
          </View>

          <Text style={styles.desc} numberOfLines={2}>
            {item.desc}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>{item.qty} pcs</Text>
            <Text style={styles.meta}>• {item.weight}</Text>
            <Text style={styles.meta}>• {item.dims}</Text>
          </View>

          <View style={styles.locationRow}>
            <Feather name="map-pin" size={14} color="#fff" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionBtn}
          onPress={() => {
            // replace with navigation to product detail if needed
            console.log('Open', item.id);
          }}
        >
          <Feather name="chevron-right" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <Text style={styles.headerSub}>Inventory & fulfillment overview</Text>
      </View>

      <FlatList
        data={SAMPLE}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => <ProductCard item={item} index={index} />}
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
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.muted,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  cardWrapper: {
    // leave room for shadow / animation
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  leading: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 16, fontWeight: '700', color: Colors.text },
  sku: { fontSize: 12, color: Colors.muted },
  desc: { fontSize: 13, color: Colors.muted, marginTop: 6 },
  metaRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  meta: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  locationRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  locationText: {
    marginLeft: 6,
    color: '#fff',
    fontSize: 12,
  },
  actionBtn: {
    marginLeft: 8,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
});
