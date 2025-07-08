import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDeviceEndpoints } from '../services/endpoints';
import { api } from '../services/api';

interface UltrasonicLog {
  pump: number;
  distance_cm: number;
  timestamp: string;
}

const UltrasonicLogsScreen = () => {
  const [logs, setLogs] = useState<UltrasonicLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUltrasonicLogs = async () => {
  try {
    setRefreshing(true);
    const storedDevice = await AsyncStorage.getItem('selectedDevice');
    console.log('ultrasonic Selected Device:', storedDevice);

    if (!storedDevice) {
      setError('Device not selected.');
      setLoading(false);
      return;
    }

    const parsedDevice = JSON.parse(storedDevice); // ✅ Convert string to object
    const deviceId = parsedDevice.id; // or parsedDevice.device_id if you prefer that

    const endpoint = getDeviceEndpoints(deviceId).DEVICE_ULTRASONIC;
    const response = await api.get(endpoint);

    if (response.data.status) {
      setLogs(response.data.data);
      setError(null);
    } else {
      setError('Failed to fetch pump logs.');
    }
  } catch (err) {
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

useEffect(() => {
  fetchUltrasonicLogs();
}, []);


  const onRefresh = async () => {
    await fetchUltrasonicLogs();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ultrasonic Sensor Logs</Text>
      {logs.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No ultrasonic logs available.
        </Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.logItem}>
              <Text style={styles.logText}>Pump: {item.pump}</Text>
              <Text style={styles.logText}>Distance: {item.distance_cm} cm</Text>
              <Text style={styles.logText}>
                Time: {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  logItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UltrasonicLogsScreen;
