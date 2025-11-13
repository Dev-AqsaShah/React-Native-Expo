// src/screens/AboutScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FEATURES = [
  { id: 'f1', icon: 'box', title: 'Warehousing', desc: 'Secure storage, flexible capacity & smart slotting.' },
  { id: 'f2', icon: 'cpu', title: 'WMS & Software', desc: 'Integrated warehouse management and reporting.' },
  { id: 'f3', icon: 'truck', title: 'Transport & Delivery', desc: 'Reliable last-mile & full-truck solutions.' },
  { id: 'f4', icon: 'refresh-cw', title: 'Returns & Reverse', desc: 'Easy returns processing & inspection flows.' },
  { id: 'f5', icon: 'thermometer', title: 'Cold Chain', desc: 'Temperature-controlled storage & handling.' },
  { id: 'f6', icon: 'package', title: 'Kitting & Packaging', desc: 'Kitting, bundling & custom packaging services.' },
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.hero}>
        <Text style={styles.heroTitle}>About 3PL Dynamics</Text>
        <Text style={styles.heroSubtitle}>
          Tech-driven logistics & fulfilment — smarter warehousing, real-time visibility, and scalable operations.
        </Text>
        <View style={styles.heroRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>120+</Text>
            <Text style={styles.statLabel}>Clients</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>250k</Text>
            <Text style={styles.statLabel}>Shipments / mo</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>35</Text>
            <Text style={styles.statLabel}>Warehouses</Text>
          </View>
        </View>
      </Animated.View>

      {/* Mission */}
      <Animated.View entering={FadeInUp.delay(120).duration(400)} style={styles.card}>
        <Text style={styles.cardTitle}>Our Mission</Text>
        <Text style={styles.cardText}>
          We revolutionize logistics by combining proven warehouse operations with modern software — so businesses can scale without complexity.
        </Text>
      </Animated.View>

      {/* Features grid */}
      <View style={styles.featureGrid}>
        {FEATURES.map((f, i) => (
          <Animated.View key={f.id} entering={FadeInUp.duration(360).delay(80 + i * 60)} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Feather name={f.icon as any} size={18} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Why choose us */}
      <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.card}>
        <Text style={styles.cardTitle}>Why choose 3PL Dynamics?</Text>
        <Text style={styles.cardText}>
          Real-time tracking, route optimisation, and transparent reporting make operations predictable and measurable. Our WMS modules and integration-ready approach let you plug in quickly and gain control. (Inspired by 3PL Dynamics product & company pages.)
        </Text>
      </Animated.View>

      {/* CTA */}
      <Animated.View entering={FadeInUp.delay(420).duration(400)} style={styles.ctaWrap}>
        <TouchableOpacity style={styles.ctaPrimary} onPress={() => console.log('Contact sales')}>
          <Text style={styles.ctaText}>Talk to Sales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctaGhost} onPress={() => console.log('Learn more')}>
          <Text style={styles.ctaGhostText}>Learn more</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  hero: {
    backgroundColor: '#1B2A49',
    paddingVertical: 28,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: { color: Colors.white, fontSize: 22, fontWeight: '800', marginBottom: 6 },
  heroSubtitle: { color: '#B9C8E0', fontSize: 14, marginBottom: 16, lineHeight: 20 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center', width: (SCREEN_WIDTH - 36) / 3 },
  statNumber: { color: Colors.white, fontSize: 18, fontWeight: '800' },
  statLabel: { color: '#B9C8E0', fontSize: 12 },

  card: {
    marginHorizontal: 18,
    marginTop: 16,
    backgroundColor: '#F7FAFF',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: Colors.primary, marginBottom: 8 },
  cardText: { color: Colors.muted, lineHeight: 20, fontSize: 14 },

  featureGrid: {
    marginHorizontal: 18,
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  featureTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4, color: Colors.text },
  featureDesc: { color: Colors.muted, fontSize: 13 },

  ctaWrap: { marginHorizontal: 18, marginTop: 18, alignItems: 'center' },
  ctaPrimary: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  ctaText: { color: Colors.white, fontSize: 16, fontWeight: '800' },
  ctaGhost: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaGhostText: { color: Colors.primary, fontSize: 15, fontWeight: '700' },
});
