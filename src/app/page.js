"use client";
import Image from "next/image";
import { Header } from "@/hader/page";
import { Button } from "@/components/ui/button";
import { collection, getDocs, db } from "@/lib/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextProvider } from "@/context/usercontext";

const Home = () => {
  const { currentUserInfo } = useContext(AuthContext);
  
  console.log(currentUserInfo);

  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersData = await getDocs(collection(db, "usercollection"));
        const onlyClientData = [];
        allUsersData.forEach((doc) => {
          if (doc.data().roll === "client") {
            // Store only client data in collection
            onlyClientData.push(doc.data());
          }
          setData(onlyClientData); //updating the retrived data that can be use to display cards
        });
      } catch (error) {
        // console.error("Error fetching data: ", error);
        setError("Error fetching data: " + error.message); // Update error state while fatching data
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData(); // Calling function to fetch all cleint/servise provider data
  }, []);

  return (
    <div className=" ">
      <Header />

      <div className="title_bar">
        <h1
          className="text-2xl text-red-500 font-extrabold m-3 "
          style={{ textShadow: "-2px 1px 3px black" }}
        >
          Here, Skills Connect with Your Needs !
        </h1>
      </div>

      <main className="hero_section">
        {loading ? (
          "loading..."
        ) : (
          <div>
            {data.map((item, index) => (
              <div className=" client_profile card" key={index}>
                <div>
                  <h1 className="font-bold">{item.name}</h1>
                  <p>{item.feild}</p>
                  <p className="text-sm underline text-gray-400">
                    {currentUserInfo.isLogin ? (
                    <div>
                    {item.phone}
                    <br />
                    <a
                      href={`https://wa.me/${item.phone}`} // Use dynamic phone number
                      target="_blank"
                      rel="noopener noreferrer" // Security best practice
                      className="whatsapp-button" // Changed to className
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                    ) : (
                      <p>
                        please <b> Login </b> to get contact number
                       
                      </p>
                    )}
                  </p>
                </div>
                <div>
                  {
                    <img
                      style={{ width: "80px", height: "70px" }}
                      src={item.image}
                      alt="image"
                    />
                  }
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="m-5 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* next.js logo/image */}
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
};

export default Home;
