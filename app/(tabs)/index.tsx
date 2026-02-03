import { sampleServices } from "@/data/sampleServices";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { serviceCategories } from "../../data/serviceCategories";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <StatusBar style="light" />
      <ScrollView>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TextInput
            mode="outlined"
            placeholder="Search services..."
            style={{ margin: 16, backgroundColor: "white" }}
          />
        </View>
        <View style={styles.container}>
          {serviceCategories.map((category) => (
            <View key={category.id}>
              <View style={styles.cardContainer}>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  {category.name}
                </Text>
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: "row",
                    gap: 12,
                  }}
                >
                  {sampleServices
                    .filter((service) => service.categoryId === category.id)
                    .map((service) => (
                      <View key={service.id}>
                        <View
                          style={{ alignItems: "center", width: 80, gap: 4 }}
                        >
                          <Image
                            source={{ uri: service.image }}
                            style={styles.serviceImage}
                          />
                          <Text style={{ fontSize: 12, textAlign: "center" }}>
                            {service.name}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
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
    backgroundColor: "#1f0b0b",
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
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
