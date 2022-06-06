import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { BackHandler, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "@firebase/auth";

import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ChatPanel } from "../components/chatPanel";

const ChatScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace("Main");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
      <TouchableOpacity onPress={handleSignOut}>
        <Ionicons
          name="arrow-back-circle-sharp"
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
  }, []);

  return (
    <View style={styles.container}>
      <ChatPanel />
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
