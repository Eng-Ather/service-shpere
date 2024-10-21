// //src/context/usercontext.js 
// "use client";

// import { createContext, useState, useEffect } from "react";
// import {
//   onAuthStateChanged,
//   auth,
//   collection,
//   query,
//   where,
//   getDocs,
//   db,
// } from "@/lib/firebase";

// // Create the context
// const UserContext = createContext();


// // Provider component
// function UserContextProvider({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [currentUserInfo, setCurrentUserInfo] = useState({
//     isLogin: false,
//     currentUserEmail: "",
//     currentUserField: "", 
//     currentUserImageURL: "",
//     currentUserName: "",
//     currentUserContact: "",
//     currentUserRoll: "",
//     currentUserId: {},
//   });

// //   useEffect(() => {
//     const status = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         console.log("User is logged in with UID:", user.email);

//         // Searching current user detail
//         const q = query(
//           collection(db, "usercollection"),
//           where("email", "==", user.email)
//         );

//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           // Storing current user detail to display profile
//           setCurrentUserInfo({
//             isLogin: true,
//             currentUserEmail: doc.data().email,
//             currentUserField: doc.data().field, // Corrected spelling from 'Feild' to 'Field'
//             currentUserImageURL: doc.data().image,
//             currentUserName: doc.data().name,
//             currentUserContact: doc.data().phone,
//             currentUserRoll: doc.data().roll,
//             currentUserId: { email: user.email },
//           });
//         });
//       } 
//       // Handle case where no user data is found
//       else {   
//         console.log("No user data found for this email."); 
//         setCurrentUserInfo({ isLogin: false, currentUserId: {} });
//         // setCurrentUserInfo({
//         //   isLogin: false,
//         //   currentUserEmail: "",
//         //   currentUserField: "",
//         //   currentUserImageURL: "",
//         //   currentUserName: "",
//         //   currentUserContact: "",
//         //   currentUserRoll: "",
//         //   currentUserId: {},
//         // });

//         console.log("User is signed out");
//       }
//       setLoading(false); // Set loading to false after checking user state
//     });

//     // Cleanup subscription on unmount
//     return () => status();
// //   }, []);

//   // Moved console log outside of return to avoid errors
//   console.log("User info:", currentUserInfo);

//   return (
//     <UserContext.Provider value={{ currentUserInfo }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export { UserContext, UserContextProvider };
// __________________________________________

"use client";
import { useState,useEffect, createContext } from "react";
import {
  onAuthStateChanged,
  auth,
  collection,
  query,
  where,
  getDocs,
  db,
} from "@/lib/firebase";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState("hello");

  const [currentUserInfo, setCurrentUserInfo] = useState({
        isLogin: false,
        currentUserEmail: "",
        currentUserField: "", 
        currentUserImageURL: "",
        currentUserName: "",
        currentUserContact: "",
        currentUserRoll: "",
        currentUserId: {},
      });

      // 
      useEffect(() => {
      const status = onAuthStateChanged(auth, async (user) => {
              if (user) {
                console.log("User is logged in with UID:", user.email);
        
                // Searching current user detail
                const q = query(
                  collection(db, "usercollection"),
                  where("email", "==", user.email)
                );
        
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                  // Storing current user detail to display profile
                  setCurrentUserInfo({
                    isLogin: true,
                    currentUserEmail: doc.data().email,
                    currentUserField: doc.data().field,
                    currentUserImageURL: doc.data().image,
                    currentUserName: doc.data().name,
                    currentUserContact: doc.data().phone,
                    currentUserRoll: doc.data().roll,
                    currentUserId: { email: user.email },
                  });
                });
              } 
              // Handle case where no user data is found
              else {   
                console.log("No user data found for this email."); 
                setCurrentUserInfo({ isLogin: false, currentUserId: {} });
                // setCurrentUserInfo({
                //   isLogin: false,
                //   currentUserEmail: "",
                //   currentUserField: "",
                //   currentUserImageURL: "",
                //   currentUserName: "",
                //   currentUserContact: "",
                //   currentUserRoll: "",
                //   currentUserId: {},
                // });
        
                console.log("User is signed out");
              }
              // setLoading(false); // Set loading to false after checking user state
            });
          }, []); 


  return (
    // <AuthContext.Provider value={{ userInfo, setUserInfo }}>
    <AuthContext.Provider value={{ currentUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
