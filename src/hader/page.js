"use client";
import Link from "next/link";
import styles from "./hader.css";
import logo from "../app/public/logo.png";
import { useState, useEffect } from "react";
import { auth, onAuthStateChanged, signOut } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
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
    currentUserId: {},
  });

  useEffect(() => {
    const status = onAuthStateChanged(auth, (user) => {
      if (user) {
        // setIsLogin(true);
        setCurrentUSerInfo({
          isLogin: true,
          currentUserId: { email: user.email },
        });

        console.log("User is logged in with UID:", user.email);
      } else {
        // setIsLogin(false);
        setIsLogin = "fals";
        console.log("User is signed out");
      }
    });

    // Cleanup subscription on unmount
    return () => status();
  }, []);

  // logout functio
  const logoutUser = () => {
    // const auth = getAuth();

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
                  <SheetTitle>{currentUserInfo.currentUserId.email}</SheetTitle>
                  <SheetDescription>
                    <p>gjg,gc,jg,ghcccccccccccc</p>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
                <Button onClick={logoutUser} variant="destructive">
                  Logout
                </Button>
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
