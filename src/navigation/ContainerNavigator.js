import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import { Provider } from "react-redux";
import { store } from "../store/store";

const AppNavigator = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;
