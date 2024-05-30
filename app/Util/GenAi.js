import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_AI_API);
export let chat_history = [];

/*
    To Build a chat these are two main functions for Gen AI

    startChat() and sendMessage()

    startChat - takes a dict of history to initilize the conversation
    sendMessage - takes a string and then it automatically appends it to the history of conversation

*/

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  safety_settings: {
    HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
    HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
    HARM_CATEGORY_UNSPECIFIED: HarmBlockThreshold.BLOCK_NONE,
    HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
});
let chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "You are helpful and smart assistant, for this conversation only answer questions related to Computer Science topics, also provide them with code example in javascript, use emojies in your responses as well.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Great to meet you. What would you like to know? ",
        },
      ],
    },
  ],
});

// this is not a model, this uses standalone gemini ai api call to generate quiz
export const generateQuiz = async (lessonName) => {
  const PROMPT = `
  Return type: json
I need Return Object array so that It can be easily converted to JSON.parse, return JSON strucutred format. 
No trailing semicolons, commas or anything.
I need questions in range anywhere from 3 to 6 or 7.
Generate a Quiz on ${lessonName}.
Return Type JSON Object: Array Object only like [{}, {}, ...]
Inside Array Object there is each question like {question: String, choices: [String], answer: String, XP: INT, difficulity: [EASY, MEDIUM, HARD], explanation: String}
And each question should be multiple choice only, 
XP property should be based on level of difficulity but minmum is 5 for easy, 8 for mid, 10 for hard. 
explanation property should explain the answer from the given choice
Each questions should be sorted from Easy to Hard difficulty level.
Please format the response in JSON format.
`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(PROMPT);
  const response = await result.response;
  const data = response.text();
  if (data.length > 0) {
    try {
      if (data.startsWith("[")) {
        return JSON.parse(data);
      } else {
        let string_manipulation = `${data}`;
        let first_line = string_manipulation.indexOf("\n");
        let last_line = string_manipulation.lastIndexOf("\n");
        let parsed = `${string_manipulation.substring(
          first_line + 1,
          last_line
        )}`;
        return JSON.parse(parsed);
      }
    } catch (er) {
      return generateQuiz(PROMPT);
    }
  } else {
    return generateQuiz(PROMPT);
  }
};

export async function generateLesson(lessonName) {
  console.log("Generating");
  const PROMPT = `
    title: String,
    Type: String,
    description:String,
    catchyShortDescription:String,
    text: String,
    examples: [String],
    CodeSnippt:,
    Approach: [String],
    Complexity: String,
    SpaceComplexity: [String],
    TimeComplexity: {
      Insert: "",
      Search: "",
      Remove: "",
      Find: "",
    },
    
}

Generate a topic by filling properties above ${lessonName}. for Complexity property type a brief sentance on topic, for TimeCompleixty if it's data structure then use those given operations otherwise use this property of an algorithm TimeCompleixty with order of [BEST, WORST, AVERAGE] and also give Space compleixty same order as TimeCompliexy only if it's an algorithm. return a data in a way that is easy to JSON.parse on `;
  return await GenAi({
    msg: PROMPT,
  })
    .then((res) => {
      return res;
    })
    .catch((er) => {
      console.log(er);
      return er;
    });
}
// streamed response, returns iterateble stream
// sendMessageStream returns pipeThrough of undefined error
// export default async function GenAi({ msg }) {
//   console.log("You typed ", msg);

//   const result = await chat.sendMessageStream(msg);
//   console.log(result);
//   await chat.getHistory().catch((er) => {
//     console.log("Unable to retrieve history ", er);
//   });
//   return "";
// }

// un-streamed response, sends the result onces its done
export default async function GenAi({ msg }) {
  try {
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    // await chat.getHistory().catch((er) => {
    //   console.log("Unable to retrieve history ", er);
    // });
    return text;
  } catch (er) {
    console.log(er);
    return "Google AI is Blocked due to RECITATION - There is a problem occured please try to refresh the App";
  }
}

export async function generateQuickQuestion() {
  return GenAi({
    msg: "Give me 4 small questions about Computer Science Topic, questions length should be like 20-30 characters, emojies should be different for all questions, questions only. Start your question without any symbol or number.",
  });
}

export async function clearChat() {
  chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are helpful and smart assistant, for this conversation only answer questions related to Computer Science topics, also provide them with code example in javascript, use emojies in your responses as well.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Great to meet you. What would you like to know? ",
          },
        ],
      },
    ],
  });
}
