import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInTraditional } from "../services/apiAuth";
import { useUserContext } from "../../contexts/userContext";

export default function LogIn() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logInTraditional,
    onSuccess: (data) => {
      const { _id: userId, username } = data;

      setUser({ userId, username });

      setUsernameOrEmail("");
      setPassword("");
      setError("");

      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      setError("One or both fields are empty!");
      return;
    }

    const userInfo = {
      usernameOrEmail,
      password,
    };

    mutation.mutate(userInfo);
  };

  return (
    <section className="flex items-center justify-center h-full bg-gray-300">
      <div className="w-[80%] md:w-[60%] lg:w-[650px] bg-white rounded-md items-center flex flex-col py-14 gap-12">
        <div className="w-30 h-30 bg-gray-400 items-center flex justify-center">
          <p>Logo Here</p>
        </div>
        <form
          className="flex flex-col gap-6 w-full px-24"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            id="username"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Enter your username or email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            id="password"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="h-[24px]">
            <p
              className={`${
                error ? "opacity-100" : "opacity-0"
              } text-red-500 text-center`}
            >
              {error}
            </p>
          </div>
          <button
            type="submit"
            className="rounded-lg py-1 text-white not-disabled:bg-blue-400 disabled:bg-gray-400 not-disabled:hover:cursor-pointer"
          >
            Log In
          </button>
        </form>
        {/* <section className="flex flex-col gap-4 justify-center items-center">
          <p className="text-gray-500">Other sign up options:</p>
          <div className="flex gap-8">
            <div className="bg-gray-500 w-8 h-8 rounded-lg">GH</div>
            <div className="bg-gray-500 w-8 h-8 rounded-lg">Gg</div>
          </div>
        </section> */}
      </div>
    </section>
  );
}
