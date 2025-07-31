import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  }
  return (
    <div className="w-screen px-8 absolute bg-gradient-to-b from-black z-10 justify-between flex">
      <img
        className="w-50"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
      />
      {user && (
        <div className="flex">
          <img
            className="w-10 h-10 m-4 rounded sm"
            alt="user-icon"
            src={
              user?.photoURL
                ? user.photoURL
                : "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
            }
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
