import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
  LogBox,
} from "react-native";
import { useTranslation } from "react-i18next";
import SwitchSelector from "react-native-switch-selector";
import lightMode from "../assets/themes/Light";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as Types from "../store/types";
import { firebaseApp } from "../config/firebase";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import data from "../config/googleProvider.json";

const InitialScreen = (props) => {
  firebaseApp;

  LogBox.ignoreLogs([
    `AsyncStorage has been extracted from react-native core and will be removed in a future release.`,
  ]);

  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(props.theme);
  const language = [
    { label: "En", value: "en" },
    { label: "Es", value: "es" },
  ];
  const themeOptions = [
    {
      value: "dark",
      customIcon: (
        <Ionicons
          name="moon-outline"
          size={24}
          color={theme == "dark" ? "white" : "black"}
        />
      ),
    },
    {
      value: "light",
      customIcon: (
        <Ionicons
          name="sunny-outline"
          size={30}
          color={theme == "dark" ? "white" : "black"}
        />
      ),
    },
  ];
  const indexOfLang = language.findIndex((opt) => opt.value == i18n.language);
  const indexOfTheme = themeOptions.findIndex(
    (opt) => opt.value == props.theme
  );

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: data.androidClientId,
        iosClientId: data.iosClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        const auth = getAuth();
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            props.navigation.navigate("Chat");
          })
          .catch((e) => console.log(e));
      } else {
        console.log("Permission denied");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    props.updateTheme(theme);
  }, [theme]);
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
        <View style={styles.switchTheme}>
          <SwitchSelector
            options={themeOptions}
            initial={indexOfTheme}
            onPress={(value) => setTheme(value)}
            selectedColor={"white"}
            buttonColor={"purple"}
            backgroundColor={theme == "dark" ? "black" : "white"}
            hasPadding={true}
            height={40}
          />
        </View>
        <View style={styles.switchLanguage}>
          <SwitchSelector
            options={language}
            initial={indexOfLang}
            onPress={(value) => i18n.changeLanguage(value)}
            backgroundColor={theme == "dark" ? "black" : "white"}
            textColor={theme == "dark" ? "white" : "black"}
            selectedColor={"white"}
            buttonColor={"purple"}
            hasPadding={true}
            fontSize={22}
          />
        </View>

        <Image
          style={styles.logoImage}
          source={require("../assets/imgs/logo.png")}
        ></Image>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={theme == "dark" ? styles.button : lightMode.button}
            onPress={() => props.navigation.navigate("RegisterScreen")}
          >
            <Text
              style={theme == "dark" ? styles.buttonText : lightMode.buttonText}
            >
              {t("newUser")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={theme == "dark" ? styles.button : lightMode.button}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text
              style={theme == "dark" ? styles.buttonText : lightMode.buttonText}
            >
              {t("already")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              { width: "50%", marginLeft: "25%" },
              theme == "dark" ? styles.button : lightMode.button,
            ]}
            onPress={signInWithGoogleAsync}
          >
            <Text
              style={theme == "dark" ? styles.buttonText : lightMode.buttonText}
            >
              {t("googleLogIn")}{" "}
            </Text>
            <Ionicons
              name="logo-google"
              size={25}
              color={theme == "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
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
  switchTheme: {
    width: 80,
    position: "absolute",
    top: 60,
    left: 16,
  },
  switchLanguage: { width: 80, position: "absolute", top: 60, right: 16 },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 15,
    width: "80%",
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
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
  logoImage: {
    height: 130,
    width: 130,
  },
});

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  updateTheme: (theme) =>
    dispatch({ type: Types.UPDATE_THEME, payload: { theme } }),
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(InitialScreen);
