import { signOut } from "firebase/auth";
import {
  datastructures_highlights,
  sorting_algorithms_highlights,
  searching_algorithms_highlights,
  lesson_bookmarks,
} from "../Data/LessonHighlights";
import { Theme } from "../globalVars";
import { chat_history } from "./GenAi";
import { generateInitials } from "./functions";
import { FIREBASE_AUTH, DB, getUserImage } from "../FireBase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export const default_theme = Theme.lightMode;
import * as FileSystem from "expo-file-system";

export default class User {
  constructor(name) {
    this.name = name;
    this._id = null;
    this.name_initials = generateInitials(name);
    this.avatar = null;
    this.avatar_name = null;
    this.bookmarks_id = null;
    this.chat_history_id = null;
    this.highlights_id = null;
    this.user_preference_id = null;
    this.XP = 0;
    this.quiz_attempts = 0;
    this.quiz_passed = 0;
    this.quiz_scores = [];

    // Preload data here from data base
    this.datastructures_highlights = datastructures_highlights;
    this.sorting_algorithms_highlights = sorting_algorithms_highlights;
    this.searching_algorithms_highlights = searching_algorithms_highlights;
    this.lesson_bookmarks = lesson_bookmarks;
    this.chat_history = chat_history;
    this.theme = default_theme;
    // this.meta_data = {};
  }
}

export const user = new User();

// this should be called during signup
// this is user recieved from Authentication
export async function setUser(newUser) {
  if (newUser) {
    // load data here
    user.name = newUser["email"];
    user._id = newUser["uid"];

    user.name_initials = generateInitials(user.name);
    // user.meta_data = { ...newUser };
  }
}

export async function loadUserData() {
  // get the user
  // this is the user that is recieved from database using authentic uid
  const userSnap = await getDoc(doc(DB, "users", user._id));
  if (userSnap && userSnap.exists() && user._id) {
    const userData = userSnap.data();

    // load user id's
    user.bookmarks_id = userData["bookmarks_id"];
    user.chat_history_id = userData["chat_history_id"];
    user.highlights_id = userData["highlights_id"];
    user.user_preference_id = userData["user_preference_id"];
    user.avatar_name = userData["avatar"];
    user.XP = userData["XP"] ?? 0;
    user.quiz_attempts = userData["quiz_attempts"] ?? 0;
    user.quiz_passed = userData["quiz_passed"] ?? 0;
    user.quiz_scores = userData["quiz_scores"] ?? [];

    // check if avatar is in file system
    if (user.avatar_name) {
      const path = `${FileSystem.cacheDirectory}${user.avatar_name}`;
      await FileSystem.getInfoAsync(path).then((imgFile) => {
        if (imgFile.exists) {
          user.avatar = imgFile.uri;
        } else {
          getUserImage(user, user.avatar_name).then((d) => {
            if (d) {
              user.avatar = d;
            }
          });
        }
      });
    }
    // get bookmarks from collection bookmarks
    const user_bookmarks = await getDoc(
      doc(DB, "bookmarks", user.bookmarks_id)
    );
    // if found retreive else make new and assign
    if (user_bookmarks && user_bookmarks.exists()) {
      user.lesson_bookmarks = user_bookmarks.data()["lesson_bookmarks"];
    } else {
      console.log("No bookmarks found!");
    }

    // get bookmarks from collection bookmarks
    const user_chat_history = await getDoc(
      doc(DB, "chat_history", user.chat_history_id)
    );
    // if found retreive else make new and assign
    if (user_chat_history && user_chat_history.exists()) {
      user.chat_history = user_chat_history.data()["chat_history"];
    } else {
      console.log("No chat history found!");
    }
    // get user preference
    const user_preference = await getDoc(
      doc(DB, "user_preference", user.user_preference_id)
    );
    // if found retreive else make new and assign
    if (user_preference && user_preference.exists()) {
      user.theme =
        user_preference.data()["theme_mode"] == "LIGHT"
          ? Theme.lightMode
          : Theme.darkMode;
    } else {
      console.log("No user preference found!");
    }

    // get user preference
    const user_highlights = await getDoc(
      doc(DB, "highlights", user.highlights_id)
    );
    // if found retreive else make new and assign
    if (user_highlights && user_highlights.exists()) {
      user.searching_algorithms_highlights = JSON.parse(
        user_highlights.data()["searching_algorithms_highlights"]
      );
      user.sorting_algorithms_highlights = JSON.parse(
        user_highlights.data()["sorting_algorithms_highlights"]
      );
      user.datastructures_highlights = JSON.parse(
        user_highlights.data()["datastructures_highlights"]
      );
    } else {
      console.log("No user highlights found!");
    }

    return userSnap;
  }

  // check database after 5 seconds
  setTimeout(() => {
    console.log("Not found checking again...");
    loadUserData(user);
  }, 5000);
}

export function updateDocument(collection_name, doc_id, data) {
  const bookmark_doc = doc(DB, collection_name, doc_id);
  setDoc(bookmark_doc, data);
}

// export function updateUserXP(value) {
//   const ref = doc(DB, "users", user._id);
//   updateDoc(ref, {
//     XP: value,
//   });
// }

export function updateUserQuizRecord(data) {
  const ref = doc(DB, "users", user._id);
  updateDoc(ref, {
    XP: data["XP"],
    quiz_attempts: Number(data["quiz_attempts"]),
    quiz_passed: Number(data["quiz_passed"]),
    quiz_scores: data["quiz_scores"],
  });
}

export function updateUserAvatar(value) {
  const ref = doc(DB, "users", user._id);
  updateDoc(ref, {
    avatar: value,
  });
}

// calculates level of user with the given XP
export function userLevel(xp) {
  // Base XP required for level 1
  const base_xp = 100;

  // Rate at which XP requirement increases per level
  const xp_increase_rate = 1.2;

  // Initialize player level to 1
  let level = 1;

  // Initialize the XP required for the current level to the base XP
  let required_xp = base_xp;

  //  Loop until the XP given is less than the required XP for the current level
  while (xp >= required_xp) {
    // Subtract the required XP for the current level from the given XP
    xp -= required_xp;

    //  Increase the player's level by 1
    level += 1;

    // Calculate the required XP for the next level based on the base XP and increase rate
    required_xp = Number(base_xp * xp_increase_rate ** (level - 1));
  }

  // Return the player's level
  return level;
}
// handling user highlights inside MyText.js file

// logout process
export function logoutUser() {
  signOut(FIREBASE_AUTH);
  user._id = null;
  user.avatar = null;
  user.bookmarks_id = null;
  user.chat_history_id = null;
  user.highlights_id = null;
  user.user_preference_id = null;
}
