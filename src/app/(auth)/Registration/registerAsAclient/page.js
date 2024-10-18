// Client Regrestration Page

"use client";

import { useState } from "react";
import styles from "../../../(auth)/signin_signup.css";
import logo from "../../../public/logo.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import from next/navigation for the App Router
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "@/lib/firebase";
import {
  addDoc,
  collection,
  db,
  ref,
  uploadBytes,
  getDownloadURL,
  storage,
} from "@/lib/firebase";

const ClientRegrestrationPage = () => {
  const router = useRouter(); // Initialize useRouter

  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientWorkFeild, setClientWorkFeild] = useState(" ");
  const [clientImage, setClientImage] = useState(null);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        clientEmail,
        clientPassword
      );
      const user = userCredential.user;

      // Handle image upload
      let imageUrl = "";
      if (clientImage) {
        const imageRef = ref(storage, `clientImage/${user.uid}`); // Create a reference with the user's UID
        await uploadBytes(imageRef, clientImage); // Upload the file
        imageUrl = await getDownloadURL(imageRef); // Get the download URL of the uploaded image
      }

      // After successful registration, update customer details in Firestore
      const docRef = await addDoc(collection(db, "usercollection"), {
        roll: "client",
        name: clientName,
        email: clientEmail,
        phone: clientContact,
        feild: clientWorkFeild,
        image: imageUrl
      });

      console.log("Document written with ID:", docRef.id);
      alert("Registration successful");
      router.push("/"); // Redirect to home page

      // Clear all fields
      setClientName("");
      setClientEmail("");
      setClientPassword("");
      setClientContact("");
      setClientWorkFeild("");
      setClientImage(null);
    } catch (error) {
      // Handle errors from Firebase and Firestore
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <>
      <div className="registration_box">
        <div className="registration_image">
          <img
            src={logo.src}
            style={{ width: "300px", height: "180px", margin: "0px auto" }}
            alt="Logo"
          />
        </div>

        <h2 className="text-center text-white bg-red-500">
          Register As A Client
        </h2>

        <div className="registration_form">
          <form className="registration_form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fname">Name:</label>
              <input
                name="name"
                type="text"
                required
                className="client_name"
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="email"
                required
                className="client_email"
                onChange={(e) => {
                  setClientEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                maxLength={12}
                className="client_password"
                onChange={(e) => {
                  setClientPassword(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="contact">Contact No:</label>
              <input
                name="contact"
                type="tel"
                required
                className="client_contact"
                onChange={(e) => {
                  setClientContact(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="workFeild">Work/Feild</label>
              <input
                name="workFeild"
                type="text"
                required
                className="client_workFeild"
                onChange={(e) => {
                  setClientWorkFeild(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="image">Image:</label>
              <input
                name="image"
                type="file"
                required
                className="client_image"
                onChange={(e) => {
                  setClientImage(e.target.files[0]);
                }}
              />
            </div>

            <Button type="submit" variant="destructive">
              {" "}
              Submit{" "}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientRegrestrationPage;
