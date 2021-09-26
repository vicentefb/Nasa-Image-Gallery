import navStyles from "../styles/Nav.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/apod">Astronomy Picture of the Day</Link>
        </li>
        <li>
          <Link href="/epic">Earth Polychromatic Imaging Camera</Link>
        </li>
      </ul>
    </nav>
  );
}
