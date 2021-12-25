import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BackHandler } from "react-native";
import { getAuth } from "@firebase/auth";
import { db } from "../../src/config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";

const ChatScreen = (props) => {
  const auth = getAuth();
  const [test, setTest] = useState([]);

  const GetData = async () => {
    const citiesCol = collection(db, "cities");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    setTest(cityList);
  };

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", function () {
    //   return true;
    // });
    GetData();
  }, [test]);
  return (
    <View style={styles.container}>
      <Text>{auth.currentUser?.email}</Text>
      {test.map((data, i) => {
        return <Text key={i}>{data.city_name}</Text>;
      })}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ChatScreen;
