import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

const RegisterScreen = (props) => {
  const { t } = useTranslation();
  console.log(props.route.params.theme);
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
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
export default RegisterScreen;
