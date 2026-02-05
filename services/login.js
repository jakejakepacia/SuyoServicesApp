const BASE_URL = "http://10.0.2.2:5000";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function Login(username, password) {
  try {
    await AsyncStorage.removeItem("@user_login_response");

    const request = {
      usernameOrEmail: username,
      password: password,
    };

    const response = await fetch(`${BASE_URL}/api/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login failed:", errorText);

      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const data = await response.json();
    console.log("✅ Login response:", data);

    await AsyncStorage.setItem("@user_login_response", JSON.stringify(data));

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("Login error:", err);

    return {
      success: false,
      message: err.message || "Something went wrong",
    };
  }
}
