// login page
"use client"

import {signInWithEmailAndPassword} from "@/lib/firebase"
import { auth } from "@/lib/firebase";
import { useState } from "react";
import styles from "../../(auth)/signin_signup.css"; // Ensure this path is correct
import logo from "../../public/logo.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import from next/navigation for the App Router


const LoginPage = () => {
  const router = useRouter(); // Initialize useRouter
  // ____usestate hooks

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
       console.log("Login successful");
       router.push("/"); // Redirect to home page
       alert("Login successful")

    } catch (error) {
      //  setError(error.message); // Set the error message
      //  console.log("Login error:", error.message);
       alert(error.message)
      }
    };


  return (
    <>

      <div className="Login_box">
        <div className="login_image">
          <img
            src={logo.src}
            style={{ width: "300px", height: "180px", margin: "0px auto" }}
            alt="Logo"
          />
        </div>

        <h2 className="text-center text-white bg-red-500"> Sign in </h2>

          <form onSubmit={handleSubmit} className="login_form">
            
            <div>
              <label>Email:</label>
              <input
                type="email"
                required
                className="current_user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                required
                className="current_user_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
              />
            </div>

            {/* {error && <p className="error-message">{error}</p>} */}

            <Button type="submit" variant='destructive'>Submit</Button>
          </form>
        </div>
    </>
  );
};

export default LoginPage;
