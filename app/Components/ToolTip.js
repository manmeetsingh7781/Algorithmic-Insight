import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { PaperProvider, Text } from "react-native-paper";
import { View, TextInput } from "react-native";
import { fullScreen, Theme } from "../globalVars";
import {
  Button,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

function findSubString(paragraph) {}
export default function ToolTip() {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [showToolTip, setShowToolTip] = useState(false);
  const textInputRef = useRef(null);
  const selection = useRef(null);
  const [text, setText] =
    useState(`This code implements the Counting Sort algorithm, which works by first
    counting the occurrences of each element in the input array. Then, it
    reconstructs the sorted array based on these counts. Finally, it
    returns the sorted array. This sorting algorithm is efficient for
    sorting integers within a specific range (0 to max).`);
  const handleTextPress = (e) => {
    e.preventDefault();
    // if user clicks anywhere else on screen then hide the tool tip
    setX(e.nativeEvent.locationX);
    setY(e.nativeEvent.locationY);
    setShowToolTip((prev) => {
      // change to false
      if (prev) {
        selection.current = null;
        setShowToolTip(false);
      } else {
        selection.current = { start: 10, end: 100 };
        setShowToolTip(true);
      }
    });
  };

  return (
    <View style={{ backgroundColor: "transparent", ...fullScreen }}>
      {/* Overlay for touch tracing */}
      <View
        accessible={true}
        style={{ backgroundColor: "orange" }}
        onTouchStart={(e) => {
          handleTextPress(e);
        }}
      >
        {/* My content goes here */}
        <TextInput
          ref={textInputRef}
          variant="titleLarge"
          style={{ fontSize: 32 }}
          editable={false}
          multiline={true}
          selection={selection.current}
          onResponderTerminationRequest={() => false}
          onStartShouldSetResponder={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.persist();
          }}
        >
          {text}
        </TextInput>
      </View>

      {showToolTip ? (
        <View
          style={{
            width: 200,
            position: "absolute",
            top: y - 100 < 10 ? y + 50 : y - 100,
            left: x - 100,
            backgroundColor: "white",
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Button
            onPress={() => {
              if (textInputRef.current) {
                // Set the selection to the entire text
                selection.current = { start: 0, end: 0 };
                // Force update
                textInputRef.current.setNativeProps({
                  selection: selection.current,
                });
              }
              setShowToolTip(false);
            }}
            title="Highlight"
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
