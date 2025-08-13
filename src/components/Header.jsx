import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { toggleGptSearchView } from "../store/gptSlice";
import { NETFLIX_LOGO, USER_DP, SUPPORTED_LANGUAGES } from "../utils/constants";
import { setLanguage } from "../store/languageSlice";
import lang from "../utils/languageConstants";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

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
    <div className="w-screen px-4 sm:px-8 py-2 fixed top-0 left-0 bg-gradient-to-b from-black z-50 flex flex-wrap md:flex-nowrap justify-between items-center">
      <img className="w-24 sm:w-32" src={NETFLIX_LOGO} alt="netflix-logo" />

      <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
        <select
          className="py-1 px-3 h-9 bg-amber-700 cursor-pointer font-bold rounded-sm text-sm md:text-base"
          onChange={handleLanguageChange}
          value={currentLanguage}
        >
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>

        {user && (
          <>
            <button
              className="py-1 px-3 rounded-sm h-9 bg-purple-800 cursor-pointer font-bold text-sm md:text-base"
              onClick={handleGptButtonClick}
            >
              {!showGptSearch
                ? lang[currentLanguage].gpt_search_button_txt
                : lang[currentLanguage].homepage}
            </button>

            <button
              className="py-1 px-3 rounded-sm h-9 bg-red-700 cursor-pointer font-bold text-sm md:text-base"
              onClick={handleSignOut}
            >
              {lang[currentLanguage].sign_out_button_txt}
            </button>

            <img
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm"
              alt="user-icon"
              src={user?.photoURL ? user.photoURL : USER_DP}
            />
          </>
        )}
      </div>
    </div>
  );
}
