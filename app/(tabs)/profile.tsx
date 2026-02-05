import { removeData } from "@/services/Storage";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const handleLogout = async () => {
    await removeData("@user_login_tokens");
    router.replace("/login");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://picsum.photos/200/120?random=1" }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
            }}
          />
          <View>
            <Text style={styles.name}>John Doe</Text>
            <Text style={{ color: "gray" }}>john.doe@example.com</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "semibold",
              marginTop: 24,
              color: "darkgray",
            }}
          >
            Account
          </Text>
          <View style={styles.sectionContainer}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color="black"
              />
              <Text>Manage Profile</Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name="arrow-forward"
                size={24}
                color="black"
              />
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Feather name="lock" size={24} color="black" />
              <Text>Password & Security</Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name="arrow-forward"
                size={24}
                color="black"
              />
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Feather name="bell" size={24} color="black" />
              <Text>Notifications</Text>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name="arrow-forward"
                size={24}
                color="black"
              />
            </View>
            <Button
              mode="contained"
              style={{ marginTop: 16 }}
              onPress={handleLogout}
            >
              Logout
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    padding: 16,
    gap: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
  sectionContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    gap: 16,
  },
});
