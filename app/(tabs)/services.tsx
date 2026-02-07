import Feather from "@expo/vector-icons/Feather";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAllServices } from "../../services/suyoservices";

import Colors from "../constants/color";
const TopTab = createMaterialTopTabNavigator();

// Example screens for sub-tabs
function AvailableServicesScreen() {
  interface Service {
    id: number;
    serviceName: string;
    price: number;
    serviceCategoryId: number;
    description: string;
    image?: string; // optional if API doesn't provide an image
  }

  const [allServices, setAllServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAllServices();
      if (response.success) {
        setAllServices(response.data);
      }
    };
    fetchServices();
  }, []);

  console.log("getAllServices:", getAllServices);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            gap: 10,
          }}
        >
          <TextInput
            mode="outlined"
            placeholder="Search services..."
            outlineColor="#E5E7EB"
            activeOutlineColor={Colors.primary}
            style={{
              backgroundColor: "white",
              height: 40,
              flex: 1, // <-- makes TextInput expand
            }}
            placeholderTextColor={Colors.muted}
          />
          <Feather name="search" size={24} color="black" />
        </View>

        {allServices.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Image
              source={{
                uri:
                  service.image ??
                  "https://picsum.photos/200/120?random=" + service.id,
              }}
              style={styles.serviceImage}
            />
            <View style={styles.cardContainer}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {service.serviceName}
              </Text>
              <Text style={{ color: "gray", marginBottom: 8 }}>Sample</Text>
              <Text>{service.description}</Text>
              <Button
                mode="contained"
                style={{ marginTop: 8 }}
                buttonColor={Colors.primary}
              >
                Book Service
              </Button>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function MyRequestsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Requests</Text>
    </View>
  );
}

// ServicesScreen contains the nested top tabs
export default function ServicesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: Colors.primary,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary, // <-- set your underline color here
          height: 3, // optional, thickness of the underline
        },
      }}
      style={{ paddingTop: insets.top }}
    >
      <TopTab.Screen name="Available" component={AvailableServicesScreen} />
      <TopTab.Screen name="Requests" component={MyRequestsScreen} />
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  serviceCard: {
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
    backgroundColor: "white",
  },
  cardContainer: {
    padding: 16,
  },
  serviceImage: {
    width: "100%",
    height: 150,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    marginBottom: 8,
  },
});
