// Costumer Regrestration Page
"use client"

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Ensure correct import
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for the App Router
import styles from "../../../(auth)/signin_signup.css"; // Adjust path as necessary
import logo from "../../../public/logo.png";
import { Button } from "@/components/ui/button";

const CostumerRegrestrationPage = () => {
  const router = useRouter(); // Initialize useRouter

// ___use state hooks 
const [customerEmail, setCustomerEmail] = useState("");
const [customerPassword, setCustomerPassword] = useState("");
const [customerContact, setCustomerContact] = useState("");

 // Handle form submission
 const handleSubmit = (e) => {
  e.preventDefault();
 
  console.log(
    "Email",
    customerEmail,
    "contact no : ",
    customerContact,
    "password: ",
    customerPassword
  );

  // Signed up functio
  createUserWithEmailAndPassword(auth, customerEmail, customerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log("login successfully ---> ", user );
      alert("Registration successful " );
      router.push("/"); // Redirect to home page

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorMessage);
      alert(errorMessage);

      
      // ..
    });
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
          Register As A Costumer
        </h2>

        <div className="registration_form">
         
          <form className="registration_form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="email"
                required
                className="costumer_email"
                onChange={(e) => {setCustomerEmail(e.target.value)}}
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                required
                className="costumer_password"
                onChange={(e) => {setCustomerPassword(e.target.value) }}
              />
            </div>

            <div>
              <label htmlFor="contact">Contact No:</label>
              <input
                name="contact"
                type="tel"
                required
                className="costumer_contact"
                onChange={(e) => {setCustomerContact(e.target.value)}}
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

export default CostumerRegrestrationPage;
