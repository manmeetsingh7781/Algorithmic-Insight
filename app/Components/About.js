import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import { fullScreen } from "../globalVars";
export default function About({ theme, navigation }) {
  let questions = [
    "What AI is being used in this App?",
    "What is the purpose of the app? 📱",
    "What is the description of this app? 💬",
    "Why do I, as a developer, want to create it? 🤔",
    "Who is the target audience and platform? 🎯",
    "What sets it apart from other similar apps? 🤔",
  ];

  let answers = [
    `I am using Google's latest Gemini AI models gemini-pro for text and gemini-pro-vision for image inputs`,
    `The aim 🎯 of this is to assist students like myself in staying organized with essential Computer Science topics. This will encourage students to remain focused and motivated to complete the lessons provided within this app. 📚💻`,
    `The Algorithmic Insight app aims to support students in learning, resolving doubts, and gaining knowledge in the field of Computer Science. It covers topics ranging from the very basic to advanced levels. With progress tracking, you can seamlessly resume where you left off, save topics, and create new notes for future reference. 📱💡✨`,
    `I want to create this app to make it easy for learners to find what they need to know, rather than searching across the internet and numerous websites for trusted sources to study from. 🔍✨`,
    `The target audience will include students or any other learners seeking to clarify their doubts or acquire new knowledge that proves beneficial to them. It caters to individuals struggling to grasp theoretical concepts in Computer Science, aiding them in maintaining discipline.\n\nThe platform I'm concentrating on is a Mobile App (Android 🤖 and iOS 🍎).`,
    `This app will feature a Roadmap 🗺️ that guides users through a journey from the start (basic level) to the end (advanced level).\n\nUnlike other developers who often present a jumbled mix, causing many students to lose focus and feel overwhelmed, this app will provide a clear structure.\n\nIt will offer concise, well-explained information with relevant examples. 💡📚`,
  ];
  return (
    <ScrollView
      style={{ ...fullScreen, backgroundColor: theme["backgroundColor"] }}
    >
      {questions.map((question, i) => (
        <View
          key={i}
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
          }}
        >
          <Text
            variant="bodyLarge"
            style={{ color: theme["color"], paddingTop: 5, fontWeight: "500" }}
          >
            {question}
          </Text>

          <Text variant="bodyMedium" style={{ color: theme["color"] }}>
            {answers[i]}
          </Text>
        </View>
      ))}
      <Text
        variant="labelSmall"
        style={{ textAlign: "center", paddingTop: 20, color: theme["color"] }}
      >
        Developed by Manmeet Singh | 2024
      </Text>
      <View style={{ marginBottom: 50 }} />
    </ScrollView>
  );
}
