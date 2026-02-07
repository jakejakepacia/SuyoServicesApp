import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://10.0.2.2:5000";

export async function getServicesById(id) {
  try {
    const stored = await AsyncStorage.getItem("@user_login_response");
    const token = stored ? JSON.parse(stored).accessToken : null;

    if (!token) {
      return { success: false, message: "No token" };
    }

    const response = await fetch(`${BASE_URL}/api/SuyoServices/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    console.error("Fetch error:", err.message);
    return { success: false, message: err.message };
  }
}

export async function getAllServices() {
  try {
    const stored = await AsyncStorage.getItem("@user_login_response");
    const token = stored ? JSON.parse(stored).accessToken : null;

    if (!token) {
      return { success: false, message: "No token" };
    }

    const response = await fetch(`${BASE_URL}/api/SuyoServices/allservices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    console.error("Fetch error:", err.message);
    return { success: false, message: err.message };
  }
}
