import { TextInput, Text, Button, MD2Colors } from "react-native-paper";
import email from "react-native-email";
import { Keyboard, View } from "react-native";
import { useState } from "react";
import { user } from "../Util/User";
import { fullScreen, Theme } from "../globalVars";

export default function ReportBug({ theme, navigation }) {
  if (!user)
    return (
      <Text
        variant="bodyLarge"
        style={{ textAlign: "center", color: theme["color"] }}
      >
        You must be signed in to send feedback!
      </Text>
    );

  const [emailAddress, setEmailAddres] = useState(user.name);
  const [emailMSG, setEmailMSG] = useState("\n\n\n\n");

  const handleEmail = () => {
    const to = ["manmeet.singh7781@gmail.com"];
    email(to, {
      cc: [emailAddress],
      subject: `RE: Bug in Algorithmic Insight App - from ${user.name}`,
      body: emailMSG,
      checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error);
  };
  return (
    <View onTouchStart={Keyboard.dismiss}>
      <View
        style={{
          ...fullScreen,
          backgroundColor: theme["backgroundColor"],
          padding: 20,
          gap: 20,
        }}
      >
        <Text style={{ color: theme["color"] }} variant="titleLarge">
          Send feedback to developer
        </Text>

        <TextInput
          style={{
            borderRadius: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor:
              theme === Theme.darkMode ? "white" : theme["quoteBox"],
          }}
          placeholderTextColor={theme["color"]}
          underlineStyle={{ width: 0 }}
          placeholder="enter your email"
          label="email address"
          value={emailAddress}
          onChangeText={setEmailAddres}
        />

        <TextInput
          style={{
            borderRadius: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            color: "white",
            backgroundColor:
              theme === Theme.darkMode ? "white" : theme["quoteBox"],
          }}
          underlineStyle={{ width: 0 }}
          label="Message"
          value={emailMSG}
          placeholder="enter your message here"
          onChangeText={setEmailMSG}
          multiline={true}
          numberOfLines={5}
        />

        <Button
          mode="contained"
          onPress={() => {
            handleEmail();
            Keyboard.dismiss();
          }}
        >
          Send Email
        </Button>
      </View>
    </View>
  );
}
