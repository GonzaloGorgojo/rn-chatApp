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
  inputLogin: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  password: {
    marginTop: 15,
    color: "black",
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
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
    borderColor: "white",
    borderStyle: "solid",
    borderRadius: 5,
    width: 200,
  },
  titleModal: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
});

export default lightMode;
