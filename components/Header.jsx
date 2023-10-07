import Link from "next/link";
import styles from "./Header.module.css";

const pages = [
  { href: "/", name: "Home" },
  { href: "/users", name: "Users" },
];

export default function Header() {
  return (
    <header>
      <nav className={styles.nav}>
        <ul>
          {pages.map(({ href, name }) => (
            <li key={href}>
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
