import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { toggleGptSearchView } from "../store/gptSlice";
import { NETFLIX_LOGO, USER_DP, SUPPORTED_LANGUAGES } from "../utils/constants";
import { setLanguage } from "../store/languageSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  }

  function handleGptButtonClick() {
    dispatch(toggleGptSearchView());
  }

  function handleLanguageChange(event) {
    dispatch(setLanguage(event.target.value));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // user is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`w-screen px-8 absolute bg-gradient-to-b from-black z-10 justify-between flex`}
    >
      <img className="w-50" src={NETFLIX_LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex">
          <select
            className="m-4 py-2 px-5 h-10 bg-amber-700 cursor-pointer font-bold rounded-sm"
            onChange={handleLanguageChange}
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>

          <button
            className=" m-4 py-2 px-5 rounded-sm h-10 bg-purple-800 cursor-pointer font-bold"
            onClick={handleGptButtonClick}
          >
            GPT Search
          </button>

          <button
            className="m-4 py-2 px-4 rounded-sm h-10 bg-red-700 cursor-pointer font-bold"
            onClick={handleSignOut}
          >
            Sign out
          </button>
          <img
            className="w-10 h-10 m-4 rounded sm"
            alt="user-icon"
            src={user?.photoURL ? user.photoURL : { USER_DP }}
          />
        </div>
      )}
    </div>
  );
}
