import { searching_algorithms } from "./SearchAlgorithms";
import { sorting_algorithms } from "./SortingAlgorithms";
import { datastructures } from "./DataStrucutres";

// properties of what user can highlight
// the name of properites should match with the properties inside seaching_algorithms object
// this
const boilerPlate = {
  description: [],
  examples: [],
  text: [],
  catchyShortDescription: [],
  Approach: [],
  Complexity: [],
  wasModified: false,
};

/*
Loads the highlights from local storage 

goes through each entry from the array which in this case is Searching_algorithms from file which is data 
then each lesson name is used for highlights of each lesson
Takes lesson Name as a key
Copies 
*/
export const searching_algorithms_highlights = {};
export const sorting_algorithms_highlights = {};
export const datastructures_highlights = {};
export const lesson_bookmarks = [];

searching_algorithms.map((e) => {
  searching_algorithms_highlights[e["title"]] = {
    ...JSON.parse(JSON.stringify(boilerPlate)),
    // 2D arrays we need for each string
    // e['examples'] is also an array
    // so we are creating array to store highligh for each of the example string

    examples: Array.from({ length: e["examples"].length }, () => []),
    Approach: Array.from({ length: e["Approach"].length }, () => []),
  };
});

sorting_algorithms.map((e) => {
  sorting_algorithms_highlights[e["title"]] = {
    ...JSON.parse(JSON.stringify(boilerPlate)),
    // 2D arrays we need for each string
    // e['examples'] is also an array
    // so we are creating array to store highligh for each of the example string

    examples: Array.from({ length: e["examples"].length }, () => []),
    Approach: Array.from({ length: e["Approach"].length }, () => []),
  };
});

datastructures.map((e) => {
  datastructures_highlights[e["title"]] = {
    ...JSON.parse(JSON.stringify(boilerPlate)),
    // 2D arrays we need for each string
    // e['examples'] is also an array
    // so we are creating array to store highligh for each of the example string

    examples: Array.from({ length: e["examples"].length }, () => []),
    Approach: Array.from({ length: e["Approach"].length }, () => []),
  };
});
