import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { defaultMargin } from "../globalVars";
import MyCard from "../CustomComponents/MyCard";

export default function Algorithms({
  navigator,
  route,
  theme,
  Title,
  itarative_data,
  highlights_data,
}) {
  const ListItem = ({ item, nextLessonReference, highlights }) => {
    return (
      <MyCard
        navigation={navigator}
        theme={theme}
        card_content={item}
        highlights={highlights}
        nextLessonReference={nextLessonReference}
      />
      // <TouchableOpacity
      //   style={{ padding: 10, borderRadius: 10 }}
      //   textColor={theme["color"]}
      //   onPress={() =>
      //     // Navigate from Main Screen into the lesson user clicked on
      //     navigator.navigate("Lesson", {
      //       //  These are the parameters that we are passing the data from One Scene to Another
      //       lesson: item,
      //       highlights: highlights,
      //     })
      //   }
      //   accessibilityLabel="Learn more about Algorithms"
      // >
      //   <Card style={{ ...theme["cardStyle"] }}>
      //     <Card.Cover
      //       style={{
      //         height: 120,
      //         borderBottomLeftRadius: 0,
      //         borderBottomRightRadius: 0,
      //       }}
      //       source={item.bannerImage}
      //     />
      //     <Card.Content>
      //       <Text
      //         style={{ color: theme["color"], paddingTop: 10 }}
      //         variant="titleMedium"
      //       >
      //         {item["title"]}
      //       </Text>

      //       <Text
      //         style={{ color: theme["color"], paddingTop: 10 }}
      //         variant="bodyMedium"
      //       >
      //         {item["catchyShortDescription"]}
      //       </Text>
      //     </Card.Content>
      //   </Card>
      // </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme["backgroundColor"],
      }}
    >
      <View
        style={{
          backgroundColor: theme["backgroundColor"],
        }}
      >
        <Text
          style={{
            marginHorizontal: defaultMargin["margin"],
            color: theme["color"],
          }}
          variant={"displaySmall"}
        >
          {Title}
        </Text>
        {/* Search bar and button comes here*/}

        {/* <ListItem key={item.title} item={item} /> */}
        {itarative_data.map((item, index) => {
          return (
            <ListItem
              key={item.title}
              highlights={highlights_data[item["title"]]}
              item={item}
              nextLessonReference={itarative_data[index + 1]}
            />
          );
        })}
      </View>
      <View style={{ marginBottom: 50 }} />
    </ScrollView>
  );
}
