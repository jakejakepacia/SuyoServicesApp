import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`✅ ${key} saved`);
  } catch (error) {
    console.error(`❌ Error saving ${key}:`, error);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(`JSON.parse(jsonValue):`, JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`❌ Error reading ${key}:`, error);
    return null;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`✅ ${key} removed`);
  } catch (error) {
    console.error(`❌ Error removing ${key}:`, error);
  }
};
