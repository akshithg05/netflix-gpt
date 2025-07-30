import { useState, useRef } from "react";
import { validateEmailAndPassword, validateName } from "../../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [nameValidation, setNameValidation] = useState(true);
  const [validation, setValidation] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleFormSubmit = () => {
    const result = validateEmailAndPassword(
      email.current.value,
      password.current.value
    );

    const isNameValid = signUp
      ? validateName(name.current.value, signUp)
      : true;
    setNameValidation(isNameValid);
    setValidation(result);

    // If there is email error, password error or name error return from the function
    if (result.email || result.password || !isNameValid) {
      console.log("Validation error:", result);
      return;
    }
    // Sign up logic
    if (signUp) {
      setIsLoading(true);
      setError(false);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setErrorMessage(
              "User already exists. Try signing in or use another email to sign up."
            );
          } else {
            setErrorMessage(
              "There was an unknown error. Please try again later"
            );
          }
          setError(true);
          setIsLoading(false);
        });
    } else {
      // Sign in
      setError(false);
      setIsLoading(true);
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          setError(true);
          if (errorCode === "auth/invalid-credential") {
            setErrorMessage("Incorrect username/ password.");
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-3/12 absolute pl-8 pr-13 pb-10 pt-7 bg-black/85 rounded-sm my-50 mx-auto left-0 right-0">
      <h1 className="text-white p-2 text-2xl pb-4 font-bold">
        {signUp ? "Sign up" : "Sign in"}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
        {error && (
          <div className="bg-[rgb(216,157,49)] mx-2 p-4 w-full rounded-sm font-bold text-black">
            {errorMessage}
          </div>
        )}
        {signUp && (
          <>
            <input
              ref={name}
              className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
              placeholder="Full Name"
              type="text"
            />
            {!nameValidation && (
              <p className="mx-2 text-red-600">Name cannot be empty</p>
            )}
          </>
        )}

        <input
          ref={email}
          className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
          placeholder="Email address"
          type="text"
        />
        {validation.email && (
          <p className="mx-2 text-red-600">{validation.email}</p>
        )}

        <input
          ref={password}
          className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
          placeholder="Password"
          type="password"
        />
        {validation.password && (
          <p className="mx-2 text-red-600">{validation.password}</p>
        )}

        <button
          className="mx-2 my-4 p-4 bg-red-700 text-white text-1xl rounded-sm w-full cursor-pointer disabled:bg-red-900 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && signUp
            ? "Signing up..."
            : isLoading && !signUp
            ? "Signing in..."
            : !isLoading && signUp
            ? "Sign up"
            : "Sign in"}
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
