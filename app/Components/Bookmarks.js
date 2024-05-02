import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { fullScreen } from "../globalVars";
import MyCard from "../CustomComponents/MyCard";
import { user } from "../Util/User";
import { searching_algorithms } from "../Data/SearchAlgorithms";
import { sorting_algorithms } from "../Data/SortingAlgorithms";
import { datastructures } from "../Data/DataStrucutres";

export default function Bookmarks({ theme, navigation }) {
  const RenderBookMarks = () => {
    return (
      <ScrollView
        style={{ backgroundColor: theme["backgroundColor"], ...fullScreen }}
      >
        {user.lesson_bookmarks.map((each, v) => {
          let highlight_type;
          let lesson_type;
          //  if lesson is Searching we have title as Search in it and similarly sorting
          if (each.includes("Search")) {
            highlight_type = user.searching_algorithms_highlights;
            lesson_type = searching_algorithms;
          } else if (each.includes("Sort")) {
            highlight_type = user.sorting_algorithms_highlights;
            lesson_type = sorting_algorithms;
          } else {
            highlight_type = user.datastructures_highlights;
            lesson_type = datastructures;
          }
          let current_lesson;
          for (let l of lesson_type) {
            if (l["title"] === each) {
              current_lesson = l;
              break;
            }
          }
          if (current_lesson) {
            return (
              <MyCard
                key={v}
                navigation={navigation}
                theme={theme}
                card_content={current_lesson}
                highlights={highlight_type[each]}
              />
            );
          }
          return <View key={v}></View>;
        })}
        <View style={{ marginBottom: 150 }} />
      </ScrollView>
    );
  };

  const RenderHowToBookMark = () => {
    return (
      <View
        style={{
          ...fullScreen,
          backgroundColor: theme["backgroundColor"],
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", color: theme["color"] }}
        >
          Bookmark your lessons with a tap on the icon in the top right corner
          of the screen! 🔖✨
        </Text>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: theme["backgroundColor"] }}>
      {user.lesson_bookmarks.length === 0 ? (
        <RenderHowToBookMark />
      ) : (
        <RenderBookMarks />
      )}
    </View>
  );
}
