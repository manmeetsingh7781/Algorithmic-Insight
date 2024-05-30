import { TouchableHighlight, View } from "react-native";
import { Text } from "react-native-paper";
import { fullScreen } from "../globalVars";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Settings({
  theme,
  navigation,
  handleThemeCallback,
  iconeName,
}) {
  return (
    <View
      style={{
        ...fullScreen,
        backgroundColor: theme["backgroundColor"],
      }}
    >
      <View
        style={{
          backgroundColor: theme["quoteBox"],
          padding: 10,
          margin: 10,
          borderRadius: 10,
          shadowOpacity: 0.2,
          shadowOffset: 0.5,
          shadowRadius: 10,
          display: "flex",
          gap: 20,
          flexDirection: "row",
          alignItems: "center",

          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            display: "flex",
            padding: 10,
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{ color: theme["color"], fontWeight: "500" }}
          >
            Theme
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme["color"], fontWeight: "500" }}
          >
            Toggle between Light and Dark mode
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Ionicons
            onPress={handleThemeCallback}
            name={iconeName}
            size={24}
            color={theme["color"]}
          />
        </View>
      </View>
    </View>
  );
}
