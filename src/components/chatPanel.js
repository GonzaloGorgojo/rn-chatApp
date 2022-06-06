import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getAuth } from "@firebase/auth";
import { db } from "../../src/config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import lightMode from "../assets/themes/Light";

export const ChatPanel = () => {
  const theme = useSelector((state) => state.theme.theme);
  const auth = getAuth();
  const [chats, setChats] = useState([]);
  console.log(auth);
  // const GetData = async () => {
  //   const citiesCol = collection(db, "cities");
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map((doc) => doc.data());
  //   setTest(cityList);
  // };

  return (
    <View style={styles.chatContainer}>
      <View
        style={
          theme == "dark" ? styles.contentContainer : lightMode.contentContainer
        }
      >
        <Text
          style={theme == "dark" ? styles.olderChats : lightMode.olderChats}
        >
          Hello
        </Text>
        <Text>{auth.currentUser?.email}</Text>
      </View>

      {chats.map((data, i) => {
        return <Text key={i}>{data.city_name}</Text>;
      })}
      <View style={styles.footer}>
        <TextInput style={styles.chatInput}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#361d75",
  },
  footer: {
    // height: 200, This give me altitude on screen
  },
  chatInput: {
    borderWidth: 2,
    borderColor: "red",
  },
  olderChats: {
    color: "yellow",
  },
});
