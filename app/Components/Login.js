import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  Text,
  Button,
  Divider,
  MD2Colors,
} from "react-native-paper";
import { FIREBASE_AUTH } from "../FireBase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DB } from "../FireBase/firebase";

import { fullScreen } from "../globalVars";
import { setUser } from "../Util/User";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  datastructures_highlights,
  lesson_bookmarks,
  searching_algorithms_highlights,
  sorting_algorithms_highlights,
} from "../Data/LessonHighlights";
import { chat_history } from "../Util/GenAi";

export default function AuthPage({ setShowSignupPage }) {
  // log in user when action is triggered after form submission
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (user !== null) {
        // move to next scene
        setShowSignupPage(false);
      }
    });
  }, []);

  const signupWithEmailPwd = async (email, pwd) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        pwd
      );

      // insert user into collection of Database
      // user and it's properties
      try {
        // initializing user highlights into database
        const highlightsRef = await addDoc(collection(DB, "highlights"), {
          searching_algorithms_highlights: JSON.stringify(
            searching_algorithms_highlights
          ),
          sorting_algorithms_highlights: JSON.stringify(
            sorting_algorithms_highlights
          ),
          datastructures_highlights: JSON.stringify(datastructures_highlights),
        });

        const bookmarksRef = await addDoc(collection(DB, "bookmarks"), {
          lesson_bookmarks: lesson_bookmarks,
        });

        // user preference settings and properties
        const user_preferenceRef = await addDoc(
          collection(DB, "user_preference"),
          {
            theme_mode: "LIGHT",
          }
        );

        const chat_historyRef = await addDoc(collection(DB, "chat_history"), {
          chat_history: chat_history,
        });

        // create a new document in collection called users and then name that document the user id
        const newDoc = doc(DB, "users", response.user.uid);
        // set creates a new document and replaces if exists, we want to replace it because this is unique to each user
        await setDoc(
          newDoc,
          {
            id: response.user.uid,
            email: response.user.email,
            highlights_id: highlightsRef.id,
            bookmarks_id: bookmarksRef.id,
            user_preference_id: user_preferenceRef.id,
            chat_history_id: chat_historyRef.id,
            avatar: null,
            XP: 0,
            quiz_attempts: 0,
            quiz_passed: 0,
            quiz_scores: [],
          },
          { merge: true }
        );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (er) {
      alert(`Unable to create new account.\n${er.code}`);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailPwd = async (email, pwd) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        pwd
      );
    } catch (er) {
      alert(`Unable to login.\n${er.code}`);
    } finally {
      setLoading(false);
    }
  };

  // store user credentials
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  // is server loading the information
  const [loading, setLoading] = useState(false);

  // a button is used to change this state making password visible
  const [securePWD, setSecurePWD] = useState(true);

  // const [rememberMe, setRememberMe] = useState(true);
  let isFormValid = !(loading || pwd.length < 8 || username.length <= 4);
  return (
    <ImageBackground
      resizeMode="cover"
      style={{ zIndex: 1 }}
      source={require("../../assets/banner2.gif")}
    >
      <View
        style={{
          ...fullScreen,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: Platform.OS === "ios" ? 120 : 80,
        }}
      >
        <View
          style={{
            margin: 20,
            gap: 20,
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Text
            variant="headlineMedium"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              paddingVertical: 20,
            }}
          >
            Authenticate into Algorithmic Insights 🪬
          </Text>
          <Text style={{ textAlign: "center", color: "gray" }}>
            A Simplified Portal for Nerds
          </Text>
          <TextInput
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              textDecorationLine: "none",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              borderColor: "transparent",
              borderWidth: 0,
              borderBottomWidth: 0,
            }}
            underlineColor="transparent"
            underlineStyle={{ width: 0 }}
            textColor={"black"}
            placeholderTextColor={MD2Colors.white}
            mode="flat"
            inputMode="email"
            label="Email address"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <TextInput
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              textDecorationLine: "none",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              borderColor: "transparent",
              borderWidth: 0,
              borderBottomWidth: 0,
            }}
            underlineColor="transparent"
            underlineStyle={{ width: 0 }}
            textColor={"black"}
            placeholderTextColor={"black"}
            label="Password"
            value={pwd}
            onChangeText={(text) => setPwd(text)}
            secureTextEntry={securePWD}
            right={
              pwd.length > 0 && (
                <TextInput.Icon
                  icon={"eye"}
                  onPressIn={() => setSecurePWD(false)}
                  onPressOut={() => setSecurePWD(true)}
                />
              )
            }
          />
        </View>
        {/* Set remember me check box - but firebase handles this logic automatically now */}
        {/* <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            margin: 20,
            paddingBottom: 20,
            gap: 10,
          }}
        >
          <View
            style={{
              borderColor: "rgba(0,0,0,0.1)",
              borderWidth: 0.8,
              borderRadius: 10,
            }}
          >
            <Checkbox
              color="white"
              status={rememberMe ? "checked" : "unchecked"}
              onPress={() => {
                setRememberMe(!rememberMe);
              }}
            />
          </View>
          <Text
            variant="bodyMedium"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Remember me for next time
          </Text>
        </View> */}
        {/* <TouchableOpacity onPress={() => alert("Forgot Password feature")}>
            <Text
              variant="labelMedium"
              style={{
                paddingHorizontal: 30,
                marginBottom: 10,
                textAlign: "left",
                fontWeight: "500",
                color: "white",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity> */}

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-around",
            width: "100%",
            alignContent: "space-around",
          }}
        >
          <Button
            disabled={!isFormValid}
            style={{
              width: "40%",
              backgroundColor: isFormValid ? MD2Colors.purple400 : "black",
              opacity: isFormValid ? 1 : 0.7,
            }}
            mode="contained"
            accessibilityLabel="Signup Button"
            onPress={() => {
              if (isFormValid) {
                signupWithEmailPwd(username, pwd);
              } else {
                alert("Please fill out the form");
              }
            }}
          >
            <Text style={{ color: "white" }}>Signup</Text>
          </Button>
          <Button
            style={{
              width: "40%",
              backgroundColor: isFormValid ? MD2Colors.purple400 : "black",
              opacity: isFormValid ? 1 : 0.7,
            }}
            mode="contained"
            disabled={!isFormValid}
            accessibilityLabel="Login Button"
            onPress={() => {
              if (isFormValid) {
                loginWithEmailPwd(username, pwd);
              } else {
                alert("Please fill out the form");
              }
            }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>
          {/* <View
            style={{
              paddingHorizontal: 40,
              marginVertical: 10,
            }}
          >
            <Divider
              style={{
                borderRadius: 10,
                shadowColor: "black",
                shadowOffset: 0.5,
              }}
            />
          </View> */}
        </View>

        {/* Footer label - secured by Google */}
        <View
          style={{
            position: "absolute",
            marginBottom: 20,
            bottom: 20,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {/* <AntDesign name="google" size={16} color="white" /> */}
          <Text
            style={{
              color: "grey",
              textAlign: "center",
            }}
          >
            secured by Google 🔒
          </Text>
          <Image
            resizeMode="contain"
            style={{
              width: 18,
              height: 18,
            }}
            source={require("../../assets/icons8-google-48.png")}
          />
        </View>

        {loading && <ActivityIndicator size={"large"} />}
      </View>
    </ImageBackground>
  );
}
