export default function SignUp() {
  return (
    <section className="flex items-center justify-center h-full bg-gray-300 ">
      <div className="w-[80%] md:w-[60%] lg:w-[650px] bg-white  rounded-md items-center flex flex-col py-14 gap-12">
        <div className="w-30 h-30 bg-gray-400 items-center flex justify-center">
          <p>Logo Here</p>
        </div>
        <form className="flex flex-col gap-6 w-full px-24">
          <input
            type="text"
            name="username"
            id="username"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Enter your username"
          />
          <input
            type="text"
            name="email"
            id="email"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Enter your email"
          />
          <input
            type="text"
            name="emailConfirm"
            id="emailConfirm"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Re-enter your email"
          />
          <input
            type="password"
            name="password"
            id="password"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Enter your password"
          />
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            className="focus:outline-0 border-2 border-gray-300/60 rounded-md py-1 px-2"
            placeholder="Re-enter your password"
          />
          <button
            type="submit"
            className="bg-gray-400 rounded-lg py-1 text-white"
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
