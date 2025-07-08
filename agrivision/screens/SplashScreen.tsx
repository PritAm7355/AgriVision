import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { STATIC_ENDPOINTS } from "../services/endpoints";

type Device = {
  name: string;
  id: string;
  location?: string;
  status?: "online" | "offline";
};

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStoredDevice = async () => {
      const storedDevice = await AsyncStorage.getItem("selectedDevice");
      console.log("splash Stored Device:", storedDevice);
      if (storedDevice) {
        setTimeout(() => {
          const parsed = JSON.parse(storedDevice);
          navigation.replace("Home", { deviceId: parsed.id });
        }, 2000);
      } else {
        setTimeout(() => {
          setModalVisible(true);
          fetchDeviceList();
        }, 2000);
      }
    };

    checkStoredDevice();
  }, []);

  const fetchDeviceList = async () => {
    try {
      const response = await api.get(STATIC_ENDPOINTS.DEVICE_DATA, {
        headers: {
          Authorization: "Bearer valid-token",
        },
      });
      setDeviceList(response.data?.data || []);
    } catch (error) {
      console.error("Failed to load devices", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceSelect = async (device: Device) => {
    await AsyncStorage.setItem("selectedDevice", JSON.stringify(device));
    setModalVisible(false);
    navigation.replace("Home", { deviceId: device.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/ai.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Agri Vision</Text>
        <Text style={styles.subtitle}>Smart Agriculture Solution</Text>
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Your Device</Text>
              <Text style={styles.modalSubtitle}>Choose from available devices</Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading devices...</Text>
              </View>
            ) : (
              <FlatList
                data={deviceList}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No devices available</Text>
                  </View>
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleDeviceSelect(item)}
                    style={[
                      styles.deviceItem,
                      item.status === "online"
                        ? styles.deviceOnline
                        : styles.deviceOffline,
                    ]}
                  >
                    <View style={styles.deviceInfo}>
                      <Text style={styles.deviceName}>{item.name}</Text>
                      <Text style={styles.deviceLocation}>
                        {item.location || "Location not specified"}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.statusText,
                          item.status === "online"
                            ? styles.statusOnline
                            : styles.statusOffline,
                        ]}
                      >
                        {item.status || "unknown"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    fontWeight: "500",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 16,
    maxHeight: "80%",
    overflow: "hidden",
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
  },
  loadingContainer: {
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    color: "#616161",
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  emptyContainer: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#757575",
    fontSize: 16,
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "space-between",
  },
  deviceOnline: {
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
  },
  deviceOffline: {
    borderLeftWidth: 5,
    borderLeftColor: "#F44336",
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 3,
  },
  deviceLocation: {
    fontSize: 14,
    color: "#757575",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  statusOnline: {
    color: "#4CAF50",
  },
  statusOffline: {
    color: "#F44336",
  },
});

