import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import format from 'date-fns/format';
import { useNavigation } from '@react-navigation/native';
import { loadAll } from './store';

// const memos = [
//   {
//     text: "メモメモメモ",
//     createdAt: 1585574700000,
//   },
//   {
//     text: "メモメモメモ",
//     createdAt: 1585567500000,
//   },
//   {
//     text: "長いメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ",
//     createdAt: 1585574700000,
//   },
//   {
//     text: "メモメモメモ",
//     createdAt: 1585369500000,
//   },
//   {
//     text: "メモメモメモ",
//     createdAt: 1585275900000,
//   },
// ];

export const MainScreen = () => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      // ここに表示更新処理を書く
      const newMemos = await loadAll();
      setMemos(newMemos);
    };

    const unsubscribe = navigation.addListener('focus', initialize); // ①
    return unsubscribe;
  }, [navigation]);

  const onPressAdd = () => {
    navigation.navigate('Compose');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos} // ①
        keyExtractor={item => `${item.createdAt}`} // ②
        renderItem={({item}) => ( // ③
          <List.Item // ④
            title={item.text}
            titleNumberOfLines={5}
            description={
              `作成日時: ${format(item.createdAt, 'yyyy.MM.dd HH:mm')}`
            }
            descriptionStyle={{
              textAlign: 'right',
            }}
          />
        )}
      />
      <FAB 
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});