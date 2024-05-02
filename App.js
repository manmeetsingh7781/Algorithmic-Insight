import { useEffect, useLayoutEffect, useState } from "react";

import { Avatar, PaperProvider } from "react-native-paper";
import { Platform, TouchableOpacity, Image, View } from "react-native";
import { Theme, setQuesionAI } from "./app/globalVars";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import StartUpScreen from "./app/Components/StartUpScreen";
import Lesson from "./app/Components/Lesson.js";
import TabView from "./app/Components/TabView.js";
import Profile from "./app/Components/Profile.js";
import Notes from "./app/Components/Notes.js";
import Bookmarks from "./app/Components/Bookmarks.js";
import About from "./app/Components/About.js";
import * as Font from "expo-font";
import ChatHistory from "./app/Components/ChatHistory.js";
import { generateQuickQuestion } from "./app/Util/GenAi.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Quiz } from "./app/Components/Quiz.js";
import { user, loadUserData, updateDocument } from "./app/Util/User.js";
import ReportBug from "./app/Components/ReportBug.js";
import Settings from "./app/Components/Settings.js";
import AuthPage from "./app/Components/Login.js";
import { DemandLesson } from "./app/Components/DemandLesson.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // false
  const [showSignupPage, setShowSignupPage] = useState(true);

  const [showLogoutLoader, setshowLogoutLoader] = useState(false);

  // const [avatar, setAvatar] = useState(null);
  const [theme, setCurrentTheme] = useState(
    user ? user.theme : Theme.lightMode
  );

  const [statubarTheme, setstatubarTheme] = useState("light");

  const [themeIcon, setCurrentThemeIcon] = useState(
    user && user.theme === Theme.darkMode ? "sunny" : "moon"
  );

  const [question, setQuestion] = useState([]);

  // for code highlighter syntax need this font so that warning goes away and renders the data correctly
  const loadFonts = async () => {
    await Font.loadAsync({
      Courier: require("./assets/FontsFree-Net-SLC_.ttf"),
    });
  };

  // when AI generates the questins and they are ready to load into Global Questions
  // once we have questions loaded we will load the player data from fire base
  // then we will complete the loading of an app
  useLayoutEffect(() => {
    // after reseting the questions for new questions, we will check if the questions are loaded again
    // if so then we will load the player data from Firebase
    if (question.length !== 0) {
      // at this point we will have our questions setup
      // onces the questions are loaded, the app will load and continue
      loadFonts();
      setQuesionAI(question);
    }
  }, [question]);

  // loads quick prompts in AI tab
  const loadQuestions = () => {
    generateQuickQuestion()
      .then((q) => {
        setQuestion(
          q.split("\n").map((e) => {
            const v = e.trim();
            if (v !== "") return e;
          })
        );
      })
      .catch((r) => setQuestion([]));
  };

  // when app is on login/signup page
  // this is executed when app is at start state
  // 1. state -> Auth
  // 2. Load questions - AI response
  // 3. Load user profile
  // 4. loaded -> true
  useEffect(() => {
    // when user login to app, prepare the data
    if (!showSignupPage) {
      // id is only valid when user is logged in
      // load user profile
      if (user && user._id) {
        if (question && question.length === 0) loadQuestions();

        setTimeout(() => {
          loadUserData().then((userDataFB) => {
            // load app settings from user data base here
            setCurrentTheme(user.theme);
            setCurrentThemeIcon(
              user.theme === Theme.darkMode ? "sunny" : "moon"
            );
            setstatubarTheme(
              user && user.theme === Theme.darkMode ? "light" : "dark"
            );

            setIsLoaded(true);
          });
        }, 2500);
      }
    }
  }, [showSignupPage]);

  // executes when user logs out of account
  const resetApp = () => {
    setIsLoaded(false);
    setShowSignupPage(false);
    setshowLogoutLoader(true);
    setCurrentTheme(Theme.lightMode);
    setCurrentThemeIcon("sunny");
    setQuestion([]);
    setQuesionAI([]);
    setTimeout(() => {
      setshowLogoutLoader(false);
      setShowSignupPage(true);
    }, 2500);
  };

  const handleThemeUpdate = () => {
    if (theme === Theme.darkMode) {
      setCurrentTheme(Theme.lightMode);
      setCurrentThemeIcon("moon");
      setstatubarTheme("dark");

      if (user && user._id)
        updateDocument("user_preference", user.user_preference_id, {
          theme_mode: "LIGHT",
        });
    } else {
      setCurrentTheme(Theme.darkMode);
      setCurrentThemeIcon("sunny");
      setstatubarTheme("light");
      if (user && user._id)
        updateDocument("user_preference", user.user_preference_id, {
          theme_mode: "DARK",
        });
    }
    user.theme = theme;
  };

  const headerOptions = {
    headerStyle: theme["headerStyle"],
    headerTintColor: theme["headerTintColor"],
  };

  // shows button to bookmark lesson
  // handles logic for bookmarking a lesson
  const BookmarkRight = ({ route }) => {
    let name = "bookmark-outline"; // Optional configuration

    const [iconName, setIconName] = useState(name);
    if (route.params) {
      for (let lesson of user.lesson_bookmarks) {
        if (lesson == route.params?.lesson["title"]) {
          name = "bookmark-check";
          break;
        }
      }
    }
    useLayoutEffect(() => {
      setIconName(name);
    }, []);

    return (
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={theme["color"]}
        style={{ marginHorizontal: 10 }}
        onPress={() => {
          if (user.lesson_bookmarks.includes(route.params.lesson["title"])) {
            user.lesson_bookmarks.splice(
              user.lesson_bookmarks.indexOf(route.params.lesson["title"]),
              1
            );
            setIconName("bookmark-outline");
            // remove bookmark from firebase
          } else {
            user.lesson_bookmarks.push(route.params.lesson["title"]);
            setIconName("bookmark-check");
            // add bookmark on firebase
          }

          // this is where I am sending request to firebase to add an entry to database
          if (user && user._id && user.bookmarks_id) {
            // collection name, collection id which is inside user, and data to upload
            updateDocument("bookmarks", user.bookmarks_id, {
              lesson_bookmarks: user.lesson_bookmarks,
            });
          } else {
            alert("Please login to your account to save progress.");
          }
        }}
      />
    );
  };

  // option to show on top navigation bar
  // shows Button to change theme, and Profile button
  const MainScreenHeaderRight = ({ navigation }) => (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      {/* Custom lesson button */}
      {/* feature for lesson on demand under progress */}
      {/* <Ionicons
        name={"chevron-forward-circle-outline"}
        size={24}
        color={theme["color"]}
        onPress={() => {
          navigation.navigate("onDemandLesson");
        }}
        animated={true}
        accessibilityLabel="Change Theme"
        title="Toggle Theme"
        style={{ marginHorizontal: 10 }}
      /> */}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        {user.avatar !== null ? (
          <Image
            style={{ width: 28, height: 28, borderRadius: 100 }}
            source={{ uri: user.avatar }}
          />
        ) : (
          <Avatar.Text label={user.name_initials} size={24} color={"white"} />
        )}
      </TouchableOpacity>
    </View>
  );

  if (showSignupPage) return <AuthPage setShowSignupPage={setShowSignupPage} />;
  if (showLogoutLoader) return <StartUpScreen text="Loging out" />;
  return (
    // Navigation Container Packs all the Navigators for this App
    <NavigationContainer>
      <StatusBar style={statubarTheme} />

      {/* Paper Provider for better UI elements */}
      <PaperProvider>
        <Stack.Navigator>
          {isLoaded ? (
            // When app is loaded
            //This is basically the whole App container
            // Once the App is loaded this will Display the Scene for user to Click
            //  Main Application Running in this Screen
            <Stack.Screen
              name={"Home"}
              options={({ navigation }) => ({
                ...headerOptions,
                headerRight: () => (
                  <MainScreenHeaderRight navigation={navigation} />
                ),
              })}
            >
              {(props) => (
                <TabView
                  {...props}
                  Tab={Tab}
                  navigator={navigator}
                  theme={theme}
                />
              )}
            </Stack.Screen>
          ) : (
            // When app is starting up
            // Screen for App startup
            <Stack.Screen
              name="Startup"
              options={{ headerShown: false }}
              component={StartUpScreen}
            />
          )}

          {/* When user clicks on a Lesson this component is renderd */}
          {/* Bookmarking a lesson is implemented here */}
          {/* Screen - Lesson */}
          <Stack.Screen
            name="Lesson"
            options={({ route }) => ({
              ...headerOptions,
              headerRight: () => <BookmarkRight route={route} />,
              // title will be depended on the Parameter
              title: route.params?.lesson["title"] ?? "Lesson",
            })}
          >
            {(props) => (
              <Lesson
                {...props}
                theme={theme}
                navigation={props["navigation"]}
              />
            )}
          </Stack.Screen>

          {/* Screen - Profile */}
          <Stack.Screen
            name="Profile"
            options={{
              ...headerOptions,
            }}
          >
            {(props) => (
              <Profile
                theme={theme}
                navigation={props["navigation"]}
                resetApp={resetApp}
              />
            )}
          </Stack.Screen>

          {/* Screen - /Profile/Notes */}
          <Stack.Screen
            name="Notes"
            options={{
              ...headerOptions,
              headerTitle: "Notes 📝",
            }}
          >
            {(props) => (
              <Notes theme={theme} navigation={props["navigation"]} />
            )}
          </Stack.Screen>

          {/* Screen - /Profile/Bookmarks  */}
          <Stack.Screen
            name="Bookmarks"
            options={{
              ...headerOptions,
              headerTitle: "Bookmarks 🔖",
            }}
          >
            {(props) => (
              <Bookmarks theme={theme} navigation={props["navigation"]} />
            )}
          </Stack.Screen>

          {/* Screen - /Profile/About */}
          <Stack.Screen
            name="About"
            options={{
              ...headerOptions,
              headerTitle: "About ℹ️",
            }}
          >
            {(props) => (
              <About theme={theme} navigation={props["navigation"]} />
            )}
          </Stack.Screen>

          {/* Screen - /Profile/Report Bug */}
          <Stack.Screen
            name="Report Bug"
            options={{
              ...headerOptions,
              headerTitle: "Report Bug 🐛",
            }}
          >
            {(props) => (
              <ReportBug theme={theme} navigation={props["navigation"]} />
            )}
          </Stack.Screen>

          {/* Screen - /Profile/Settings */}
          <Stack.Screen
            name="Settings"
            options={{
              ...headerOptions,
              headerTitle: "Settings ⚙️",
            }}
          >
            {(props) => (
              <Settings
                theme={theme}
                navigation={props["navigation"]}
                handleThemeCallback={handleThemeUpdate}
                iconeName={themeIcon}
              />
            )}
          </Stack.Screen>

          {/* Screen - /AI/Chat History */}
          <Stack.Screen
            name="Chat history - AI"
            options={{
              ...headerOptions,
              headerTitle: "Chat history",
            }}
          >
            {(props) => (
              <ChatHistory theme={theme} navigation={props["navigation"]} />
            )}
          </Stack.Screen>

          {/* Custom lesson generator  */}
          <Stack.Screen
            name="onDemandLesson"
            options={{
              ...headerOptions,
              headerTitle: "Lesson on Demand",
            }}
          >
            {(props) => (
              <DemandLesson theme={theme} navigation={props["navigation"]} />
            )}
          </Stack.Screen>

          {/* Screen - /Lesson/Quiz */}
          <Stack.Screen
            name="Lesson Quiz"
            options={({ route }) => ({
              ...headerOptions,
              title:
                // In Top navbar android does not show previous scene title so we are adding the Lesson name on what user is taking quiz on
                Platform.OS === "ios"
                  ? "Quiz"
                  : `Quiz on ${route.params["lesson"]["title"]}`,
            })}
          >
            {(props) => (
              // spearing ...props will give route object
              <Quiz {...props} theme={theme} navigation={props["navigation"]} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
