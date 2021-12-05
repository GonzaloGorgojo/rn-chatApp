import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const LoginScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => props.navigation.replace("Chat")}>
        <Text>Chat</Text>
      </TouchableOpacity>
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
export default LoginScreen;
