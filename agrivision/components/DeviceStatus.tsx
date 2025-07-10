import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeviceStatus = () => {
  const [deviceInfo, setDeviceInfo] = useState<{ name: string; status: 'online' | 'offline' } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const storedDevice = await AsyncStorage.getItem('selectedDevice');
        console.log('Stored device:', storedDevice);
        if (storedDevice) {
          const parsed = JSON.parse(storedDevice);
          setDeviceInfo({
            name: parsed.name ?? 'Device',
            status: parsed.status ?? 'offline',
          });
        }
      } catch (err) {
        console.error('Failed to read device from storage:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, []);

  if (loading) return <ActivityIndicator size="small" color="#fff" />;
  if (!deviceInfo) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{deviceInfo.name}</Text>
      <View
        style={[
          styles.dot,
          { backgroundColor: deviceInfo.status === 'online' ? '#006400' : '#FF3D00' },
        ]}
      />
    </View>
  );
};

export default DeviceStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    gap: 6,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
