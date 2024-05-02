import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Image, View, ScrollView } from "react-native";
import MyText from "../CustomComponents/MyText";
import { Theme, windowHeight } from "../globalVars";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect } from "react";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { atomOneDark, github } from "react-syntax-highlighter/styles/hljs";
import { useState } from "react";
import { generateQuiz } from "../Util/GenAi";

export default function Lesson({ theme, navigation, route }) {
  const current_lesson = route.params.lesson;
  const highlights = route.params.highlights ?? {};
  const [quizeData, setQuiz] = useState([]);
  const [quizLoaded, setquizLoaded] = useState(false);

  useLayoutEffect(() => {
    generateQuiz(current_lesson["title"])
      .then((data) => {
        if (data && data.length > 0) {
          setQuiz(data);
          setquizLoaded(true);
        }
      })
      .catch((er) => {
        console.log("Error ", er);
      });
  }, []);

  // for data structure we will have type of it either it's linear or Non linear
  // this is true when value is present and not undefined
  // Type property is undefined for anything that is not a Data structure
  const isDataStructure = current_lesson["Type"] !== undefined;

  const CatchyShortDescription = () => (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        paddingVertical: 10,
      }}
    >
      {/* Vertical Bar */}
      <View
        style={{
          backgroundColor: theme["color"],
          paddingRight: 3,
          marginRight: 5,
        }}
      />

      {/* Short Description */}
      <MyText
        lessonName={current_lesson["title"]}
        theme={theme}
        variant="labelMedium"
        accessibilityLabel={`Short Description ${current_lesson["catchyShortDescription"]}`}
        highlightIndeces={highlights["catchyShortDescription"]}
        style={{
          fontStyle: "italic",
          backgroundColor: theme["quoteBox"],
          padding: 10,
        }}
        propertyName={"catchyShortDescription"}
      >
        {current_lesson["catchyShortDescription"]}
      </MyText>
    </View>
  );

  const ShowTimeAndSpaceView = () => {
    return (
      <>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          {/* Placeholder for alignment */}
          <View
            style={{
              flex: 0.4,
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <MyText theme={theme} accessibilityLabel={``}>
              {" "}
            </MyText>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 10,
              backgroundColor: "lime",
            }}
          >
            <Text
              accessibilityLabel={`Three cases of Complexity of an algorithm, Best Average and Worst.`}
              variant={"bodyLarge"}
              style={{ paddingTop: 10 }}
            >
              Best
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 10,
              backgroundColor: "orange",
            }}
          >
            <Text variant={"bodyLarge"} style={{ paddingTop: 10 }}>
              Average
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: 10,
              backgroundColor: "red",
            }}
          >
            <Text variant={"bodyLarge"} style={{ paddingTop: 10 }}>
              Worst
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <MyText
              theme={theme}
              variant={"bodyLarge"}
              style={{ marginRight: 5 }}
              accessibilityLabel={"Time Compleixty is "}
            >
              Time{" "}
            </MyText>

            <View
              style={{
                flexGrow: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                // marginLeft: 20,
              }}
            >
              {/* Best case */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                {/* Best case */}
                <MyText
                  accessibilityLabel={`for Best case ${current_lesson["TimeComplexity"][0]}`}
                  theme={theme}
                  variant={"bodyMedium"}
                >
                  {current_lesson["TimeComplexity"][0].toUpperCase()}
                </MyText>
              </View>

              {/* Average case */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                <MyText
                  theme={theme}
                  variant={"bodyMedium"}
                  accessibilityLabel={`for Average case ${current_lesson["TimeComplexity"][2]}`}
                >
                  {current_lesson["TimeComplexity"][2].toUpperCase()}
                </MyText>
              </View>

              {/* Worst case */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                <MyText
                  theme={theme}
                  accessibilityLabel={`for Worst case ${current_lesson["TimeComplexity"][1]}`}
                  variant={"bodyMedium"}
                >
                  {current_lesson["TimeComplexity"][1].toUpperCase()}
                </MyText>
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <MyText
              theme={theme}
              variant={"bodyMedium"}
              style={{ marginRight: 4 }}
              accessibilityLabel={"Space Compleixty is "}
            >
              Space
            </MyText>

            <View
              style={{
                flexGrow: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                // marginLeft: 15,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                {/* Best case */}
                <MyText
                  theme={theme}
                  variant={"bodyMedium"}
                  accessibilityLabel={`for Best case ${current_lesson["SpaceComplexity"][0]}`}
                >
                  {current_lesson["SpaceComplexity"][0].toUpperCase()}
                </MyText>
              </View>

              {/* Average case */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                <MyText
                  theme={theme}
                  variant={"bodyMedium"}
                  accessibilityLabel={`for Average case ${current_lesson["SpaceComplexity"][2]}`}
                >
                  {current_lesson["SpaceComplexity"][2].toUpperCase()}
                </MyText>
              </View>

              {/* Worst case */}
              <View
                style={{
                  flex: 1,
                  paddingBottom: 10,
                  alignItems: "center",
                }}
              >
                <MyText
                  theme={theme}
                  variant={"bodyMedium"}
                  accessibilityLabel={`for Worst case ${current_lesson["SpaceComplexity"][1]}`}
                >
                  {current_lesson["SpaceComplexity"][1].toUpperCase()}
                </MyText>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme["backgroundColor"],
        padding: 10,
      }}
    >
      {/* Title */}
      <Text
        color={theme["color"]}
        variant="headlineMedium"
        style={{
          paddingVertical: 10,
          color: theme["color"],
          fontWeight: "bold",
        }}
        accessibilityLabel={`Title of lesson is ${current_lesson["title"]}`}
        accessibilityRole="text"
      >
        {current_lesson["title"]}
      </Text>

      {/* Description  */}
      <MyText
        lessonName={current_lesson["title"]}
        theme={theme}
        variant="bodyLarge"
        style={{ paddingVertical: 10 }}
        accessibilityLabel={`Description of ${current_lesson["title"]}. ${current_lesson["description"]}`}
        highlightIndeces={highlights["description"]}
        propertyName={"description"}
      >
        {current_lesson["description"]}
      </MyText>

      {/* Examples */}
      <Text
        color={theme["color"]}
        variant="headlineSmall"
        style={{ paddingVertical: 10, color: theme["color"] }}
        accessibilityLabel={`Some examples of ${current_lesson["title"]}`}
        accessibilityRole="text"
      >
        Examples
      </Text>
      {current_lesson["examples"].map((eachExample, key) => {
        return (
          <View
            key={key}
            style={{
              paddingVertical: 5,
              paddingLeft: 10,
              flexDirection: "row",
              alignItems: "center",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <AntDesign
              name="rightsquareo"
              size={16}
              style={{ top: 3 }}
              color={theme["color"]}
            />
            <MyText
              lessonName={current_lesson["title"]}
              theme={theme}
              style={{ marginHorizontal: 5 }}
              variant={"bodyMedium"}
              // Passing key means we are passing a high for each of the string which is indexed to highlights array
              // highlights of example[1] are stored inside highlights['examples'][1] and so on
              highlightIndeces={highlights["examples"][key]}
              accessibilityLabel={`Example ${key + 1}. ${eachExample}`}
              propertyName={"examples"}
            >
              {eachExample}
            </MyText>
          </View>
        );
      })}

      {/* Image */}
      <Image
        accessibilityLabel={`Image of ${current_lesson["title"]}`}
        style={{
          resizeMode: "contain",
          borderRadius: 10,
          borderWidth: 1,
          width: "100%",
          height: windowHeight / 4,
          borderColor: "rgba(0,0,0,0.08)",
          marginTop: 5,
        }}
        // source={{ uri: current_lesson.imageURL }}
        source={current_lesson.imageURL}
      />

      {/* More about topic */}
      <MyText
        lessonName={current_lesson["title"]}
        theme={theme}
        variant={"bodyLarge"}
        style={{ paddingVertical: 10, marginTop: 20 }}
        accessibilityLabel={`More Information on this topic`}
        highlightIndeces={highlights["text"]}
        propertyName={"text"}
      >
        {current_lesson["text"]}
      </MyText>

      {/* Short description */}
      <CatchyShortDescription />

      {/* Approach */}
      <Text
        variant="titleLarge"
        style={{ paddingVertical: 10, color: theme["color"] }}
        accessibilityLabel={`Here is the How would you Approach`}
        accessibilityRole="text"
      >
        Approach
      </Text>

      {current_lesson["Approach"].map((eachApproach, key) => {
        return (
          <View
            key={key}
            aria-label={`Approach Step number ${key + 1}. ${eachApproach}`}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <MyText
              lessonName={current_lesson["title"]}
              variant={"bodyLarge"}
              key={key}
              theme={theme}
              accessibilityLabel={`Approach Step number ${
                key + 1
              }. ${eachApproach}`}
              highlightIndeces={highlights["Approach"][key]}
              style={{
                paddingVertical: 5,
                paddingLeft: 10,
              }}
              propertyName={"Approach"}
            >
              {key + 1 + ") " + eachApproach}
            </MyText>
          </View>
        );
      })}

      {/* Code snippit */}
      <Text
        color={theme["color"]}
        variant="titleLarge"
        style={{ paddingVertical: 10, color: theme["color"] }}
        accessibilityLabel={`Code Snippit of ${current_lesson["title"]}`}
        accessibilityRole="text"
      >
        Code Snippet
      </Text>
      <SyntaxHighlighter
        accessibilityLabel={`Javascript Code for ${current_lesson["title"]}`}
        accessibilityRole="text"
        language="javascript"
        style={theme === Theme.darkMode ? atomOneDark : github}
        customStyle={{
          borderRadius: 10,
          padding: 20,
        }}
      >
        {current_lesson["CodeSnippt"]}
      </SyntaxHighlighter>

      {/* Complexity */}
      <View>
        <Text
          color={theme["color"]}
          variant="titleLarge"
          style={{ paddingTop: 10, color: theme["color"] }}
          accessibilityLabel={`Time and Space Complexity of ${current_lesson["title"]}`}
        >
          Complexity
        </Text>

        <MyText
          lessonName={current_lesson["title"]}
          variant={"bodyLarge"}
          theme={theme}
          highlightIndeces={highlights["Complexity"]}
          accessibilityLabel={current_lesson["Complexity"]}
          propertyName={"Complexity"}
        >
          {current_lesson["Complexity"]}
        </MyText>
      </View>

      {/* Time And Space -> BEST, Worst, Average*/}
      {/* Table of Compliexity */}
      {isDataStructure ? (
        <View>
          <Text
            color={theme["color"]}
            variant="titleLarge"
            style={{ paddingTop: 10, color: theme["color"] }}
            accessibilityLabel={`Time Complexity of ${current_lesson["title"]} Operations`}
          >
            Complexity of Operations
          </Text>
          {Object.entries(current_lesson["TimeComplexity"]).map(
            ([key, value]) => {
              return (
                <View
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                  }}
                >
                  {/* Operation Name */}
                  <Text
                    color={theme["color"]}
                    variant="bodyLarge"
                    style={{ paddingTop: 10, color: theme["color"] }}
                    accessibilityLabel={`Operation ${key}`}
                  >
                    {key}
                  </Text>
                  {/* Operation Compliexty */}
                  <Text
                    color={theme["color"]}
                    variant="bodyLarge"
                    style={{ paddingTop: 10, color: theme["color"] }}
                    accessibilityLabel={`Time it takes is ${value}`}
                  >
                    {value.toUpperCase()}
                  </Text>
                </View>
              );
            }
          )}
        </View>
      ) : (
        <ShowTimeAndSpaceView />
      )}
      <View style={{ marginTop: 20, gap: 20 }}>
        <Text
          color={theme["color"]}
          variant="titleLarge"
          style={{ paddingTop: 10, color: theme["color"] }}
          accessibilityLabel={`Take quiz of ${current_lesson["title"]}`}
        >
          Ready to put your knowledge to the test?🤖
        </Text>
        <Text
          color={theme["color"]}
          variant="bodyLarge"
          style={{ paddingTop: 10, color: theme["color"] }}
          accessibilityLabel={`Check your understanding by taking AI generated Quiz`}
        >
          Take AI-generated quizzes with AI-tested answers!
        </Text>
        <Button
          mode="contained"
          disabled={!quizLoaded}
          style={{
            borderColor: quizLoaded ? "transparent" : "white",
            borderWidth: 1,
          }}
          onPress={() => {
            // Passing lesson so that we can generate Quiz on it
            navigation.navigate("Lesson Quiz", {
              lesson: current_lesson,
              nextLessonReference: route.params.nextLessonReference,
              highlights: route.params.highlights,
              quizeData: quizeData,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Take Quiz</Text>
            {!quizLoaded && <ActivityIndicator style={{ paddingLeft: 10 }} />}
          </View>
        </Button>
      </View>
      <View style={{ marginBottom: 50 }} />
    </ScrollView>
  );
}
