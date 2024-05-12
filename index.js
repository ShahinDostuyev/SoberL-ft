import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SafeAreaView } from "react-native";

function index() {
  return (
    <>
      <Provider store={store}>
          <App />
      </Provider>
    </>
  );
}

export default index;
