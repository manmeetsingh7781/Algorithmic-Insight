import { StyleSheet, Platform, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { MD2Colors, MD2DarkTheme } from "react-native-paper";

const androidSafeArea = {
  paddingTop: Platform.OS === "android" ? 25 : 0,
};

const fullScreen = {
  width: windowWidth,
  height: windowHeight,
};

// this is default space around the view that every inner scene should have
const defaultMargin = {
  margin: 10,
};

const Theme = StyleSheet.create({
  darkMode: {
    // app body properties
    color: "#E0E0E0",
    backgroundColor: "#121212",
    quoteBox: MD2Colors.grey800,
    highLightColor: MD2Colors.deepPurple400,

    // navigation header properties
    headerStyle: { backgroundColor: "#1F1F1F" },
    headerTintColor: MD2Colors.deepPurple400,

    // card dark color
    cardStyle: {
      backgroundColor: "#252525",
    },
  },

  lightMode: {
    // app
    color: "#2d2d2d",
    backgroundColor: "#FFFFFF",
    highLightColor: MD2Colors.red700,

    quoteBox: MD2Colors.grey100,

    // header bar
    headerStyle: {
      backgroundColor: "#FFFFFF",
    },
    headerTintColor: "#333333",

    // card
    cardStyle: {
      backgroundColor: "#FFFFFF",
    },
  },
});

export let questionAI = [];
export function setQuesionAI(list) {
  // reset the list so that we dont push twice
  questionAI = [];
  if (list === undefined) {
    return;
  }
  for (let i of list) {
    // get rid of - if string string starts with that
    // 2 because 1 for - and another for space
    if (i.startsWith("-")) {
      i = i.substring(2);
    }
    // replaces first digit of the string
    // str = 1. abc -> abc
    // str = 2.abc -> abc
    if (/^\d+. /.test(i)) {
      i = i.replace(/^\d+. /, "");
    }

    questionAI.push(i);
  }
}

export {
  windowWidth,
  windowHeight,
  androidSafeArea,
  Theme,
  fullScreen,
  defaultMargin,
};
