import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import lightMode from "../assets/themes/Light";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const RegisterScreen = (props) => {
  const theme = props.theme;
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((userCredentials) => {
        const user = userCredentials.user.email;
        alert(t("newUserAlert") + user);
        signOut(auth);
        props.navigation.goBack();
      })
      .catch((error) => alert(error.message));
  };

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
        <TouchableOpacity
          style={styles.backLoginButton}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-back-circle-outline"
            size={25}
            color={theme == "dark" ? "white" : "black"}
            left={20}
          />
        </TouchableOpacity>

        <Image
          style={styles.avatarContainer}
          source={
            theme == "dark"
              ? require("../assets/imgs/nightavatar.png")
              : require("../assets/imgs/dayavatar.png")
          }
        ></Image>

        <View style={styles.inputLoginContainer}>
          <TextInput
            placeholderTextColor={theme == "dark" ? "white" : "black"}
            style={theme == "dark" ? styles.inputLogin : lightMode.inputLogin}
            placeholder={t("email")}
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
            keyboardType={"email-address"}
          />
          <TextInput
            placeholderTextColor={theme == "dark" ? "white" : "black"}
            style={theme == "dark" ? styles.inputLogin : lightMode.inputLogin}
            placeholder={t("password")}
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={theme == "dark" ? styles.button : lightMode.button}
          onPress={handleSignUp}
        >
          <Text
            style={[
              theme == "dark" ? styles.buttonText : lightMode.buttonText,
              { fontSize: 18 },
            ]}
          >
            {t("register")}
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
    width: "60%",
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
    marginTop: 15,
  },
  buttonText: {
    color: "white",
  },
  password: {
    marginTop: 15,
    color: "white",
  },
  backLoginButton: {
    position: "absolute",
    top: 60,
    left: 16,
  },
  avatarContainer: {
    height: 130,
    width: 130,
  },
});

const mapStateToProps = (state) => state;
const connectComponent = connect(mapStateToProps);

export default connectComponent(RegisterScreen);
