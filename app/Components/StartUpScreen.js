import { ImageBackground, View } from "react-native";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { startScreenStyles as styles } from "../Styles/StartScreenStyles";

export default function StartUpScreen({ text = "Loading" }) {
  return (
    <View style={styles.fullScreen}>
      <ImageBackground
        style={{ ...styles.fullScreen, ...styles.imageBackGround }}
        source={require("../../assets/images/startup.jpg")}
      >
        <View style={styles.overlay}>
          <View style={{ ...styles.fullScreen, ...styles.title }}>
            <ActivityIndicator
              size="large"
              animating={true}
              color={MD2Colors.white}
            />

            <Text
              style={{ color: MD2Colors.white, paddingTop: 10 }}
              variant="headlineSmall"
            >
              {text}
            </Text>
            <Text
              style={{ color: MD2Colors.white, paddingTop: 10 }}
              variant="bodyMedium"
            >
              Powered by Google Gemini AI 🤖
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
