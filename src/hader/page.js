import Link from "next/link";
import styles from "./hader.css";
import logo from "../app/public/logo.png"

const Header = () => {
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
          <Link href="/login">LOGIN</Link>
        </li>

        <li>
          <Link href="/Registration">CREATE ACCOUNT</Link>
        </li>

        <li>
          <Link href="/about">ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export { Header };
