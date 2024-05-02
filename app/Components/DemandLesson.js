import { useLayoutEffect, View, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { fullScreen } from "../globalVars";
import { useState } from "react";
import { generateLesson } from "../Util/GenAi";
import Markdown from "react-native-markdown-display";

export function DemandLesson({ theme, navigation }) {
  const [lesson, setLesson] = useState(null);
  const [inputVal, setInputVal] = useState("");
  //   useLayoutEffect(() => {}, []);
  return (
    <ScrollView
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme["backgroundColor"],
        width: "100%",
        height: "100%",
        padding: 20,
      }}
    >
      <Text variant="bodyLarge" style={{ color: theme["color"] }}>
        What specific topic would you like to know about?
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          //   flexGrow: 1,
          flexWrap: 1,
        }}
      >
        <Text variant="bodyLarge" style={{ color: theme["color"] }}>
          I want to learn about
        </Text>
        <TextInput
          mode="outlined"
          value={inputVal}
          onChangeText={setInputVal}
          placeholder="Brute force, Big O"
          textColor={theme["color"]}
          placeholderTextColor={"gray"}
          style={{
            marginLeft: 10,
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: "red",
          }}
        />
      </View>
      <Button
        mode="contained"
        style={{ marginTop: 10 }}
        onPress={() => {
          generateLesson(inputVal).then((res) => {
            if (res) {
              const str = res.replace(/^.*?\n/, "").replace(/.*\n?$/, "");
              console.log(JSON.parse(`${str}`));
              setLesson(str);
            }
          });
        }}
      >
        Generate Lesson
      </Button>

      <Text style={{ color: "white" }}> {inputVal}</Text>
    </ScrollView>
  );
}
