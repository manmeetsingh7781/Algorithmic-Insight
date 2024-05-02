import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";

import { useEffect, useLayoutEffect, useState } from "react";
import { searching_algorithms } from "../Data/SearchAlgorithms";
import { fullScreen } from "../globalVars";
import { sorting_algorithms } from "../Data/SortingAlgorithms";
import { datastructures } from "../Data/DataStrucutres";
import { user } from "../Util/User";

export default function Notes({ navigation, theme }) {
  const REACH_LIMIT = 250; // number of character before "Read More" button shows up
  const [areThereSearchingAlgos, setSearchingAlogs] = useState(false);
  const [areThereSortingAlgos, setSortingAlogs] = useState(false);
  const [areThereDS, setDS] = useState(false);
  const [showingHighlights, setShowing] = useState(false);

  const buildTextStr = (k, v, highlights, data, text) => {
    let hasReachedLimit = false;
    const build = (propertyName) => {
      if (highlights[k][propertyName].length > 0 && text.length < REACH_LIMIT) {
        if (text.length > 0) text += "\n\n";

        for (let i of highlights[k][propertyName]) {
          let lengthDifference = text.length + (i["end"] - i["start"]) / 2 + 1;
          hasReachedLimit = text.length > REACH_LIMIT;
          if (!hasReachedLimit) {
            // the length difference is used to check the when the end point of substring exceeds the REACH_LIMIT
            // to avoid exceding we using the formula to check the end point difference so that we dont over-iterate or show too much of data
            if (lengthDifference > REACH_LIMIT) {
              text += data[v][propertyName].substring(i["start"], REACH_LIMIT);
            } else {
              text += data[v][propertyName].substring(i["start"], i["end"]);
            }
          } else {
            break;
          }
        }
      }
    };

    for (let property of [
      "description",
      "catchyShortDescription",
      "text",
      "Complexity",
    ]) {
      hasReachedLimit = text.length > REACH_LIMIT;
      if (!hasReachedLimit) {
        build(property);
      } else {
        break;
      }
    }
    return { text1: text, hasReachedLimit: hasReachedLimit };
  };

  const RenderHighlights = ({
    highlights_dict,
    data,
    title,
    condition,
    setCondition,
  }) => {
    return (
      // {/* Make it accordian */}
      <View
        style={{
          backgroundColor: theme["backgroundColor"],
          padding: 10,
        }}
      >
        {condition && (
          // <Divider>
          <View>
            <Text
              variant="titleLarge"
              style={{ color: theme["color"], fontWeight: "bold" }}
            >
              {title}
            </Text>
          </View>
        )}
        {Object.keys(highlights_dict).map((title, value) => {
          let text = "";
          const { text1, hasReachedLimit } = buildTextStr(
            title,
            value,
            highlights_dict,
            data,
            text
          );
          text = text1;

          useLayoutEffect(() => {
            if (text.length > 0) setCondition(true);
            setShowing(
              areThereDS || areThereSearchingAlgos || areThereSortingAlgos
            );
            // hasReachedLimit = text.length > REACH_LIMIT;
          }, [text]);

          return (
            text !== "" && (
              <TouchableOpacity
                key={title}
                style={{
                  backgroundColor: theme["quoteBox"],
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 10,
                  shadowOpacity: 0.2,
                  shadowOffset: 0.5,
                  shadowRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("Lesson", {
                    lesson: data[value],
                    highlights: highlights_dict[title],
                  })
                }
              >
                <View>
                  <Text
                    variant="titleMedium"
                    style={{
                      marginBottom: 10,
                      fontWeight: "500",
                      color: theme["color"],
                    }}
                  >
                    {title}
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme["color"] }}>
                    {hasReachedLimit ? `${text}...` : text}
                  </Text>
                  {hasReachedLimit && (
                    <Button
                      mode="outlined"
                      style={{ marginTop: 10 }}
                      textColor={theme["headerTintColor"]}
                    >
                      Read More
                    </Button>
                  )}
                </View>
              </TouchableOpacity>
            )
          );
        })}
      </View>
    );
  };

  const AllHighlights = () => (
    <ScrollView style={showingHighlights && fullScreen}>
      {/* Searching Highlights */}

      <RenderHighlights
        highlights_dict={user.searching_algorithms_highlights}
        data={searching_algorithms}
        title={"Searching Algorithms"}
        condition={areThereSearchingAlgos}
        setCondition={setSearchingAlogs}
      />

      {/* Sorting Highlights */}

      <RenderHighlights
        highlights_dict={user.sorting_algorithms_highlights}
        data={sorting_algorithms}
        title={"Sorting Algorithms"}
        condition={areThereSortingAlgos}
        setCondition={setSortingAlogs}
      />

      {/* Data Structures Highlights */}
      <RenderHighlights
        highlights_dict={user.datastructures_highlights}
        data={datastructures}
        title={"Data Structures"}
        condition={areThereDS}
        setCondition={setDS}
      />

      {/* place holder for content to see all the way down */}
      {showingHighlights && <View style={{ marginBottom: 150 }} />}
    </ScrollView>
  );

  const ShowHowToHighlight = () => (
    <View
      style={{
        display: "flex",
        gap: 10,
        marginHorizontal: 10,
        alignItems: "center",
        height: fullScreen["height"],
      }}
    >
      <Card
        mode="contained"
        style={{
          ...theme["cardStyle"],
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          top: fullScreen["height"] / 6,
        }}
      >
        <Card.Content
          style={{ backgroundColor: theme["backgroundColor"], gap: 20 }}
        >
          <Text
            style={{
              color: theme["color"],
              paddingTop: 10,
              textAlign: "center",
            }}
            variant="displaySmall"
          >
            No Notes taken!
          </Text>
          <Card.Cover
            style={{
              borderRadius: 10,
              width: "100%",
              height: 150,
            }}
            source={require("../../assets/highlightgif.gif")}
          />
          <Text style={{ color: theme["color"] }} variant="bodyMedium">
            Enhance your learning experience by seamlessly taking notes in your
            lessons. Simply tap and hold on the text ✏️, then select the portion
            you wish to jot down. It's that easy! 📝
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  useEffect(() => {
    setShowing(areThereDS || areThereSearchingAlgos || areThereSortingAlgos);
  }, [areThereDS, areThereSearchingAlgos, areThereSortingAlgos]);

  return (
    <View style={{ backgroundColor: theme["backgroundColor"] }}>
      {/* All highlights triggers the showingHighlights, maybe need to set a condition before it checks before AllHighlights being render */}
      <AllHighlights />
      {!showingHighlights && <ShowHowToHighlight />}
    </View>
  );
}
