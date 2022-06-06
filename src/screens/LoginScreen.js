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
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import lightMode from "../assets/themes/Light";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const LoginScreen = (props) => {
  const theme = useSelector((state) => state.theme.theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        props.navigation.replace("Chat");
      })
      .catch((error) => alert(error.message));
  };

  const recoverUser = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, recoveryEmail)
      .then(() => {
        alert(t("emailRecover"));
        setModalVisible(!modalVisible);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={2}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={theme == "dark" ? lightMode.modalView : styles.modalView}
            >
              <Text
                style={
                  theme == "dark" ? styles.titleModal : lightMode.titleModal
                }
              >
                {t("titlePassRecover")}
              </Text>
              <TextInput
                placeholderTextColor={theme == "dark" ? "white" : "black"}
                style={
                  theme == "dark" ? lightMode.inputModal : styles.inputModal
                }
                placeholder={t("email")}
                value={recoveryEmail}
                onChangeText={(text) => setRecoveryEmail(text)}
                keyboardType={"email-address"}
              />
              <Pressable style={styles.buttonClose} onPress={recoverUser}>
                <Text style={{ color: "white" }}>{t("recoverPass")}</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
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
          onPress={handleLogin}
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={theme == "dark" ? styles.password : lightMode.password}>
            {t("accessPass")}
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
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputModal: {
    padding: 10,
    borderWidth: 0.7,
    borderColor: "#5f615f",
    borderStyle: "solid",
    borderRadius: 5,
    width: 200,
  },
  buttonClose: {
    alignItems: "center",
    backgroundColor: "purple",
    padding: 10,
    marginTop: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
  },
  titleModal: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
});

export default LoginScreen;
