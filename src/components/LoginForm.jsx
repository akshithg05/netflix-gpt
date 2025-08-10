import { useState, useRef } from "react";
import { validateEmailAndPassword, validateName } from "./../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./../store/userSlice";
import { USER_DP, FIREBASE_AUTH_ERROR_CODES } from "./../utils/constants";
import lang from "../utils/languageConstants";

export default function LoginForm() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

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
      password.current.value,
      currentLanguage
    );

    const isNameValid = signUp
      ? validateName(name.current.value, signUp)
      : true;
    setNameValidation(isNameValid);
    setValidation(result);

    // If there is email error, password error or name error return from the function
    if (result.email || result.password || !isNameValid) {
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
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_DP,
          })
            .then(() => {
              // using auth.currentUser instead of user because photoURL and displayName of user
              // is not yet updated. We need to get the current user from auth
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              setIsLoading(false);
            })
            .catch((error) => {
              setError(true);
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === FIREBASE_AUTH_ERROR_CODES.EMAIL_ALREADY_IN_USE) {
            setErrorMessage(lang[currentLanguage].user_already_exists);
          } else {
            setErrorMessage(lang[currentLanguage].unknown_error);
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

          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          setError(true);
          if (errorCode === FIREBASE_AUTH_ERROR_CODES.INVALID_CREDENTIAL) {
            setErrorMessage(lang[currentLanguage].incorrect_username_password);
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-3/12 absolute pl-8 pr-13 pb-10 pt-7 bg-black/85 rounded-sm my-50 mx-auto left-0 right-0">
      <h1 className="text-white p-2 text-2xl pb-4 font-bold">
        {signUp ? lang[currentLanguage].sign_up : lang[currentLanguage].sign_up}
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
              placeholder={lang[currentLanguage].full_name}
              type="text"
            />
            {!nameValidation && (
              <p className="mx-2 text-red-600">
                {lang[currentLanguage].name_cannot_be_empty}
              </p>
            )}
          </>
        )}

        <input
          ref={email}
          className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
          placeholder={lang[currentLanguage].email}
          type="text"
        />
        {validation.email && (
          <p className="mx-2 text-red-600">{validation.email}</p>
        )}

        <input
          ref={password}
          className="mx-2 my-4 p-4 bg-gray-700 text-white rounded-sm w-full"
          placeholder={lang[currentLanguage].password}
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
            ? lang[currentLanguage].signing_up
            : isLoading && !signUp
            ? lang[currentLanguage].signing_in
            : !isLoading && signUp
            ? lang[currentLanguage].sign_up
            : lang[currentLanguage].sign_in}
        </button>
      </form>

      {!signUp ? (
        <p className="py-4 mx-2 text-white">
          {lang[currentLanguage].new_to_netflix}{" "}
          <button className="cursor-pointer" onClick={() => setSignUp(true)}>
            <p className="font-bold underline">
              {lang[currentLanguage].sign_up_now}
            </p>
          </button>
        </p>
      ) : (
        <p className="py-4 mx-2 text-white">
          {lang[currentLanguage].already_registered}{" "}
          <button className="cursor-pointer" onClick={() => setSignUp(false)}>
            <p className="font-bold underline">
              {lang[currentLanguage].sign_in_now}
            </p>
          </button>
        </p>
      )}
    </div>
  );
}
