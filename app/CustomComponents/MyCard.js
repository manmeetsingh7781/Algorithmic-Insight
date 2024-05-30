// First thig user sees after the Startup Screen
import { TouchableHighlight } from "react-native";
import { Text, Card } from "react-native-paper";
import { Theme } from "../globalVars";

export default function MyCard({
  navigation,
  theme,
  card_content,
  highlights,
  nextLessonReference,
}) {
  return (
    <TouchableHighlight
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowOpacity: 0.05,
        shadowOffset: 0.6,
        shadowRadius: 10,
      }}
      textColor={theme["color"]}
      onPress={() => {
        navigation.navigate("Lesson", {
          lesson: card_content,
          nextLessonReference: nextLessonReference,
          highlights: highlights,
        });
      }}
      accessibilityLabel="Learn more about Algorithms"
    >
      <Card style={{ ...theme["cardStyle"] }}>
        <Card.Cover
          style={{
            height: 120,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          source={card_content["bannerImage"]}
        />
        <Card.Content>
          <Text
            style={{ color: theme["color"], paddingTop: 10 }}
            variant="titleMedium"
          >
            {card_content["title"]}
          </Text>

          <Text
            style={{ color: theme["color"], paddingTop: 10 }}
            variant="bodyMedium"
          >
            {card_content["catchyShortDescription"]}
          </Text>
        </Card.Content>
      </Card>
    </TouchableHighlight>
  );
}
