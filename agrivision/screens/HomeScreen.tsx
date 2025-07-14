import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { getDeviceEndpoints } from "../services/endpoints";

type WeatherData = {
  city?: string;
  date?: string;
  weather?: string;
  minTemp?: number;
  maxTemp?: number;
  temprature?: number;
  username?: string;
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { deviceId } = route.params || {};
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async () => {
    try {
      const response = await api.get(getDeviceEndpoints(deviceId).DEVICE_DASHBOARD);
      console.log(deviceId, "Device ID from HomeScreen");
      setWeatherData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome 👋</Text>
      </View>

      <Text style={styles.sectionTitle}>Weather</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weatherData ? (
        <View style={styles.weatherCard}>
          <View style={styles.weatherLeft}>
            <Text style={styles.city}>{weatherData.city || "City"}</Text>
            <Text style={styles.date}>{weatherData.date || "Date"}</Text>
            <Text style={styles.status}>{weatherData.weather || "Weather"}</Text>
            <Text style={styles.minMax}>{weatherData.minTemp}°C / {weatherData.maxTemp}°C</Text>
          </View>
          <View style={styles.weatherRight}>
            <Text style={styles.temp}>{weatherData.temprature}°C</Text>
            <Ionicons name="cloud-outline" size={32} color="#ffffff" />
          </View>
        </View>
      ) : (
        <Text>Error loading weather</Text>
      )}

      <Text style={styles.sectionTitle}>AI Support</Text>

      <View style={styles.aiSupport}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("UploadPage")}>
          <Ionicons name="leaf-outline" size={32} color="#4CAF50" />
          <Text style={styles.cardTitle}>Disease Scanner</Text>
          <Text style={styles.cardSubtitle}>Identify plant problems</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ScanScreen")}>
          <Ionicons name="planet-outline" size={32} color="#3F51B5" />
          <Text style={styles.cardTitle}>Satellite Scanner</Text>
          <Text style={styles.cardSubtitle}>Scan Using Satellite</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AgriScreenData")}>
          <Ionicons name="cloud-outline" size={32} color="#2196F3" />
          <Text style={styles.cardTitle}>Weather Details</Text>
          <Text style={styles.cardSubtitle}>Complete Weather Forecast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DeviceScreen")}>
          <Ionicons name="hardware-chip-outline" size={32} color="#FF9800" />
          <Text style={styles.cardTitle}>Devices</Text>
          <Text style={styles.cardSubtitle}>Edit Device Details</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Logs</Text>
      <View style={styles.aiSupport}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("UltrasonicLogs")}>
          <Ionicons name="pulse-outline" size={32} color="#5D4037" />
          <Text style={styles.cardTitle}>Ultrasonic Logs</Text>
          <Text style={styles.cardSubtitle}>Monitor distance measurements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("PumpLogs")}>
          <Ionicons name="water-outline" size={32} color="#0277BD" />
          <Text style={styles.cardTitle}>Pump Logs</Text>
          <Text style={styles.cardSubtitle}>Track water flow activity</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FDFBFF",
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  weatherCard: {
    backgroundColor: "#3DAEFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  weatherLeft: {
    flex: 1,
  },
  weatherRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  city: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  status: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  minMax: {
    color: "#fff",
    fontSize: 14,
  },
  temp: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  aiSupport: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  card: {
    width: "48%",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
});
