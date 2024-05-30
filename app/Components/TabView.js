import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "../Components/Loader.js";
import { sorting_algorithms } from "../Data/SortingAlgorithms.js";
import { searching_algorithms } from "../Data/SearchAlgorithms.js";
import { datastructures } from "../Data/DataStrucutres.js";

import { Theme } from "../globalVars.js";
import MyAI from "./MyAI.js";
import { user } from "../Util/User.js";

// Tab views of this app are rendered here
export default function TabView({ Tab, navigation, theme }) {
  const tabBarStyleSettings = {
    ...theme["headerStyle"],
    borderBlockColor: theme === Theme.darkMode ? "transparent" : "auto",
    borderTopColor: theme === Theme.darkMode ? "transparent" : "auto",
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: tabBarStyleSettings,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Searching":
              iconName = focused ? "note-search" : "note-search-outline";
              break;
            case "Sorting":
              return (
                <FontAwesome5
                  name={"sort-amount-up-alt"}
                  size={size}
                  color={color}
                />
              );
            case "Data Structures":
              iconName = focused ? "file-tree" : "file-tree-outline";
              break;
            case "AI":
              return <FontAwesome5 name="robot" size={size} color={color} />;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        headerShown: false,
      })}
    >
      {/* Searching Algorithms - Tab */}
      <Tab.Screen
        name="Searching"
        accessibilityLabel="Search Algorithms"
        options={{
          title: "Searching",
          tabBarActiveTintColor: theme["headerTintColor"],
        }}
      >
        {(props) => {
          return (
            <Loader
              {...props}
              theme={theme}
              navigator={navigation}
              Title={"Searching"}
              itarative_data={searching_algorithms}
              highlights_data={user.searching_algorithms_highlights}
            />
          );
        }}
      </Tab.Screen>

      {/* Sorting Algorithms - Tab  */}
      <Tab.Screen
        name="Sorting"
        accessibilityLabel="Sorting Algorithms"
        options={{
          title: "Sorting",
          tabBarActiveTintColor: theme["headerTintColor"],
        }}
      >
        {(props) => {
          return (
            <Loader
              {...props}
              theme={theme}
              navigator={navigation}
              Title={"Sorting"}
              itarative_data={sorting_algorithms}
              highlights_data={user.sorting_algorithms_highlights}
            />
          );
        }}
      </Tab.Screen>

      {/*  Data Structures - Tab */}
      <Tab.Screen
        name="Data Structures"
        accessibilityLabel="Data Structures"
        options={{
          title: "Data Structures",
          tabBarActiveTintColor: theme["headerTintColor"],
        }}
      >
        {(props) => (
          <Loader
            {...props}
            theme={theme}
            navigator={navigation}
            Title={"Data Strucutres"}
            itarative_data={datastructures}
            highlights_data={user.datastructures_highlights}
          />
        )}
      </Tab.Screen>

      {/* AI - Tab */}
      <Tab.Screen
        name="AI"
        accessibilityLabel="Artifical Assistant"
        options={{
          title: "Ask AI",
          tabBarActiveTintColor: theme["headerTintColor"],
        }}
      >
        {(props) => <MyAI theme={theme} navigator={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
