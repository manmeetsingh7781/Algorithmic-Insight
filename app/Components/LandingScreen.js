// First thig user sees after the Startup Screen
import { SafeAreaView, ScrollView } from "react-native";
import { fullScreen } from "../globalVars";
import MyCard from "../CustomComponents/MyCard";

// Images import
import ALGORITHM_COVER from "../../assets/images/algorithm_cover.jpg";

// const algorithms = {
//   title: "Searching Algorithms",
//   body_text:
//     "Learn Algorithms in easy and simple terms, this section covers everything that you need to know",
//   image: ALGORITHM_COVER,
//   path: "Searching Algorithms",
// };

const searching = {
  title: "Searching Algorithms",
  body_text:
    "Learn to search in easy and simple terms, this section covers everything that you need to know",
  image: ALGORITHM_COVER,
  path: "Searching Algorithms",
};
export default function LandingScreen({ navigation, theme }) {
  const HomeScreen = () => (
    <SafeAreaView
      style={{
        ...fullScreen,
        backgroundColor: theme["backgroundColor"],
      }}
    >
      {/* Title of the View [Data structures, Algorithms, Algorithm classes, Problems...] */}
      <ScrollView
        style={{
          ...fullScreen,
          backgroundColor: theme["backgroundColor"],
        }}
      >
        <MyCard
          navigation={navigation}
          theme={theme}
          card_content={searching}
        />
      </ScrollView>
    </SafeAreaView>
  );

  return <HomeScreen />;
}
