import { Text } from "react-native-paper";
const uniqid = (start, end) => {
  return (
    Math.random().toString(36).substring(start, end) +
    start +
    end +
    Math.random()
  );
};
const highLightSingleWord = (children, start, end, variant, color) => {
  let before = children.substring(0, start);
  let word = children.substring(start, end);
  let after = children.substring(end, children.length);
  let all = [];

  // if (!before.endsWith(" ")) before = before + " ";
  if (before.trim() !== "") all.push(before);

  all.push(
    <Text
      key={uniqid(start, end)}
      variant={variant}
      style={{ color: color, fontWeight: "500" }}
    >
      {word}
    </Text>
  );

  if (after.trim() !== "") all.push(after);
  return all;
};

export function highlight_withIndex(
  indecies,
  text,
  originalText,
  isFirstHighlighted,
  setisFirstHighlighted,
  setText
) {
  let all = [];
  let finilazied = [];
  const { start, end } = indecies;
  if (start !== end) {
    /*
        1st highlight -> when I have <Text /> object only
        Nth -> When I have list of <Text/> inside that list I will have String and <Text/> only
      */
    // console.log("1st High ", text, highLightCount);
    if (isFirstHighlighted) {
      setisFirstHighlighted(false);
      setText(highLightSingleWord(text, start, end, "bodyLarge"));
    } else {
      let variant = "bodyLarge";
      // highlight text after the 1st Highlight
      let str = originalText.substring(start, end);

      if (text && text.length > 0) {
        text.map((child, index) => {
          let type = typeof child;
          // if type is an object that means its already highlighted
          // if its string then we need to find the substring and highlight
          if (child && type === "string" && child.includes(str)) {
            let index = child.indexOf(str);
            let before = child.substring(0, index);
            let after = child.substring(index + str.length, child.length);
            if (str.endsWith(" ")) {
              str = child.substring(index, index + str.length - 1);
              after = " " + after;
            }
            if (before !== null || before.trim() !== "") {
              all.push(before);
            }
            if (str !== null || str.trim() !== "") {
              all.push(
                <Text
                  key={uniqid(start, end)}
                  variant={variant}
                  style={{ color: "red" }}
                >
                  {str}
                </Text>
              );
            }
            if (after !== null || after.trim() !== "") {
              all.push(after);
            }
          } else {
            // remove highlight

            // if its an object then it is already highlighted
            if (child && type === "object") {
              // if the highlighted text includes the substring we are trying to unhighligh
              if (
                child.props &&
                child.props.children &&
                child.props.children.trim() === str.trim()
              ) {
                let t = child.props.children; // extract the <Text> to text
                let index = t.indexOf(str); // get the index of the string we are trying to unhighlight
                let before = t.substring(0, index); // what's before that string should remain same
                let after = t.substring(index + str.length, t.length); // whats inside the str is unhighlighted and after
                if (str.endsWith(" ")) {
                  str = str.trim();
                  after = " " + after;
                }
                if (before !== null || before.trim() !== "") {
                  all.push(
                    <Text
                      key={uniqid(start, end)}
                      variant={variant}
                      style={{ color: "red" }}
                    >
                      {before}
                    </Text>
                  );
                }
                if (str !== null || str.trim() !== "") {
                  all.push(str);
                }
                if (after !== null || after.trim() !== "") {
                  all.push(
                    <Text
                      key={uniqid(start, end)}
                      variant={variant}
                      style={{ color: "red" }}
                    >
                      {after}
                    </Text>
                  );
                }
              } else {
                if (child) {
                  all.push(child);
                }
              }
            } else {
              all.push(child);
            }
          }

          // this will sanitize and join the strings together
          finilazied = [];
          let s = "";
          for (let e of all) {
            if (typeof e === "string") {
              if (e.trim() !== "") {
                s += e;
              }
            } else {
              if (s.trim() !== "") {
                finilazied.push(s);
                s = "";
              }

              let x = e.props.children;
              if (x.trim() !== "") {
                finilazied.push(e);
              }
            }
          }
          if (s.trim() !== "") {
            finilazied.push(s);
            s = "";
          }
        });
      }
    }
  }
  setText(finilazied);
}

export async function highLight(
  event,
  children,
  variant,
  highlightColor,
  text,
  isFirstHighlighted,
  setisFirstHighlighted,
  setText,
  indexRange
) {
  let { start, end } = {};
  if (event === undefined && indexRange !== undefined) {
    start = indexRange["start"];
    end = indexRange["end"];
  } else {
    start = event.nativeEvent.selection["start"];
    end = event.nativeEvent.selection["end"];
  }
  let all = [];
  let finilazied = [];
  if (start !== end) {
    /*
        1st highlight -> when I have <Text /> object only
        Nth -> When I have list of <Text/> inside that list I will have String and <Text/> only
      */
    // console.log("1st High ", text, highLightCount);
    let str = children.substring(start, end);
    if (str.split(" ").length > 2) {
      if (isFirstHighlighted) {
        setText(
          highLightSingleWord(children, start, end, variant, highlightColor)
        );

        setisFirstHighlighted(false);

        return { start: start, end: end };
      } else {
        // highlight text after the 1st Highlight
        all = [];
        if (text && text.length > 0) {
          text.map((child, index) => {
            let type = typeof child;
            // if type is an object that means its already highlighted
            // if its string then we need to find the substring and highlight
            if (child && type === "string" && child.includes(str)) {
              let index = child.indexOf(str);
              let before = child.substring(0, index);
              let after = child.substring(index + str.length, child.length);
              // console.log(
              //   before,
              //   before === "",
              //   before === " ",
              //   before.trim() === ""
              // );
              // console.log(str);
              // console.log(after);

              // if (str.endsWith(" ")) {
              //   str = child.substring(index, index + str.length - 1);
              //   after = " " + after;
              // }
              // if (before.trim() === "" && start !== 0 && str[0] !== " ") {
              //   str = " " + str;
              // }

              // if both of the strings are empty
              // then we have str which is what is selected from the user
              // we must add some space in end
              if (
                before.trim() === "" &&
                after.trim() === "" &&
                !str.endsWith(" ")
              ) {
                str += " ";
              }

              // a case when str is selected and before the start selection there is space present
              // the space character was removed after the selection
              // so this will add a space
              if (before === " ") {
                str = " " + str;
              }
              // a case when abcd string is given andf cd is to select and before after are empty

              if (before !== null || before.trim() !== "") {
                all.push(before);
              }
              if (str !== null || str.trim() !== "") {
                all.push(
                  <Text
                    key={uniqid(start, end)}
                    variant={variant}
                    style={{ color: highlightColor, fontWeight: "500" }}
                  >
                    {str}
                  </Text>
                );
              }
              if (after !== null) {
                all.push(after);
              }
            } else {
              // remove highlight

              // if its an object then it is already highlighted
              if (child && type === "object") {
                // if the highlighted text includes the substring we are trying to unhighligh
                if (
                  child.props &&
                  child.props.children &&
                  child.props.children.trim() === str.trim()
                ) {
                  let t = child.props.children; // extract the <Text> to text
                  let index = t.indexOf(str); // get the index of the string we are trying to unhighlight
                  let before = t.substring(0, index); // what's before that string should remain same
                  let after = t.substring(index + str.length, t.length); // whats inside the str is unhighlighted and after

                  if (before !== null || before.trim() !== "") {
                    all.push(before);
                  }
                  if (str !== null || str.trim() !== "") {
                    all.push(str);
                  }
                  if (
                    after !== null ||
                    (after.trim() !== "" &&
                      str.endsWith(str[-1]) !== after.endsWith(after[-1]))
                  ) {
                    all.push(after);
                  }
                } else {
                  if (child) {
                    all.push(child);
                  }
                }
              } else {
                all.push(child);
              }
            }

            // this will sanitize and join the strings together
            finilazied = [];
            let s = "";
            for (let e of all) {
              if (typeof e === "string") {
                if (e.trim() !== "") {
                  s += e;
                }
              } else {
                if (s.trim() !== "") {
                  finilazied.push(s);
                  s = "";
                }

                let x = e.props.children;
                if (x.trim() !== "") {
                  finilazied.push(e);
                }
              }
            }
            if (s.trim() !== "") {
              finilazied.push(s);
              s = "";
            }
            setText(finilazied);
          });
        }
      }
      return { start: start, end: end };
    }
  }
}
