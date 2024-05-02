import { View, TouchableOpacity, Alert, ScrollView } from "react-native";
import {
  Button,
  List,
  MD2Colors,
  ProgressBar,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { fullScreen } from "../globalVars";
import { Avatar } from "react-native-paper";
import { logoutUser, updateUserAvatar, user, userLevel } from "../Util/User";
import { PickPhoto, takePhoto } from "./MyImagePicker";
import { useState } from "react";
import { getUserImage, uploadUserImage } from "../FireBase/firebase";
import { CachedImage } from "../CustomComponents/CachedImage";

import { LineChart } from "react-native-chart-kit";

export default function Profile({ theme, navigation, resetApp }) {
  const [avatar, setAvatar] = useState(user.avatar);
  let currentLevel = userLevel(user.XP);
  let maxLabels = 2;

  // limiting the number of labels to be shown on x axis
  if (user.quiz_attempts % 9 == 0) {
    maxLabels *= maxLabels;
  }

  let average_percentage =
    (
      user.quiz_scores.reduce(
        (accumulator, currentValue) =>
          parseFloat(accumulator) + parseFloat(currentValue),
        0
      ) / user.quiz_attempts
    ).toFixed(2) ?? 0.0;

  if (average_percentage === "NaN") {
    average_percentage = 0.0;
  }

  const data = {
    labels:
      user.quiz_attempts > 0
        ? Array.from(
            { length: Math.ceil(user.quiz_attempts / maxLabels) },
            (_, index) => Number(index * maxLabels + 1)
          )
        : [0],
    datasets: [
      {
        data:
          user.quiz_attempts > 0
            ? user.quiz_scores.map((e) => Math.round(e))
            : [0],
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Score"],
  };

  if (!data["labels"].includes(user.quiz_attempts)) {
    data["labels"].push(user.quiz_attempts);
  }

  const ChartComponent = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <LineChart
          data={data}
          width={fullScreen["width"] - 50}
          height={200}
          yAxisSuffix=" %"
          chartConfig={{
            backgroundColor: theme["backgroundColor"],
            backgroundGradientFrom: MD2Colors.purple400,
            backgroundGradientTo: MD2Colors.purple900,
            decimalPlaces: 0,
            useShadowColorFromDataset: true,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              padding: 10,
              margin: 10,
            },
            propsForDots: {
              r: "3",
              stroke: MD2Colors.purple500,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        ></LineChart>
      </View>
    );
  };
  const handleImageUpload = (imageData) => {
    if (imageData !== null) {
      const avatarName = imageData["uri"].substring(
        imageData["uri"].lastIndexOf("-") + 1
      );

      // set user avatar uri in the firebase
      if (user && user._id) {
        // update avatar_name property
        // then upload in database
        user.avatar_name = avatarName;
        let status_code = 0;
        uploadUserImage(user, imageData, user.avatar_name)
          .catch((er) => {
            alert("error occured while uploading ", er.code);
            status_code = -1;
          })
          .finally((ss) => {
            if (status_code !== -1) {
              getUserImage(user, user.avatar_name)
                .then((res) => {
                  if (res) {
                    user.avatar = res;
                    setAvatar(res);
                    updateUserAvatar(user.avatar_name);
                  }
                })
                .catch((er) => {
                  setAvatar(null);
                });
            }
          });
      }
    }
  };

  const Tile = ({ leftLabel, rightLable }) => (
    <View
      style={{
        backgroundColor: theme["quoteBox"],
        padding: 10,

        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: 0.5,
        shadowRadius: 10,
        display: "flex",
        gap: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        variant="bodyLarge"
        style={{ color: theme["color"], fontWeight: "500" }}
      >
        {leftLabel}
      </Text>

      <Text
        variant="bodyLarge"
        style={{ color: theme["color"], fontWeight: "500" }}
      >
        {rightLable}
      </Text>
    </View>
  );
  const handleImagePrompt = () => {
    Alert.alert("Pick a photo", "Take a photo or pick a phot from gallery", [
      {
        text: "Take Photo",
        onPress: () => {
          takePhoto()
            .then(async (imageData) => {
              handleImageUpload(imageData);
            })
            .catch((er) => {
              console.log("Pick Photo ", er);
              setAvatar(null);
            });
        },
      },
      {
        text: "Pick from Photos",
        onPress: () => {
          PickPhoto()
            .then(async (imageData) => {
              handleImageUpload(imageData);
            })
            .catch((er) => {
              console.log("Pick Photo ", er);
              setAvatar(null);
            });
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };
  const UserLabel = () => (
    <View>
      <View
        style={{
          backgroundColor: theme["quoteBox"],
          borderRadius: 10,
          padding: 10,
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={handleImagePrompt}>
            {avatar !== null ? (
              <CachedImage
                style={{ width: 80, height: 80, borderRadius: 100 }}
                uri={avatar}
                // source={{ uri: avatar }}
                avatar_name={user.avatar_name}
              />
            ) : (
              <Avatar.Text label={user.name_initials} />
            )}
          </TouchableOpacity>
          <Text
            accessibilityRole="text"
            accessibilityLabel={`Profile Name: ${user.name}`}
            variant="titleLarge"
            style={{ color: theme["color"] }}
          >
            {user.name}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: theme["color"] }}>Level {currentLevel}</Text>
            <Text style={{ color: theme["color"] }}>
              Level {currentLevel + 1}
            </Text>
          </View>
          <ProgressBar progress={(user.XP % 100) / 100} />

          {/* XP earned label */}
          <Tile leftLabel={"XP earned"} rightLable={user.XP} />
          <Tile leftLabel={"Quiz Attempts"} rightLable={user.quiz_attempts} />
          <Tile leftLabel={"Quiz Passed"} rightLable={user.quiz_passed} />
          <Tile
            leftLabel={"Average Percentage "}
            rightLable={`${average_percentage} %`}
          />

          <ChartComponent />
        </View>

        {/* Logout button */}
        <TouchableOpacity
          onPress={() => {
            logoutUser();
            resetApp();
          }}
        >
          <Button
            accessibilityRole="button"
            accessibilityLabel={`Logout out`}
            mode="contained"
          >
            Logout
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CreateListItem = ({ title, description, navigationCallback }) => {
    return (
      <View>
        <TouchableRipple
          style={{
            backgroundColor: theme["quoteBox"],
            borderRadius: 10,
          }}
        >
          <List.Item
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            title={title}
            titleStyle={{ color: theme["color"] }}
            descriptionStyle={{
              color: theme["color"],
              marginRight: 5,
              marginTop: 5,
            }}
            description={description}
            onPress={navigationCallback}
            right={(props) => (
              <List.Icon
                {...props}
                style={{
                  alignSelf: "center",
                }}
                icon="chevron-right"
                color={theme["color"]}
              />
            )}
          />
        </TouchableRipple>
      </View>
    );
  };
  return (
    <ScrollView
      style={{
        backgroundColor: theme["backgroundColor"],
        ...fullScreen,
        padding: 10,
      }}
    >
      {/* User Avatar, name and Logout button */}
      <UserLabel />
      <View
        style={{
          marginVertical: 10,
          gap: 10,
        }}
      >
        <CreateListItem
          title={"📝 Notes"}
          description="Your highlighted strings in each lesson are shown here"
          navigationCallback={() => navigation.navigate("Notes")}
        />

        <CreateListItem
          title={"🔖 Bookmarks"}
          description="Your saved lessons are right here!"
          navigationCallback={() => navigation.navigate("Bookmarks")}
        />

        <CreateListItem
          title={"ℹ️ About"}
          description="What inspired the creation of this application?"
          navigationCallback={() => navigation.navigate("About")}
        />

        <CreateListItem
          title={"⚙️ Settings"}
          description="Change your preference here"
          navigationCallback={() => navigation.navigate("Settings")}
        />

        <CreateListItem
          title={"🐛 Report Bug"}
          description="Assist developers in enhancing this application for optimal user experience."
          navigationCallback={() => navigation.navigate("Report Bug")}
        />
      </View>
      <View style={{ marginBottom: 50 }} />
    </ScrollView>
  );
}

/** <Text>Display bookmark</Text>
      {lesson_bookmarks.map((el, k) => (
        <Text key={k}>{el["title"]}</Text>
      ))}

      <Text>Display DS highlights</Text> {Object.keys(searching_algorithms_highlights).map((k, v) => {
        if (searching_algorithms_highlights[k]["description"].length > 0) {
          for (let eachDesc of searching_algorithms_highlights[k][
            "description"
          ]) {
            console.log(
              searching_algorithms[v]["description"].substring(
                eachDesc["start"],
                eachDesc["end"]
              )
            );
          }
        }
      })} */
