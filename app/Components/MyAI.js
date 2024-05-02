import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Markdown from "react-native-markdown-display";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { fullScreen, questionAI, Theme } from "../globalVars";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/styles/hljs";
import GenAi, { clearChat } from "../Util/GenAi";
import { imageToText } from "../Util/ImageAi";
import { PickPhoto, takePhoto } from "./MyImagePicker";
import { updateDocument, user } from "../Util/User";
import { CachedImage } from "../CustomComponents/CachedImage";
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

const UserAvatar = () => {
  if (user.avatar !== null) {
    return (
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 22, height: 22, borderRadius: 50 }}
      />
    );
  }
  return <Avatar.Text size={24} label={user.name_initials} />;
};

const Convo = ({ c, k1, index, wasChanged, part, theme, loading }) => (
  <View
    style={{
      padding: 20,
      backgroundColor:
        c["role"] !== "user" ? theme["quoteBox"] : theme["backgroundColor"],
    }}
  >
    {/* this is the title who ever of user or assistant */}
    {wasChanged && (
      <Text
        style={{
          fontWeight: "bold",
          color: theme["color"],
        }}
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

            <UserAvatar />

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
            <Avatar.Text size={30} label="🤖" backgroundColor="transparent" />
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
    )}

    {/* This is the response */}

    {loading && part === "Loading...DATA..." ? (
      // If data is still loading -> show loader
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
    ) : // response from assistant
    c["role"] !== "user" ? (
      <Markdown
        key={k1 + Math.random() * index + Math.random() + index}
        style={{
          heading1: {
            color: theme["color"],
            // fontSize: 24,
          },
          paragraph: {
            color: theme["color"],
            // fontSize: 22,
          },
          // Define styles for other Markdown elements as needed
        }}
      >
        {part}
      </Markdown>
    ) : (
      <Text
        key={k1 + Math.random() * index + Math.random()}
        variant="bodyLarge"
        style={{
          paddingTop: 10,
          color: theme["color"],
        }}
      >
        {part}
      </Text>
    )}
  </View>
);

const ConvoCode = ({ c, k, index, part, theme }) => (
  // When there is a code in the response
  <View
    key={k * index}
    style={{
      width: "100%",
      backgroundColor:
        c["role"] !== "user" ? theme["quoteBox"] : theme["backgroundColor"],
    }}
  >
    <SyntaxHighlighter
      language="javascript"
      multiline={true}
      // sync theme with quoteBox and backgroundColor
      style={theme === Theme.darkMode ? atomOneDark : atomOneLight}
      customStyle={{
        marginHorizontal: 10,
        borderRadius: 10,
      }}
    >
      {part.replace(/^(.*?)\n/, "")}
    </SyntaxHighlighter>
  </View>
);

export function RenderChat({ conversation, theme, loading }) {
  if (conversation)
    return conversation.map((c, k) => {
      if (c["type"] !== undefined && c["type"] === "image") {
        return <RenderImage key={k} imageData={c["content"]} />;
      }
      // if role wasnt changed then this will help avoid redundent Text rendering
      // parsing the code out of message as it is bounded by ``` code ```
      const codeRegex = /```(.*?)```/gs;
      const parts = c["content"].split(codeRegex);

      // if role wasnt changed then this will help avoid redundent Text rendering
      let role = "system";
      let wasChanged = false;
      return parts.map((part, index) => {
        // update role status
        if (role != c["role"]) {
          role = c["role"];
          wasChanged = true;
        } else {
          wasChanged = false;
        }

        return index % 2 === 0 ? (
          <Convo
            key={index}
            c={c}
            k1={k}
            index={index}
            wasChanged={wasChanged}
            part={part}
            theme={theme}
            loading={loading}
          />
        ) : (
          <ConvoCode
            key={index}
            c={c}
            index={index}
            part={part}
            theme={theme}
          />
        );
      });
    });
}
const RenderImage = ({ imageData }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
        borderRadius: 20,
        shadowColor: "black",
        shadowRadius: 10,
        shadowOpacity: 0.2,
        marginTop: 10,
      }}
    >
      <Image
        style={{
          borderRadius: 20,
          width: fullScreen["width"] - fullScreen["width"] / 6,
          height: fullScreen["height"] - fullScreen["height"] / 1.5,
        }}
        source={{
          uri: imageData["uri"],
        }}
      />
    </View>
  );
};

export default function MyAI({ navigator, theme }) {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  // const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(null);

  // load GenAi here for testing
  useEffect(() => {
    // fallback case if quesionAI is undefined but it will not be
    if (questionAI == undefined) questionAI = [];
    // Scroll to the bottom once the component has mounted and content is rendered
    // scrollToBottom();
  }, []);

  const sendAndClear = (prompt) => {
    if (inputRef.current) {
      setLoading(true);
      // clear the input text field
      inputRef.current.clear();

      // dismiss the keyboard
      inputRef.current.blur();

      if (prompt !== "") {
        conversation.push({
          role: "user",
          content: prompt,
        });

        if (image !== null) {
          conversation.push({
            role: "user",
            content: image,
            type: "image",
          });
          setConversation(conversation);
        }
        if (
          conversation[conversation.length - 1]["content"] !==
          "Loading...DATA..."
        ) {
          conversation.push({ role: "model", content: "Loading...DATA..." });
        }

        setTimeout(() => {
          scrollToBottom();
        }, 100);

        if (image !== null) {
          sendImageToModel(image, prompt);
          setImage(null);
        } else {
          GenAi({ msg: prompt })
            .then(async (res) => {
              conversation[conversation.length - 1]["content"] = res;
              setConversation(conversation);
              setLoading(false);
              setTimeout(() => {
                scrollToBottom();
              }, 100);
            })
            .catch((er) => {
              console.log(er);
            });
        }
      }
      setUserInput("");
    }
  };

  const sendImageToModel = (imageData, userInput) => {
    imageToText(imageData["base64"], imageData["mimeType"], userInput)
      .then(async (res) => {
        conversation[conversation.length - 1]["content"] = res;
        setConversation(conversation);
        setLoading(false);
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  // when text message is pushed on to the converstaion array
  // it should render and scroll down to screen to keep track of the view
  const scrollToBottom = () => {
    // Ensure scrollViewRef.current is available before calling scrollTo
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleCaptureImage = () => {
    Alert.alert("Pick a photo", "Take a photo or pick a phot from gallery", [
      {
        text: "Take Photo",
        onPress: () => {
          takePhoto()
            .then((data) => {
              if (data !== null) {
                setImage(data);
              }
            })
            .catch((er) => console.log(er));
        },
      },
      {
        text: "Pick from Photos",
        onPress: () => {
          PickPhoto()
            .then((data) => {
              if (data !== null) {
                setImage(data);
              }
            })
            .catch((er) => console.log(er));
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const TopTitle = () => (
    <View>
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

        {/* Button to take photo and feed to model */}
        <Button mode="outlined" title="Camera" onPress={handleCaptureImage}>
          <AntDesign name="camera" size={20} color={theme["color"]} />
        </Button>

        {/* Button for Chat icon which on click shows recent chats */}
        <Button
          mode="outlined"
          title="Chat"
          onPress={() => {
            navigator.navigate("Chat history - AI");
          }}
        >
          <MaterialCommunityIcons
            name="chat-outline"
            size={20}
            color={theme["color"]}
          />
        </Button>
      </View>
      {/* Button for clear conversation and then it saves it */}
      <Button
        style={{ alignSelf: "flex-end", marginHorizontal: 10 }}
        accessibilityLabel="Clear Conversation with your assistant"
        accessibilityRole="button"
        disabled={conversation.length === 0}
        onPress={() => {
          // save before clearing the conversation
          if (inputRef.current) inputRef.current.blur();
          setTimeout(() => {
            user.chat_history.push(conversation);
            // update database with history
            if (user && user._id) {
              updateDocument("chat_history", user.chat_history_id, {
                chat_history: user.chat_history.map((e) => {
                  if (typeof e === "string") {
                    return e;
                  } else {
                    return JSON.stringify(e);
                  }
                }),
              });
            }

            setConversation([]);
            // setCounter(0);
            clearChat();
          }, 100);
        }}
      >
        <Text style={{ color: theme["color"] }}>Clear</Text>
      </Button>
    </View>
  );

  const NoConversationScreen = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme["backgroundColor"],
          alignContent: "center",
          alignSelf: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", padding: 5, color: theme["color"] }}
        >
          Type in the Box to Start the conversation with your Assistant
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {questionAI.map((eachQuestion, k) => (
            <TouchableOpacity
              key={eachQuestion}
              style={{
                borderRadius: 10,
                padding: 10,
                margin: 10,
                backgroundColor: theme["quoteBox"],
              }}
              onPress={() => {
                sendAndClear(eachQuestion);
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: theme["color"],
                }}
              >
                {eachQuestion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // this to focus on keyboard when image is selected

  useLayoutEffect(() => {
    if (image !== null) {
      inputRef.current.focus();
    }
  }, [image]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme["backgroundColor"],
        height: "100%",
      }}
      onTouchStart={() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
    >
      {/* Top Bar shows Title and Clear button */}
      <TopTitle />

      {/* When user has selected an image to ask AI for prompt */}
      {image !== null ? (
        <ScrollView
          ref={scrollRef}
          style={{
            backgroundColor: theme["backgroundColor"],
            ...fullScreen,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-end",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              padding: 10,
              marginHorizontal: 20,
              backgroundColor: theme["quoteBox"],
              position: "absolute",
              right: 20,
              top: 25,
              zIndex: 1,
              borderRadius: 50,
            }}
            onPress={() => {
              setImage(null);
            }}
          >
            <MaterialIcons name="delete-outline" size={24} color="red" />
          </TouchableOpacity>
          <RenderImage imageData={image} />
          <Text
            style={{ textAlign: "center", color: theme["color"] }}
            variant="bodyMedium"
          >
            Write your Prompt for this Image
          </Text>
        </ScrollView>
      ) : conversation.length === 0 ? (
        // if there is no conversation initiated then show this message below
        <NoConversationScreen />
      ) : (
        // if there is a converstation then this view is being rendered
        <ScrollView
          ref={scrollRef}
          style={{
            backgroundColor: theme["backgroundColor"],
            ...fullScreen,
          }}
        >
          <RenderChat
            conversation={conversation}
            theme={theme}
            loading={loading}
            key={Math.random() * Math.random()}
          />
        </ScrollView>
      )}

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -90}
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
            blurOnSubmit={true}
            textColor={theme["color"]}
            placeholderTextColor={theme["color"]}
            onChangeText={setUserInput}
          />
          <Button
            mode="contained-tonal"
            title="Send"
            onPress={() => {
              sendAndClear(userInput);
            }}
            disabled={userInput === ""}
          >
            <AntDesign
              name="arrowup"
              size={20}
              color={userInput !== "" ? "black" : "white"}
            />
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
