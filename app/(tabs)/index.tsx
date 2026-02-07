import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { serviceCategories } from "../../data/serviceCategories";
import { getServicesById } from "../../services/suyoservices";
import Colors from "../constants/color";
interface Service {
  id: number;
  serviceName: string;
  price: number;
  serviceCategoryId: number;
  description: string;
  image?: string; // optional if API doesn't provide an image
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const [servicesByCategory, setServicesByCategory] = useState<
    Record<number, Service[]>
  >({});
  const router = useRouter();

  const fetchServices = async (categoryId: number) => {
    const result = await getServicesById(categoryId);

    if (result.success) {
      setServicesByCategory((prev) => {
        const existingServices = prev[categoryId] || [];

        // Track existing IDs to avoid duplicates
        const existingIds = new Set(existingServices.map((s) => s.id));

        const newServices = result.data.filter((s) => !existingIds.has(s.id));

        return {
          ...prev,
          [categoryId]: [...existingServices, ...newServices],
        };
      });
    } else {
      console.error("Failed to fetch services:", result.message);
      await AsyncStorage.removeItem("@user_login_response");
      router.replace("/login");
    }
  };

  // Fetch all categories on mount
  useEffect(() => {
    serviceCategories.forEach((category) => {
      fetchServices(category.id);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TextInput
            mode="outlined"
            placeholder="Search services..."
            outlineColor="#E5E7EB"
            activeOutlineColor={Colors.primary}
            style={{ margin: 16, backgroundColor: "white", height: 40 }}
            placeholderTextColor={Colors.muted}
          />
        </View>

        <View style={styles.container}>
          {serviceCategories.map((category) => (
            <View key={category.id}>
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: Colors.text }}
              >
                {category.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 12,
                }}
              >
                {servicesByCategory[category.id]
                  ?.sort(() => 0.5 - Math.random()) // shuffle the array randomly
                  .slice(0, 4) // take the first 4 items
                  .map((service) => (
                    <View
                      key={service.id}
                      style={{ alignItems: "center", width: 80, gap: 4 }}
                    >
                      <Image
                        source={{
                          uri:
                            service.image ??
                            "https://picsum.photos/200/120?random=" +
                              service.id,
                        }}
                        style={styles.serviceImage}
                      />
                      <Text style={{ fontSize: 12, textAlign: "center" }}>
                        {service.serviceName}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  header: {
    backgroundColor: Colors.primary,
  },
  cardContainer: {
    padding: 16,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
