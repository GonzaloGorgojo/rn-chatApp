import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BackHandler, TouchableOpacity } from "react-native";
import { getAuth } from "@firebase/auth";
import { db } from "../../src/config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ChatScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);
  const auth = getAuth();
  const [test, setTest] = useState([]);
  // const GetData = async () => {
  //   const citiesCol = collection(db, "cities");
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map((doc) => doc.data());
  //   setTest(cityList);
  // };

  const headerOptions = {
    headerStyle: {
      backgroundColor: theme === "dark" ? "black" : "white",
    },
    headerTitleStyle: {
      color: theme === "dark" ? "white" : "black",
      textAlign: "center",
      fontSize: 20,
    },
    headerTitle: t("chatroomTitle"),
    headerLeftContainerStyle: {
      marginLeft: 5,
    },
    headerRight: () => <TouchableOpacity onPress={() => {}}></TouchableOpacity>,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.replace("Main");
        }}
      >
        <Ionicons
          name="arrow-undo"
          size={25}
          color={theme === "dark" ? "white" : "black"}
        />
      </TouchableOpacity>
    ),
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      return true;
    });
    navigation.setOptions(headerOptions);
    // GetData();
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
