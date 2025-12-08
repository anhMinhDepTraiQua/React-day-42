import { Link } from "react-router";
import { useGetCurrentUserQuery } from "../services/auth";

export default function Header() {
  const { data: user } = useGetCurrentUserQuery();

  return (
    <header className="p-4 flex justify-between items-center bg-gray-100 shadow">
      <h1 className="text-xl font-bold">My App</h1>

      <div>
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <span className="text-lg">Hi, {user.firstName}</span>
        )}
      </div>
    </header>
  );
}
