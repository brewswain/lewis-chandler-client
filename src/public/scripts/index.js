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
