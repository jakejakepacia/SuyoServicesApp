import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sampleServices } from "../../data/sampleServices";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <ScrollView>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Suyo Services Directory
          </Text>
          <Text style={{ color: "white", textAlign: "center" }}>
            Find trusted suyo services in your area
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Search services..."
            style={{ margin: 16, backgroundColor: "white" }}
          />
        </View>
        <View style={styles.container}>
          {sampleServices.map((service) => (
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
                  buttonColor="#1f0b0b"
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
    width: "100%",
    height: 150,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    marginBottom: 8,
  },
});
