// import { Text } from "react-native-paper";
// import { Theme } from "../globalVars";

// export default function MyText({ variant, color, style, children }) {
//   return (
//     <Text
//       selectable={true}
//       selectionColor={"orange"}
//       variant={variant}
//       style={{ color: color, ...style }}
//     >
//       {children}
//     </Text>
//   );
// }
import { Text } from "react-native-paper";
import { TextInput, Platform } from "react-native";
import { useLayoutEffect, useState } from "react";
import React from "react";
import { highLight } from "../Util/Highlighter";
import {
  searching_algorithms_highlights,
  sorting_algorithms_highlights,
} from "../Data/LessonHighlights";
import { updateDocument, user } from "../Util/User";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../FireBase/firebase";
export default function MyText({
  variant,
  lessonName,
  theme,
  style,
  children,
  accessibilityLabel,
  highlightIndeces,
  propertyName,
}) {
  const [text, setText] = useState(<>{children}</>);
  const [isFirstHighlighted, setisFirstHighlighted] = useState(true);
  const [count, setCounter] = useState(0);
  async function loadData() {
    if (count < highlightIndeces.length) {
      await highLightWithRange(highlightIndeces[count])
        .then((data) => {
          setCounter(count + 1);
        })
        .catch((er) => {
          console.log("Error in MyText.js inside loadData()", er);
        });
    }
  }

  // takes 2 indicies
  // checks both of their starting index and end
  // if they are same it will return true which means object is in the highlightindicies variable
  // which holds all the highlight indicies for each text
  const compare_indexes = (x, y) =>
    x["start"] === y["start"] && x["end"] === y["end"];

  // this function check if selections has already a selection where it overlaps exisitng
  function check_overlap(selections, s1) {
    if (selections.length === 0) {
      return false;
    }
    for (let i = 0; i < selections.length; i++) {
      let c1 =
        selections[i]["start"] <= s1["start"] &&
        selections[i]["end"] >= s1["end"];
      // let c2 = selections[i]["start"] >= s1["start"] && selections[i]["end"] <= s1["end"];
      if (c1) {
        return true;
      }
    }
    return false;
  }

  // returns true or false
  // true if highlight array has an object in it
  // to avoid duplicates
  const contains = (dictOfHighlights, obj) => {
    for (let i = 0; i < dictOfHighlights.length; i++) {
      // check for overlap
      let overlap =
        dictOfHighlights[i]["start"] <= obj["start"] &&
        dictOfHighlights[i]["end"] >= obj["end"];
      if (compare_indexes(dictOfHighlights[i], obj) || overlap) {
        return true;
      }
    }

    return false;
  };

  const indexOf = (dictOfHighlights, obj) => {
    for (let i = 0; i < dictOfHighlights.length; i++) {
      if (compare_indexes(dictOfHighlights[i], obj)) {
        return i;
      }
    }

    return -1;
  };
  // when count changes it will update the exisiting highlights
  // when highlight as an array is given to this Text Field
  // it will check if array exsits if so then it will call loadData()
  // loadData() is async function will marks the highlights 1 by 1
  useLayoutEffect(() => {
    if (highlightIndeces && highlightIndeces.length > 0) {
      loadData();
    }
  }, [count]);

  async function handleSelectionChange(event) {
    // this function will return the indecies that were highlighted
    // this is async function which then is used to go in pipeline form
    // so that onces it returns the function value we can use that value to push it on the bookmark stack
    return highLight(
      event,
      children,
      variant,
      theme["highLightColor"],
      text,
      isFirstHighlighted,
      setisFirstHighlighted,
      setText
    );
  }

  // children is orignal text
  async function highLightWithRange(indexRange) {
    await highLight(
      undefined,
      children,
      variant,
      theme["highLightColor"],
      text,
      isFirstHighlighted,
      setisFirstHighlighted,
      setText,
      indexRange
    );
  }
  return (
    <TextInput
      style={{ color: theme["color"], ...style }}
      editable={Platform.OS !== "ios"}
      accessibilityLabel={accessibilityLabel}
      selectTextOnFocus={true}
      accessibilityRole="text"
      onSelectionChange={(e) => {
        handleSelectionChange(e)
          .then((obj) => {
            // this checks if the return value is valid
            // if it is {start, end} then we will use that value to push it on the stack
            if (obj) {
              // if the its undefined to avoid the error we will create new empty list
              // this case is very unlikely to hit because most of the properites are already added in LessonHighlights.js file
              if (!highlightIndeces) {
                highlightIndeces = [];
              }
              // if the new element does not exist then push it on the stack
              // but if the element exist in the hight we should remove it so that it removes the highlight as well
              if (!contains(highlightIndeces, obj)) {
                highlightIndeces.push(obj);
                // if (lessonName && lessonName.includes("Search")) {
                //   searching_algorithms_highlights[lessonName][
                //     "wasModified"
                //   ] = true;
                // } else if (lessonName && lessonName.includes("Sort")) {
                //   console.log("This is Sorting Algorithm");
                // } else {
                //   console.log("This is Data Structure");
                // }
              } else {
                // remove obj from highlightindeces so that it wont highlight the string
                // pass the obj which is what we want to remove
                // the second parameter 1 means that we only need to remove that element occurance onces only
                let obj_index = indexOf(highlightIndeces, obj);
                if (obj_index !== -1) highlightIndeces.splice(obj_index, 1);
              }

              // update user highlights
              if (user && user._id) {
                const ref = doc(DB, "highlights", user.highlights_id);
                if (ref) {
                  if (lessonName.includes("Search")) {
                    updateDoc(ref, {
                      searching_algorithms_highlights: JSON.stringify(
                        user.searching_algorithms_highlights
                      ),
                    });
                  } else if (lessonName.includes("Sort")) {
                    updateDoc(ref, {
                      sorting_algorithms_highlights: JSON.stringify(
                        user.sorting_algorithms_highlights
                      ),
                    });
                  } else {
                    updateDoc(ref, {
                      datastructures_highlights: JSON.stringify(
                        user.datastructures_highlights
                      ),
                    });
                  }
                } else {
                  console.log("Couldnt upldate highlights");
                }

                // updateDocument("highlights", user.highlights_id, {
                //   datastructures_highlights: JSON.stringify(
                //     user.datastructures_highlights ?? {}
                //   ),
                //   searching_algorithms_highlights: JSON.stringify(
                //     user.searching_algorithms_highlights ?? {}
                //   ),
                //   sorting_algorithms_highlights: JSON.stringify(
                //     user.sorting_algorithms_highlights ?? {}
                //   ),
                // });
              }
            }
          })
          .catch((er) => {
            // print error
            console.log(
              "Error Highlight MyText.js in HandleSelection Event ",
              er
            );
          });
      }}
      multiline={true}
      scrollEnabled={false}
      selectionColor={theme["highLightColor"]} // Change selection color if needed
    >
      <Text variant={variant} style={{ color: theme["color"] }}>
        {text}
      </Text>
    </TextInput>
  );
}
