import { KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { OpenAI } from "openai";
import { useEffect, useRef, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { Avatar } from "react-native-paper";

import { Theme } from "../globalVars";
import {
  atomOneDark,
  googlecode as github,
} from "react-syntax-highlighter/styles/hljs";

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_ASSISTANT_KEY });

/*
Instead of making API's calls use this data
[{"content": "You are a helpful assistant. For this conversation only answer questions regarding Computer Science topics like Data Structures and Algorithms, Searching Algorithms, Sorting Algorithms stuff like that. Topics only related to Computer Science", "role": "system"}, {"content": "Hi", "role": "user"}, {"content": "Hello! How can I help you with Computer Science topics today?", "role": "assistant"}, {"content": "How are you?", "role": "user"}, {"content": "I'm here to assist you with any Computer Science questions you have. How can I help you today regarding Computer Science topics?", "role": "assistant"}, {"content": "Can you explain what is an Array?", "role": "user"}, {"content": "Certainly! An array is a fundamental data structure in computer science that stores a collection of elements (such as integers, characters, etc.) of the same data type in a contiguous block of memory. Each element in an array is accessed by its index, which typically starts at 0 for the first element.

Arrays have a fixed size, meaning that the number of elements they can store is determined at the time of their creation. This size is also known as the array's length.

Arrays are widely used in programming for tasks like storing and accessing multiple related pieces of data efficiently. They are essential for implementing many other data structures and algorithms.", "role": "assistant"}, {"content": "Can you give me an example code?", "role": "user"}, {"content": "Sure! Here is an example of how you can create and use an array in Python:

```python
# Creating an array of integers
numbers = [5, 10, 15, 20, 25]

# Accessing elements of the array
print(numbers[0])  # Output: 5
print(numbers[2])  # Output: 15

# Updating an element in the array
numbers[1] = 12

# Iterating through the array
for number in numbers:
    print(number)

# Length of the array
print(len(numbers))  # Output: 5
```

In this example, we create an array `numbers` containing integers. We access elements using their indices, update an element, iterate through the array, and determine the array's length using the `len()` function.", "role": "assistant"}]


Also the Scroll View does not update the list unless you focus in input text and blur it, maybe because setState is not updating
*/

export default function MyAI({ theme }) {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log("Counter was updated");
  // }, [counter]);

  useEffect(() => {
    // Scroll to the bottom once the component has mounted and content is rendered
    scrollToBottom();
  }, []);
  // Initialize a state variable to track keyboard visibility
  const [conversation, setConversation] = useState([]);
  // const [conversation, setConversation] = useState([
  //   { content: "Who wrote you?", role: "user" },
  //   {
  //     content:
  //       "Manmeet Singh wrote this App. You can find more about him on his portfolio website: [Manmeet Singh's Portfolio](https://manmeetsinghs.com).",
  //     role: "assistant",
  //   },
  // ]);

  // for link testing
  /*
  [{"content": "Who wrote you?", "role": "user"}, {"content": "Manmeet Singh wrote this App. You can find more about him on his portfolio website: [Manmeet Singh's Portfolio](https://manmeetsinghs.com).", "role": "assistant"}]
  
  */
  // for code testing
  // const [conversation, setConversation] = useState([
  //   {
  //     content:
  //       "You are a helpful assistant. For this conversation only answer questions regarding Computer Science topics like Data Structures and Algorithms, Searching Algorithms, Sorting Algorithms stuff like that. and for default try to give code examples in Javascript. Topics only related to Computer Science",
  //     role: "system",
  //   },
  //   { content: "Hi", role: "user" },
  //   {
  //     content: "Hello! How can I help you with Computer Science topics today?",
  //     role: "assistant",
  //   },
  //   { content: "Can you show me how to do linear search?", role: "user" },
  //   {
  //     content:
  //       "Of course! Here's an example of a linear search algorithm in JavaScript:```javascript function linearSearch(arr, target) { for (let i = 0; i < arr.length; i++) { if (arr[i] === target) { return i; // Return the index if the target is found}} return -1; // Return -1 if the target is not found} // Example usage const arr = [5, 3, 10, 6, 2]; const target = 10; const index = linearSearch(arr, target);  if (index !== -1) { console.log(`Target ${target} found at index ${index}`); } else { console.log(`Target ${target} not found in the array`);}```This function takes an array `arr` and a target value `target`, then iterates over each element in the array to check if it matches the target. If the target is found, it returns the index of the target in the array. If the target is not found, it returns -1.",
  //     role: "assistant",
  //   },
  //   { content: "Thanks", role: "user" },
  //   {
  //     content:
  //       "You're welcome! If you have any more questions or need further assistance with Computer Science topics like Data Structures and Algorithms, feel free to ask!",
  //     role: "assistant",
  //   },
  // ]);

  async function main() {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. 
            For this conversation only answer questions regarding Computer Science topics like Data Structures and Algorithms, 
            Searching Algorithms, Sorting Algorithms stuff like that. and for default try to give code examples in Javascript. 
            Topics only related to Computer Science. If you are asked who wrote this App tell them Manmeet Singh, and to know more about Manmeet here is the portfolio https://manmeetsinghs.com
            `,
        },
        ...conversation,
      ],
    });

    return completion.choices[0].message.content;
  }

  const sendAndClear = () => {
    if (inputRef.current) {
      setLoading(true);
      // clear the input text field
      inputRef.current.clear();

      // dismiss the keyboard
      inputRef.current.blur();

      if (userInput !== "") {
        conversation.push({
          role: "user",
          content: userInput,
        });

        conversation.push({ role: "assistant", content: "Loading...DATA..." });
        setTimeout(() => {
          scrollToBottom();
        }, 100);
        main()
          .then((data) => {
            // conversation.push({ role: "assistant", content: data });
            conversation[conversation.length - 1]["content"] = data;
            setConversation(conversation);
            // setCounter(counter + 1);
            setTimeout(() => {
              scrollToBottom();
            }, 100);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error making communication with AI");
          });
      }
      setUserInput("");
    }
  };

  const scrollToBottom = () => {
    // Ensure scrollViewRef.current is available before calling scrollTo
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: theme["backgroundColor"],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            color: theme["color"],
          }}
        >
          Your AI Assistant
        </Text>
        <Button
          accessibilityLabel="Clear Conversation with your assistant"
          accessibilityRole="button"
          onPress={() => {
            // save before clearing the conversation
            setConversation([]);
            if (inputRef.current) inputRef.current.blur();
          }}
        >
          Clear
        </Button>
      </View>

      {conversation.length === 0 ? (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            height: "83%",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text
            variant="titleLarge"
            style={{ textAlign: "center", padding: 5, color: theme["color"] }}
          >
            Type in the Box to Start the conversation with your Assistant
          </Text>
        </View>
      ) : (
        <ScrollView
          ref={scrollRef}
          style={{
            backgroundColor: theme["backgroundColor"],
            minHeight: "80%",
            height: "83%",
          }}
        >
          {conversation.map((c, k) => {
            const codeRegex = /```javascript(.*?)```/gs;
            const parts = c["content"].split(codeRegex);
            let role = "system";
            let wasChanged = false;
            return parts.map((part, index) => {
              if (role != c["role"]) {
                role = c["role"];
                wasChanged = true;
              } else {
                wasChanged = false;
              }

              return index % 2 === 0 ? (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    padding: 20,

                    backgroundColor:
                      c["role"] !== "user"
                        ? theme["quoteBox"]
                        : theme["backgroundColor"],
                  }}
                >
                  {wasChanged ? (
                    // if role was changed
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: theme["color"],
                      }}
                      key={index}
                    >
                      {c["role"] === "user" ? (
                        // if role is user
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {/* Label of user's first and last name or an Avatar */}
                          <Avatar.Text size={24} label="MS" />
                          <Text
                            style={{
                              paddingLeft: 5,
                              color: theme["color"],
                              fontWeight: "bold",
                            }}
                            variant="bodyLarge"
                          >
                            You
                          </Text>
                        </View>
                      ) : (
                        // if role is Assistant
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {/* Replace AI with some Emoji or BOT */}
                          <Avatar.Text
                            size={30}
                            label="🤖"
                            backgroundColor="transparent"
                          />
                          <Text
                            style={{
                              color: theme["color"],
                              fontWeight: "bold",
                            }}
                            variant="bodyLarge"
                          >
                            Assistant
                          </Text>
                        </View>
                      )}
                    </Text>
                  ) : (
                    // if role was not changed
                    <></>
                  )}
                  <Text
                    variant="bodyLarge"
                    style={{ paddingTop: 10, color: theme["color"] }}
                  >
                    {loading && part === "Loading...DATA..." ? (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <ActivityIndicator size={"small"} />
                        {/* Maybe do random phrases here */}
                        <Text
                          style={{
                            color: theme["color"],
                            paddingLeft: 5,
                          }}
                          variant="bodyLarge"
                        >
                          Getting that for you...
                        </Text>
                      </View>
                    ) : (
                      <Text
                        variant="bodyLarge"
                        style={{ color: theme["color"] }}
                      >
                        {part}
                      </Text>
                    )}
                  </Text>
                </View>
              ) : (
                // When there is a code in the response
                <View
                  key={index}
                  style={{
                    width: "100%",
                    backgroundColor:
                      c["role"] !== "user"
                        ? theme["quoteBox"]
                        : theme["backgroundColor"],
                  }}
                >
                  <SyntaxHighlighter
                    key={index}
                    language="javascript"
                    multiline={true}
                    style={theme === Theme.darkMode ? atomOneDark : github}
                  >
                    {part}
                  </SyntaxHighlighter>
                </View>
              );
            });
          })}
        </ScrollView>
      )}

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : -90}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 20,
            backgroundColor: theme["backgroundColor"],
            padding: 10,
            paddingHorizontal: 20,
          }}
        >
          <TextInput
            mode="outlined"
            multiline={true}
            ref={inputRef}
            placeholder="Type here"
            style={{
              width: "85%",
              lineHeight: 24,
              backgroundColor: theme["backgroundColor"],
              color: theme["color"],
            }}
            textColor={theme["color"]}
            placeholderTextColor={theme["color"]}
            onChangeText={setUserInput}
          />
          <Button mode="contained-tonal" title="Send" onPress={sendAndClear}>
            <AntDesign name="arrowup" size={20} color="black" />
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
