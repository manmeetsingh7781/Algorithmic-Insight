import { StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "../globalVars";

const startScreenStyles = StyleSheet.create({
  fullScreen: {
    width: windowWidth,
    height: windowHeight,
  },
  imageBackGround: {
    justifyContent: "center",
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    top: 230,
  },
});

export { startScreenStyles };
