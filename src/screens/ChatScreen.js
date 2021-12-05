import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BackHandler } from "react-native";

const ChatScreen = (props) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      return true;
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Chat Screen- not implemented Yet</Text>
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
