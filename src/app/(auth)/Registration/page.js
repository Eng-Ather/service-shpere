// main registration page

import styles from "../../(auth)/signin_signup.css"; // Ensure this path is correct
import Link from "next/link";
import logo from "../../public/logo.png"
import { Button } from "@/components/ui/button";

const RegistrationPage = () => {
  return (
    <>
      <div className="center_box">
        <div className="image_box">
          <img
            src={logo.src}
            style={{ width: "300px", height: "180px", margin: "0px auto" }}
            alt="Logo"
          />
        </div>

        <div className="option_box">
         
          <Link href="/Registration/registerAsAclient" passHref>
            <Button variant="destructive" >
            Register as Client</Button>
          </Link>

          <Link href="/Registration/registerAsAcostumer" passHref>
            <Button variant="destructive">
            Register as Costumer</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
