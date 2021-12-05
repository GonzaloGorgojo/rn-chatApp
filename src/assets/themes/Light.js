import React from "react";
import { StyleSheet } from "react-native";

const lightMode = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  buttonText: {
    color: "black",
  },
});

export default lightMode;
