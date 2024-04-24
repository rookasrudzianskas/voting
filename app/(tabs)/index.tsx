// @ts-nocheck
import {Link, Stack, useRouter} from 'expo-router';
import {Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";

const POLLS = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function TabOneScreen() {
  const router = useRouter();
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    (async () => {
      console.log('Fetching...');

      let { data, error } = await supabase.from('polls').select('*');
      if (error) {
        Alert.alert('Error fetching data');
      }
     setPolls(data as any);
    })();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Polls',
          headerRight: () => (
            <TouchableOpacity className={'mr-3'} activeOpacity={0.7} onPress={() => router.push('/polls/new')}>
              <AntDesign name="plus" size={20} color="gray" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity className={'ml-3'} activeOpacity={0.7} onPress={() => router.push('/profile')}>
              <AntDesign name="user" size={20} color="gray" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          // @ts-ignore
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(`/polls/${item.id}`)} style={styles.pollContainer}>
            <Text style={styles.pollTitle}>{item.question}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  pollContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  pollTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
