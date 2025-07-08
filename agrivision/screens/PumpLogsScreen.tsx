import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { api } from '../services/api';
import { getDeviceEndpoints } from '../services/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PumpLog {
  pump: number;
  pin: number;
  status: 'running' | 'stopped';
  duration: number;
  timestamp: string;
}

const PumpLogsScreen = () => {
  const [logs, setLogs] = useState<PumpLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPumpLogs = async () => {
  try {
    setRefreshing(true);
    const storedDevice = await AsyncStorage.getItem('selectedDevice');
    console.log('pump Selected Device:', storedDevice);

    if (!storedDevice) {
      setError('Device not selected.');
      setLoading(false);
      return;
    }

    const parsedDevice = JSON.parse(storedDevice); // ✅ Convert string to object
    const deviceId = parsedDevice.id; // or parsedDevice.device_id if you prefer that

    const endpoint = getDeviceEndpoints(deviceId).DEVICE_PUMP;
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
    fetchPumpLogs();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3F51B5" />
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
      <Text style={styles.header}>Pump Activity Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.logItem,
              item.status === 'running' ? styles.running : styles.stopped,
            ]}
          >
            <View style={styles.logHeader}>
              <Text style={styles.pumpText}>Pump #{item.pump}</Text>
              <Text
                style={[
                  styles.statusText,
                  item.status === 'running'
                    ? styles.statusRunning
                    : styles.statusStopped,
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.detailText}>Pin: {item.pin}</Text>
            <Text style={styles.detailText}>Duration: {item.duration} sec</Text>
            <Text style={styles.timestampText}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchPumpLogs} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  logItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  running: {
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
  },
  stopped: {
    borderLeftWidth: 6,
    borderLeftColor: '#F44336',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pumpText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusRunning: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusStopped: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
  detailText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  timestampText: {
    fontSize: 13,
    color: '#95a5a6',
    marginTop: 6,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PumpLogsScreen;
