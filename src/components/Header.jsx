import { auth } from "../../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../../store/userSlice";
import { NETFLIX_LOGO, USER_DP } from "../../utils/constants";

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
    <div className="w-screen px-8 absolute bg-gradient-to-b from-black z-10 justify-between flex">
      <img className="w-50" src={NETFLIX_LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex">
          <img
            className="w-10 h-10 m-4 rounded sm"
            alt="user-icon"
            src={user?.photoURL ? user.photoURL : { USER_DP }}
          />
          <button
            className="m-4 p-2 rounded-sm h-10 bg-red-700 cursor-pointer font-bold"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
