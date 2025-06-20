// Replace this:
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(formData)
})

// With Firebase Realtime Database:
import { ref, push } from "firebase/database";
import { db } from "../firebase";

const handleSubmit = (formData) => {
  const messagesRef = ref(db, 'contactMessages');
  push(messagesRef, formData)
    .then(() => alert("Message sent!"))
    .catch((error) => console.error("Error:", error));
};