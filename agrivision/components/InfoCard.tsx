// components/InfoCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';

type InfoCardProps = {
  icon: keyof typeof Icons; // name of the Lucide icon to render
  label: string;
  value: string;
  color?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, color = '#333' }) => {
  const LucideIcon = Icons[icon];

  const isValidIcon =
    LucideIcon && (typeof LucideIcon === 'function' || typeof LucideIcon === 'object');

  return (
    <View style={[styles.card, { borderColor: color }]}>
      {isValidIcon ? (
        // @ts-ignore
        <LucideIcon color={color} size={26} />
      ) : null}
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
