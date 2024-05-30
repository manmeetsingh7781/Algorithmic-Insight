import { Animated, TouchableOpacity, View } from "react-native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import { generateQuiz } from "../Util/GenAi";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { fullScreen, Theme } from "../globalVars";
import RadioButtons from "../CustomComponents/RadioButtons";
import { FontAwesome6 } from "@expo/vector-icons";
import { updateUserQuizRecord, user } from "../Util/User";
import { Entypo } from "@expo/vector-icons";

export function Quiz({ route, theme }) {
  const lesson_name = route.params["lesson"]["title"];
  let quizeData = route.params["quizeData"] ?? [];

  // is quiz loaded from AI
  const [loaded, setLoaded] = useState(false);
  // current question user is attempting
  const [questionCount, setQuestionCount] = useState(0);
  // number of correct answers
  const [correctlyAns, setCorrectlyAns] = useState(0);
  // if user is reviewing the quiz
  const [isReviwing, setIsReviewing] = useState(false);
  // store the user answers
  const [ans, setAns] = useState([]);

  // total XP gained in this quiz
  const [XP, setXP] = useState(0);
  const [quize, setQuiz] = useState([]);

  useLayoutEffect(() => {
    if (!(quizeData == [] || quizeData.length === 0)) {
      setQuiz(quizeData);
      setLoaded(true);
    }
  }, []);

  /*
    progress: INT [0.0, 1]
    0.0 to 0.2 -> Generating Quiz Based on Lesson
    0.2 -> 0.4 -> Generating Questions    
    0.4 -> 0.6 -> Generating Answers
    0.6 -> 0.8 -> Validating...
    0.8 -> 1 ->  Rendering Views    

  */
  const LoadingScreen = () => {
    const [progress, setProgress] = useState(0.0);
    const [progressIdx, setprogressIdx] = useState(0);
    let progressText = [
      `Collecting Data for ${lesson_name}`,
      "Generating Questions",
      "Generating Answers",
      "Validating...",
      "Rendering Views",
      "Loading ",
    ];
    useEffect(() => {
      if (progress < 1 && !loaded) {
        setInterval(() => {
          setProgress((prev) => {
            let updated = prev + (Math.random() % 0.2);
            if (updated >= 0.2 && updated < 0.4) setprogressIdx(1);
            if (updated >= 0.4 && updated < 0.6) setprogressIdx(2);
            if (updated >= 0.6 && updated < 0.8) setprogressIdx(3);
            if (updated >= 0.8 && updated < 1) setprogressIdx(4);
            if (updated >= 1 && updated <= 2) setprogressIdx(5);

            return updated;
          });
        }, 500);
      }
    }, []);

    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme["backgroundColor"],
        }}
      >
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              paddingBottom: 20,
            }}
          >
            <Text
              variant="titleMedium"
              style={{ textAlign: "center", color: theme["color"] }}
            >
              {progressText[progressIdx]}
            </Text>
            {progressIdx === 5 && (
              <ActivityIndicator style={{ paddingLeft: 10 }} />
            )}
          </View>
          <ProgressBar progress={progress} />
        </View>

        <Text
          variant="bodySmall"
          style={{
            position: "absolute",
            bottom: fullScreen["height"] / 8,
            color: theme["color"],
            padding: 20,
            textAlign: "center",
          }}
        >
          While the AI is generating your quiz, please do not change the screen
          or minimize the app.
        </Text>
      </View>
    );
  };

  const QuestionView = ({ question, k, ans }) => {
    const fadeAnim = useRef(new Animated.Value(fullScreen["width"])).current;

    const [ansIndex, setAnsIndex] = useState(-1);

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          transform: [{ translateX: fadeAnim }],
          backgroundColor: theme["backgroundColor"],
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <View
          key={k}
          style={{
            display: "flex",
            gap: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodySmall"
              style={{ textAlign: "left", color: theme["color"] }}
            >
              {questionCount + 1}/{quize.length}
            </Text>

            <Text
              variant="bodySmall"
              style={{ textAlign: "right", color: theme["color"] }}
            >
              {question["difficulty"]} | XP: {question["XP"]}
            </Text>
          </View>

          <Text
            variant="bodyLarge"
            style={{ fontWeight: "bold", color: theme["color"] }}
          >
            {question["question"]}
          </Text>

          {/* Show choices to user 
            Takes array of choices
            SetIndx is what the final Index is inside array of choices to match with right answer
            we are also passing the right answer for internal checking
          */}
          <RadioButtons
            theme={theme}
            data={question["choices"]}
            setIndx={setAnsIndex}
            answer={question["answer"]}
            answeredIdx={isReviwing ? ans[k] : null}
          />

          {/* When user has selected an answer it will show the explanation of the question */}
          {ansIndex > -1 || isReviwing ? (
            <View
              style={{
                backgroundColor: theme["quoteBox"],
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: theme["color"],
                  fontStyle: "italic",
                }}
              >
                {question["explanation"]}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <Button
          style={{
            marginTop: 20,
            borderColor: theme["quoteBox"],
            borderWidth: 1,
            opacity: ansIndex > -1 || isReviwing ? 1 : 0.5,
          }}
          // disabled={ansIndex > -1 ? false : isReviwing ? false : true}
          mode="contained"
          // textColor={Theme.darkMode === theme ? "white" : "black"}
          onPress={() => {
            // when user answered
            if (ansIndex > -1) {
              // if given answer is correct
              if (question["choices"][ansIndex] === question["answer"]) {
                setCorrectlyAns((prev) => prev + 1);
                setXP((prev) => prev + question["XP"]);
              }
              // otherwise move to the next question
              ans.push(ansIndex);
              setAns(ans);
            }

            if (ansIndex > -1 || isReviwing)
              setQuestionCount((prev) => prev + 1);
          }}
        >
          Next
        </Button>
      </Animated.View>
    );
  };

  const ShowResults = () => {
    const scaleAnim = useRef(new Animated.Value(0.0)).current;
    const percentage = ((correctlyAns / quize.length) * 100).toFixed(2);

    // Handling animations
    useEffect(() => {
      if (questionCount === quize.length) {
        if (!isReviwing) {
          user.XP += XP;
          user.quiz_attempts++;
          user.quiz_passed += percentage >= 59.0 ? 1 : 0;
          user.quiz_scores.push(parseFloat(percentage));
        }

        // when quiz has been completed
        if (user && user._id && !isReviwing) {
          updateUserQuizRecord({
            XP: user.XP,
            quiz_attempts: user.quiz_attempts,
            quiz_passed: user.quiz_passed,
            quiz_scores: user.quiz_scores,
          });
        }
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [questionCount]);
    const getColor = () => {
      if (percentage <= 34) return "red";
      if (percentage > 34 && percentage < 70) return "orange";
      else return theme === Theme.darkMode ? "lime" : "green";
    };

    return (
      <View
        style={{
          ...fullScreen,
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme["backgroundColor"],
          padding: 10,
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            // flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between", // padding: 20,
          }}
        >
          <Animated.View
            style={{
              // padding: 100,
              backgroundColor: percentage >= 59.0 ? "green" : "red",
              borderRadius: 10000,
              transform: [{ scale: scaleAnim }],
            }}
          >
            <Entypo
              name={percentage >= 59.0 ? "check" : "cross"}
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 100,
              }}
            />
          </Animated.View>
          <Text variant="headlineLarge" style={{ color: theme["color"] }}>
            Quiz Has Completed
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Text variant="headlineMedium" style={{ color: theme["color"] }}>
              You Scored
            </Text>
            <Text
              variant="headlineLarge"
              style={{
                color: getColor(),
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {percentage}%
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Text variant="headlineSmall" style={{ color: theme["color"] }}>
              XP Gained
            </Text>
            <Text
              variant="headlineMedium"
              style={{ color: theme["color"], textAlign: "center" }}
            >
              + {XP}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 20,
              marginTop: 20,
            }}
          >
            {/* Retry Quiz button */}
            <TouchableOpacity
              style={{
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: theme["quoteBox"],
                padding: 20,
                borderRadius: 20,
                shadowColor: "black",
                shadowOffset: 0.5,
                gap: 10,
              }}
              onPress={() => {
                // reload the quiz, reset all values
                setQuiz([]);
                quizeData = [];
                setLoaded(false);
                setCorrectlyAns(0);
                setQuestionCount(0);
                setXP(0);
                setIsReviewing(false);
                setAns([]);
                generateQuiz(lesson_name)
                  .then((data) => {
                    if (data && data.length > 0) {
                      setQuiz(data);
                      setLoaded(true);
                    }
                  })
                  .catch((er) => {
                    alert("Unable to Generate Quize this time");
                  });
              }}
            >
              <FontAwesome6
                name="arrow-rotate-left"
                size={34}
                color={theme["color"]}
              />

              <Text style={{ color: theme["color"] }}>Try Again</Text>
            </TouchableOpacity>

            {/* Rewiew lesson button */}
            <TouchableOpacity
              style={{
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: theme["quoteBox"],
                padding: 20,
                paddingHorizontal: 30,
                borderRadius: 20,
                shadowColor: "black",
                shadowOffset: 0.5,
                gap: 10,
              }}
              onPress={() => {
                setQuestionCount(0);
                setIsReviewing(true);
              }}
            >
              <FontAwesome6
                name="clipboard-list"
                size={34}
                color={theme["color"]}
              />

              <Text style={{ color: theme["color"] }}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return !loaded ? (
    <LoadingScreen />
  ) : questionCount === quize.length ? (
    // When all the questions has been answered the quize is ended
    <ShowResults />
  ) : (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        ...fullScreen,
        backgroundColor: theme["backgroundColor"],
      }}
    >
      <QuestionView
        question={quize[questionCount]}
        k={questionCount}
        ans={ans}
      />
    </View>
  );
}
