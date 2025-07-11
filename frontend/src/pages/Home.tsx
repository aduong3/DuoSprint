import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="py-3 px-2">
      <Link
        to="/accounts/signup"
        className="text-xl bg-gray-200 py-1 px-2 rounded-lg"
      >
        Sign Up
      </Link>
      <Link
        to="/accounts/login"
        className="text-xl bg-gray-200 py-1 px-2 rounded-lg"
      >
        Log In
      </Link>
    </div>
  );
}
