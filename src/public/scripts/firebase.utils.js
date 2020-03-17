var firebaseConfig = {
  apiKey: "AIzaSyA24j5gmllEW6suZ9i2d6m2prN1hzGxwDY",
  authDomain: "lewis-chandler.firebaseapp.com",
  databaseURL: "https://lewis-chandler.firebaseio.com",
  projectId: "lewis-chandler",
  storageBucket: "lewis-chandler.appspot.com",
  messagingSenderId: "182950707466",
  appId: "1:182950707466:web:06a649c3256dd17061baf3",
  measurementId: "G-LLB1L8EFLG"
};

firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore();

let submitButton = document.querySelector(".submit-button");
let userName = document.querySelector("#user-name");
let userEmail = document.querySelector("#user-email");
let userMessage = document.querySelector("#user-message");

const db = firestore.collection("form/jBy2TzqoK111otl2x6Qa/messages");

submitButton.addEventListener("click", () => {
  let userNameInput = userName.value;
  let userEmailInput = userEmail.value;
  let userMessageInput = userMessage.value;

  db.doc()
    .set({
      name: userNameInput,
      email: userEmailInput,
      message: userMessageInput
    })
    .then(() => {
      console.log("Data Saved");
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
    });
});
