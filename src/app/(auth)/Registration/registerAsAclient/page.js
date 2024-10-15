// Client Regrestration Page

"use client";

import { useState } from "react";
import styles from "../../../(auth)/signin_signup.css";
import logo from "../../../public/logo.png";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/firebase";
import {createUserWithEmailAndPassword} from "@/lib/firebase";



const ClientRegrestrationPage = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [clientName, setClientName] = useState("")
  const [clientWorkFeild, setClientWorkFeild] = useState(" ")
  const [clientImage, setClientImage] = useState(null)
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Email: ",clientEmail,  "contact no : ",clientContact,  "password: ",clientPassword,
                 "name: ",clientName,  "work feild : ", clientWorkFeild);

    // Signed up functio
    createUserWithEmailAndPassword(auth, clientEmail, clientPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("login successfully ---> ", user );
        alert("Registration successful " );

         // Clear all fields
      setClientName("");
      setClientEmail("");
      setClientPassword("");
      setClientContact("");
      setClientWorkFeild("");
      setClientImage(null);
      

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
                  setClientImage(e.target.value);
                }}
              />
            </div>

            <Button type="submit" variant="destructive">
              {" "}
              Submit{" "}
            </Button>
          </form>

          {/* <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="client_fname"
            // value={formData.firstName}
            onChange={(e)=>{setFirstName(e.target.value); console.log(firstName);
            }}
          />
        </div> */}

          {/* <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="client_lname"
            // value={formData.lastName}
            onChange={handleChange}
          />
        </div> */}
          {/* <div>
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            name="image"
            type="file"
            required
            className="client_image"
            // onChange={handleFileChange}
          />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default ClientRegrestrationPage;
