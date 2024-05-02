import { View, Image, ScrollView } from "react-native";
import { RenderChat } from "./MyAI";
import { Divider, Text } from "react-native-paper";
import { user } from "../Util/User";
import { fullScreen } from "../globalVars";

export default function ChatHistory({ theme, navigation }) {
  return user.chat_history.length !== 0 ? (
    <ScrollView
      style={{
        ...fullScreen,
        backgroundColor: theme["backgroundColor"],
      }}
    >
      {user.chat_history.map((eachConvo, k) => {
        let parsed_data = [];
        try {
          parsed_data = JSON.parse(eachConvo);
        } catch (er) {
          parsed_data = JSON.parse(JSON.stringify(eachConvo));
        }

        return (
          <View key={k}>
            <RenderChat
              // since we are stringifying each chat object to store in firebase
              // we need to parse it so that we can use its properties
              conversation={parsed_data ?? []}
              theme={theme}
            />
            <Divider />
          </View>
        );
      })}
    </ScrollView>
  ) : (
    <View
      style={{
        ...fullScreen,
        backgroundColor: theme["backgroundColor"],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text variant="titleLarge" style={{ color: theme["color"] }}>
        No conversation history
      </Text>

      <Image
        resizeMode="center"
        style={{ width: 240, height: 240, zIndex: 1 }}
        source={require("../../assets/images/no_convo.png")}
      />
    </View>
  );
}
