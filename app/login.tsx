import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import login from "../services/login";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 🔐 Simulate auto-login
  useEffect(() => {
    const autoLogin = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const hasToken = false; // 👈 toggle to true to auto-login
      setIsAuthenticated(hasToken);
      setCheckingAuth(false);
    };

    autoLogin();
  }, []);

  // 🚦 Redirect after auth
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  if (checkingAuth) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator animating size="large" />
        <Text style={styles.loadingText}>Checking authentication…</Text>
      </SafeAreaView>
    );
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        console.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome Back
        </Text>

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  loadingText: {
    marginTop: 12,
  },
});
