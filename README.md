# Lewis Chandler Consultation Static Website

## Basic Overview

As per client's request, a simple landing page was made for their consultation business.

Please note that due to the incomplete nature of this project there may be some commented out code that will be cleaned up when production status is achieved.

<br/>

---

## Rationale for Tech Stack

Due to agreement that the client wished to handle maintenance of the Web App provided, I elected to construct this App using vanilla HTML/CSS/Javascript for ease of use.

Again, for ease of maintenance, it was decided to host this project on [Google Firebase](firebase.google.com) so that I may gain access to their robust Firestore database system.

<br/>

---

## Contact Form

To ensure that the Contact form would send emails, [SendGrid](sendgrid.com) was used. The contact form was designed to add a new document to firestore whenever a user filled out the information needed and hit the submit button:

```
let submitButton = document.querySelector(".submit-button");
let userName = document.querySelector("#user-name");
let userEmail = document.querySelector("#user-email");
let userMessage = document.querySelector("#user-message");

const db = firestore.collection("Insert collection here");

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
```

<br />

Once the information reaches our firestore database in question, it will trigger a cloud function that upon creation of said document, will send a request to our SendGrid API with the information that we added:

```
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDGRID_TEMPLATE_KEY = functions.config().sendgrid.template;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const db = admin.firestore();

exports.firebaseEmail = functions.firestore
  .document("form/{formId}/messages/{messageId}")
  .onCreate(async (change, context) => {
    const formSnap = await db
      .collection("form")
      .doc(context.params.messageId)
      .get();

    const form = formSnap.data() || {};
    const message = change.data() || {};

    const msg = {
      to: "test@email.com",
      from: "test-email@test.com",
      templateId: SENDGRID_TEMPLATE_KEY,
      dynamic_template_data: {
        name: message.name,
        email: message.email,
        message: message.message
      }
    };

    return sgMail.send(msg);
  });

```

Please note that I set my API and Template keys for sendgrid within my firebase config by using:

```
firebase functions:config:set sendgrid.key=Insert_API_key_here
firebase functions:config:set sendgrid.template=Insert_template_key_here
```

<br>

---

## Design Considerations Roadmap

- [x] Landing Page segment must have low-rise/high-rise buildings as a hero (Slick JS was used for this).
- [x] Template for Projects placed in html/CSS files for future expansion
- [x] Contact Form functionality
- [X] Fully responsive Design
- [X] Footer Must have association with another company for legal purposes.
