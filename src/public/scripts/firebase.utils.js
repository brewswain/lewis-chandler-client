var firebaseConfig = {
  // place your firebaseConfig options here as needed
};

firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore();

let submitButton = document.querySelector(".submit-button");
let userName = document.querySelector("#user-name");
let userEmail = document.querySelector("#user-email");
let userMessage = document.querySelector("#user-message");

const db = firestore.collection("Place your Firestore collection Path here");

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
