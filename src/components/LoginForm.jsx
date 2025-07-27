import { useState } from "react";

export default function LoginForm() {
  const [signUp, setSignUp] = useState(false);
  return (
    <div className="w-3/12 absolute pl-8 pr-13 pb-10 pt-7 bg-black/85 rounded-sm my-50 mx-auto left-0 right-0 bg-">
      <h1 className=" text-white p-2 text-2xl pb-4 font-bold">
        {signUp ? "Sign up" : "Sign in"}
      </h1>
      <form>
        {signUp && (
          <input
            className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
            placeholder="Full Name"
            type="text"
          />
        )}
        <input
          className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
          placeholder="Email address"
          type="text"
        />
        <input
          className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
          placeholder="Password"
          type="password"
        />
        <button className="mx-2 my-4 p-4 bg-red-700 text-white text-1xl rounded-sm w-full">
          {signUp ? "Sign up" : "Sign in"}
        </button>
      </form>
      {!signUp ? (
        <p className="py-4 mx-2 text-white">
          New to Netflix?{" "}
          <button className="cursor-pointer" onClick={() => setSignUp(true)}>
            <p className="font-bold underline">Sign up Now!</p>
          </button>
        </p>
      ) : (
        <p className="py-4 mx-2 text-white">
          Already registered?{" "}
          <button className="cursor-pointer" onClick={() => setSignUp(false)}>
            <p className="font-bold underline">Sign in now!</p>
          </button>
        </p>
      )}
    </div>
  );
}
