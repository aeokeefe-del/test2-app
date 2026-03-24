// questions.js
// Each question follows the shape: { question: String, answers: Array<String>, correct: Number }
// `correct` is the zero-based index of the correct answer in the `answers` array.

export const questions = [
  {
    question: "Which planet in our solar system has the most known moons?",
    answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1, // Saturn (146 confirmed moons as of 2023)
  },
  {
    question: "What is the time complexity of binary search on a sorted array?",
    answers: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
    correct: 2,
  },
  {
    question: "Which element has the highest melting point of all known elements?",
    answers: ["Iron", "Carbon", "Tungsten", "Osmium"],
    correct: 2,
  },
  {
    question: "In what year did the World Wide Web become publicly available?",
    answers: ["1983", "1989", "1991", "1995"],
    correct: 2, // Tim Berners-Lee opened it to the public in 1991
  },
  {
    question: "Which programming paradigm treats computation as the evaluation of mathematical functions?",
    answers: ["Object-Oriented", "Imperative", "Functional", "Procedural"],
    correct: 2,
  },
  {
    question: "What is the approximate distance from the Earth to the Sun?",
    answers: ["150 million km", "384,000 km", "1.5 billion km", "57 million km"],
    correct: 0,
  },
  {
    question: "Which treaty established the European Union as it exists today?",
    answers: ["Treaty of Rome", "Treaty of Paris", "Maastricht Treaty", "Treaty of Lisbon"],
    correct: 2, // Signed in 1992, effective 1993
  },
  {
    question: "What does the 'S' stand for in the SOLID principles of software design?",
    answers: ["Scalability", "Single Responsibility", "Separation of Concerns", "Statelessness"],
    correct: 1,
  },
  {
    question: "Which economist wrote 'The Wealth of Nations' in 1776?",
    answers: ["John Maynard Keynes", "Karl Marx", "David Ricardo", "Adam Smith"],
    correct: 3,
  },
  {
    question: "In the human body, which organ produces insulin?",
    answers: ["Liver", "Kidneys", "Pancreas", "Adrenal gland"],
    correct: 2,
  },
];