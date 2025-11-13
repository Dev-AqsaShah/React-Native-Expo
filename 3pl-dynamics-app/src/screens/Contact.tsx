// src/screens/ContactScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../theme';

// canonical contact details (pulled from 3PL Dynamics site)
const CONTACT = {
  company: '3PL Dynamics',
  address: 'A/13 Block 1 F.B Area Sharifabad, Karachi, Pakistan',
  email: 'info@3pldynamics.org',
  phone: '+92 21 000 0000', // placeholder — replace with real number if you have one
  ticketUrl: 'https://www.3pldynamics.org/contact', // site contact / ticket page
  website: 'https://www.3pldynamics.org',
  hours: 'Mon–Fri • 09:00 — 18:00',
};

function openUrl(url: string) {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) return Linking.openURL(url);
      Alert.alert('Cannot open link', url);
    })
    .catch(() => Alert.alert('Unable to open link'));
}

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 36 }}>
      {/* Hero */}
      <Animated.View entering={FadeIn.duration(420)} style={styles.hero}>
        <Text style={styles.heroTitle}>Get in touch</Text>
        <Text style={styles.heroSubtitle}>
          We’re here to help — sales, support and partnership enquiries. Reach out and we’ll respond shortly.
        </Text>
      </Animated.View>

      {/* Quick contact cards */}
      <View style={styles.cardsWrap}>
        <Animated.View entering={FadeInUp.delay(80).duration(360)} style={styles.card}>
          <View style={styles.cardLeft}><Feather name="mail" size={20} color={Colors.primary} /></View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Email</Text>
            <Text style={styles.cardText}>{CONTACT.email}</Text>
          </View>
          <Pressable
            style={styles.cardAction}
            onPress={() => openUrl(`mailto:${CONTACT.email}`)}
          >
            <Feather name="send" size={18} color={Colors.primary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(140).duration(360)} style={styles.card}>
          <View style={styles.cardLeft}><Feather name="phone" size={20} color={Colors.primary} /></View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Call</Text>
            <Text style={styles.cardText}>{CONTACT.phone}</Text>
            <Text style={styles.cardSub}>{CONTACT.hours}</Text>
          </View>
          <Pressable
            style={styles.cardAction}
            onPress={() => openUrl(`tel:${CONTACT.phone}`)}
          >
            <Feather name="phone-call" size={18} color={Colors.primary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(360)} style={styles.card}>
          <View style={styles.cardLeft}><Feather name="map-pin" size={20} color={Colors.primary} /></View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Address</Text>
            <Text style={styles.cardText}>{CONTACT.address}</Text>
          </View>
          <Pressable
            style={styles.cardAction}
            onPress={() =>
              // open in maps (works for iOS/Android)
              openUrl(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`)
            }
          >
            <Feather name="navigation" size={18} color={Colors.primary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(260).duration(360)} style={styles.card}>
          <View style={styles.cardLeft}><Feather name="life-buoy" size={20} color={Colors.primary} /></View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Support</Text>
            <Text style={styles.cardText}>Open a ticket or request a demo</Text>
          </View>
          <Pressable
            style={styles.cardAction}
            onPress={() => openUrl(CONTACT.ticketUrl)}
          >
            <Feather name="external-link" size={18} color={Colors.primary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(320).duration(360)} style={styles.card}>
          <View style={styles.cardLeft}><Feather name="globe" size={20} color={Colors.primary} /></View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Website</Text>
            <Text style={styles.cardText}>{CONTACT.website}</Text>
          </View>
          <Pressable style={styles.cardAction} onPress={() => openUrl(CONTACT.website)}>
            <Feather name="link" size={18} color={Colors.primary} />
          </Pressable>
        </Animated.View>
      </View>

      {/* Small CTA */}
      <Animated.View entering={FadeInUp.delay(380).duration(360)} style={styles.ctaWrap}>
        <Pressable style={styles.ctaPrimary} onPress={() => openUrl(`mailto:${CONTACT.email}?subject=Sales%20Enquiry`)}>
          <Text style={styles.ctaText}>Contact Sales</Text>
        </Pressable>

        <Pressable style={styles.ctaGhost} onPress={() => openUrl(CONTACT.ticketUrl)}>
          <Text style={styles.ctaGhostText}>Open Support Ticket</Text>
        </Pressable>
      </Animated.View>

      {/* Footer / socials */}
      <Animated.View entering={FadeInUp.delay(440).duration(360)} style={styles.footer}>
        <Text style={styles.footerTitle}>{CONTACT.company}</Text>
        <View style={styles.socialRow}>
          <Pressable onPress={() => openUrl('https://www.facebook.com/3pldynamics')} style={styles.socialBtn}>
            <Feather name="facebook" size={18} color={Colors.primary} />
          </Pressable>
          <Pressable onPress={() => openUrl('https://www.linkedin.com/company/3pl-dynamics')} style={styles.socialBtn}>
            <Feather name="linkedin" size={18} color={Colors.primary} />
          </Pressable>
          <Pressable onPress={() => openUrl(CONTACT.website)} style={styles.socialBtn}>
            <Feather name="globe" size={18} color={Colors.primary} />
          </Pressable>
        </View>
        <Text style={styles.copy}>© {new Date().getFullYear()} {CONTACT.company}</Text>
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  heroTitle: { color: Colors.white, fontSize: 22, fontWeight: '800', marginBottom: 6 },
  heroSubtitle: { color: '#B9C8E0', fontSize: 14, lineHeight: 20 },

  cardsWrap: { paddingHorizontal: 16, paddingTop: 18 },
  card: {
    backgroundColor: '#F7FAFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardLeft: { width: 48, alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1, paddingRight: 8 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: Colors.text },
  cardText: { fontSize: 13, color: Colors.muted, marginTop: 4 },
  cardSub: { fontSize: 12, color: Colors.muted, marginTop: 6 },

  cardAction: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ctaWrap: { paddingHorizontal: 18, marginTop: 6 },
  ctaPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  ctaText: { color: Colors.white, fontWeight: '800', fontSize: 16 },
  ctaGhost: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaGhostText: { color: Colors.primary, fontWeight: '700' },

  footer: { paddingHorizontal: 18, paddingTop: 18, alignItems: 'center' },
  footerTitle: { fontWeight: '800', color: Colors.text, fontSize: 14 },
  socialRow: { flexDirection: 'row', gap: 12, marginTop: 10, marginBottom: 8 },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    marginHorizontal: 6,
  },
  copy: { color: Colors.muted, fontSize: 12, marginTop: 6 },
});
