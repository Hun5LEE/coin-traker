import { useParams, Outlet, Link } from "react-router-dom";

export default function User() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User{userId}</h1>
      <hr />
      <Link to="followers">See followers</Link>
      <Outlet />
    </div>
  );
}
