import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type DeviceCardProps = {
  name: string;
  location: string;
  status: 'online' | 'offline';
  imageUrl: string;
  onPress: () => void;
};

const DeviceCard: React.FC<DeviceCardProps> = ({
  name,
  location,
  status,
  imageUrl,
  onPress,
}) => {
  const isOnline = status === 'online';

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require('../assets/images/icons/leafscan.jpeg') // fallback if empty
        }
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>Location: {location}</Text>
        <Text style={[styles.status, { color: isOnline ? 'green' : 'red' }]}>
          Status: {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: '#f0f0f0',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default DeviceCard;
