import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sampleServices } from "../../data/sampleServices";
import Colors from "../constants/color";

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState("explore");

  return (
    <View>
      <ScrollView>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Button
            mode="outlined"
            style={{ margin: 16, height: 40 }}
            buttonColor={
              activeTab === "explore" ? Colors.primary : Colors.background
            }
            textColor={activeTab === "explore" ? "white" : Colors.text}
            onPress={() => setActiveTab("explore")}
          >
            Services Near You
          </Button>
          <Button
            mode="outlined"
            style={{ margin: 16, height: 40 }}
            buttonColor={
              activeTab === "myBookings" ? Colors.primary : Colors.background
            }
            textColor={activeTab === "myBookings" ? "white" : Colors.text}
            onPress={() => setActiveTab("myBookings")}
          >
            Your Orders
          </Button>
        </View>
        <View style={styles.container}>
          {activeTab === "explore" &&
            sampleServices.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <Image
                  source={{ uri: service.image }}
                  style={styles.serviceImage}
                />
                <View style={styles.cardContainer}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {service.name}
                  </Text>
                  <Text style={{ color: "gray", marginBottom: 8 }}>
                    {service.category}
                  </Text>
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
    </View>
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
