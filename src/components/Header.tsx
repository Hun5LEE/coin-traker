import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/"></Link>
        </li>
        <li>
          <Link to="/about"></Link>
        </li>
      </ul>
    </header>
  );
}
