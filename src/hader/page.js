"use client";
import Link from "next/link";
import styles from "./hader.css";
import logo from "../app/public/logo.png";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import {
  auth,
  onAuthStateChanged,
  signOut,
  collection,
  query,
  where,
  getDocs,
  db,
} from "@/lib/firebase";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
// import { auth, signOut } from "@/lib/firebase";

const Header = () => {
  const [currentUserInfo, setCurrentUSerInfo] = useState({
    isLogin: false,
    currentUserEmail: " ",
    currentUserFeild: " ",
    currentUserImageURL: " ",
    currentUserName: " ",
    currentUserContact: " ",
    currentUserRoll: " ",

    currentUserId: {},
  });

  useEffect(() => {
    const status = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("User is logged in with UID:", user.email);

        // searching current user detail
        const q = query(
          collection(db, "usercollection"),
          where("email", "==", user.email)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          // console.log(doc.data().phone);

          // storing current user detail to display profile
          setCurrentUSerInfo({
            isLogin: true,
            currentUserEmail: doc.data().email,
            currentUserFeild: doc.data().feild,
            currentUserImageURL: doc.data().image,
            currentUserName: doc.data().name,
            currentUserContact: doc.data().phone,
            currentUserRoll: doc.data().roll,
            currentUserId: { email: user.email },
          });
        });
      } else {
        setCurrentUSerInfo({
          isLogin: false,
          currentUserEmail: " ",
          currentUserFeild: " ",
          currentUserImageURL: " ",
          currentUserName: " ",
          currentUserContact: " ",
          currentUserRoll: " ",
          currentUserId: {},
        });

        console.log("User is signed out");
      }
    });
  }, []);

  // logout functio
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setCurrentUSerInfo({
          isLogin: false,
          currentUserId: {},
        });
        console.log("User signed out successfully.");
        // You can redirect the user or update the UI here
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  // logout functio
  const editProfile = () => {};

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <img
              src={logo.src}
              style={{ width: "50px", height: "50px", borderRadius: "30px" }}
              alt="Logo"
            />
          </Link>
        </li>

        <li>
          <Link href="/">HOME</Link>
        </li>

        <li>
          <Link href="/about">ABOUT</Link>
        </li>

        <li>
          {currentUserInfo.isLogin ? (
            <Sheet>
              <SheetTrigger>My Profile</SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderBottom: "8px solid red",
                      marginTop: "20px",
                    }}
                  >
                    {currentUserInfo.currentUserName.toLocaleUpperCase()}
                  </SheetTitle>
                </SheetHeader>

                <SheetDescription className="text-center">
                  <img
                    style={{
                      margin: "20px auto",
                      width: "200px",
                      height: "185px",
                      borderRadius: "100px",
                    }}
                    src={currentUserInfo.currentUserImageURL}
                    alt="image"
                  ></img>
                  <p>{currentUserInfo.currentUserFeild}</p>
                  <p>{currentUserInfo.currentUserRoll}</p>
                  <p>{currentUserInfo.currentUserContact}</p>
                  <p>{currentUserInfo.currentUserEmail}</p>
                  {/* rating */}
                </SheetDescription>

                <div
                  style={{
                    height: "70px",
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Button onClick={editProfile} variant="destructive">
                    Edit Profile
                  </Button>
                  <Button onClick={logoutUser} variant="destructive">
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Link href="/login">LOGIN</Link>
          )}
        </li>

        <li>
          {currentUserInfo.isLogin ? (
            <Button onClick={logoutUser}>Logout</Button>
          ) : (
            <Link href="/Registration">CREATE ACCOUNT</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export { Header };
