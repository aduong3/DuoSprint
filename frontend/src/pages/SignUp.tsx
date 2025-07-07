import { useMutation } from "@tanstack/react-query";
import { signUpTraditional } from "../services/apiAuth";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: signUpTraditional,
    onSuccess: () => {
      console.log("Success!");
      setUsername("");
      setEmail("");
      setEmailConfirm("");
      setPassword("");
      setPasswordConfirm("");
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

    if (!username || !email || !emailConfirm || !password || !passwordConfirm) {
      setError("One of the fields is empty!");
    }

    const newUser = {
      username,
      email,
      emailConfirm,
      password,
      passwordConfirm,
      authProvider: "local",
    };

    mutation.mutate(newUser);
  };

  return (
    <section className="flex items-center justify-center h-full bg-gray-300 ">
      <div className="w-[80%] md:w-[60%] lg:w-[650px] bg-white  rounded-md items-center flex flex-col py-14 gap-12">
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
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="email"
            id="email"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="emailConfirm"
            id="emailConfirm"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Re-enter your email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
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
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Re-enter your password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
            className="bg-gray-400 rounded-lg py-1 text-white hover:cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <section className="flex flex-col gap-4 justify-center items-center">
          <p className="text-gray-500">Other sign up options:</p>
          <div className="flex gap-8">
            <div className="bg-gray-500 w-8 h-8 rounded-lg">GH</div>
            <div className="bg-gray-500 w-8 h-8 rounded-lg">Gg</div>
          </div>
        </section>
      </div>
    </section>
  );
}
