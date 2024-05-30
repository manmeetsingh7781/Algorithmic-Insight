import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

// data is an Array
// selected is the index that item is selected
export default function RadioButtons({
  data,
  setIndx,
  answer,
  theme,
  answeredIdx,
}) {
  const [selected, setSelected] = useState(answeredIdx ?? null);
  const getAnsColor = (index) => {
    // this is null when user hasnt selected answer yet
    if (selected !== null) {
      if (selected === index && data[selected] !== answer) return "red";
      if (selected === index && data[selected] === answer) return "#02c926";
    }
    return theme["quoteBox"];
  };

  return data.map((item, index) => (
    <TouchableOpacity
      disabled={selected !== null}
      accessibilityRole="radio"
      accessibilityValue={selected}
      onPress={() => {
        setSelected(index);
        setIndx(index);
      }}
      style={{
        borderRadius: 10,
        // if answer was selected we will reduce the opactiy while keeping 1 to the selected answer
        opacity: selected !== null && selected !== index ? 0.7 : 1,
        backgroundColor:
          selected !== null
            ? answer === item
              ? "green"
              : getAnsColor(index)
            : "transparent",
        padding: 10,
      }}
      key={item}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}
      >
        {selected === index ? (
          <MaterialIcons
            name="radio-button-checked"
            size={24}
            color={"white"}
          />
        ) : (
          <MaterialIcons
            name="radio-button-off"
            size={24}
            color={theme["color"]}
          />
        )}

        <Text
          style={{
            color:
              selected !== null && selected === index
                ? "white"
                : theme["color"],

            fontWeight: "500",
            paddingHorizontal: 10,
          }}
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  ));
}
