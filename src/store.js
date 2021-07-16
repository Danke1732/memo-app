import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (text, createdAt) => {
  const key = `${createdAt}`; // ②
  // ③
  const value = JSON.stringify({
    text,
    createdAt,
  });

  await AsyncStorage.setItem(key, value); // ①
}

export const loadAll = async () => {
  const keys = await AsyncStorage.getAllKeys();
  keys.sort();
  const entryList = await AsyncStorage.multiGet(keys);
  return entryList.map(entry => JSON.parse(entry[1]));
}