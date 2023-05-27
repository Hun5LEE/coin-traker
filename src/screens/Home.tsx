import { users } from "../db";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}> {user.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
