import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import lightMode from "../assets/themes/Light";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = (props) => {
  const theme = props.theme;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={theme == "dark" ? styles.mainContainer : lightMode.mainContainer}
      keyboardVerticalOffset={Platform.select({ ios: -50, android: -100 })}
    >
      <StatusBar style={theme == "dark" ? "light" : "dark"} />
      <ImageBackground
        style={styles.mainContainer}
        source={
          theme == "dark"
            ? require("../assets/imgs/night.png")
            : require("../assets/imgs/day.png")
        }
      >
        <View style={styles.inputLoginContainer}>
          <TextInput
            placeholderTextColor={theme == "dark" ? "white" : "black"}
            style={theme == "dark" ? styles.inputLogin : lightMode.inputLogin}
            placeholder={t("email")}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType={"email-address"}
          />
          <TextInput
            placeholderTextColor={theme == "dark" ? "white" : "black"}
            style={theme == "dark" ? styles.inputLogin : lightMode.inputLogin}
            placeholder={t("password")}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={theme == "dark" ? styles.button : lightMode.button}
          onPress={() => props.navigation.replace("Chat")}
        >
          <Text
            style={[
              theme == "dark" ? styles.buttonText : lightMode.buttonText,
              { fontSize: 18 },
            ]}
          >
            {t("login")}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  inputLoginContainer: {
    height: 120,
    flexDirection: "column",
    justifyContent: "space-around",
    width: "50%",
    marginTop: 50,
  },
  inputLogin: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
  },
  buttonText: {
    color: "white",
  },
});

const mapStateToProps = (state) => state;
const connectComponent = connect(mapStateToProps);

export default connectComponent(LoginScreen);

export const screenLoginOptions = (navData) => {
  return {
    headerTitle: "Login",
    headerStyle: {
      backgroundColor: "#1b0730",
    },
    headerTitleStyle: {
      color: "white",
      textAlign: "center",
      fontSize: 20,
    },
    headerRightContainerStyle: {
      marginRight: 5,
    },
    headerLeftContainerStyle: {
      marginLeft: 5,
    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navData.navigation.replace("Main")}>
        <Ionicons
          name="ios-arrow-back-circle-outline"
          size={25}
          color="white"
          left={20}
        />
      </TouchableOpacity>
    ),
    headerRight: () => <TouchableOpacity onPress={() => {}}></TouchableOpacity>,
  };
};
