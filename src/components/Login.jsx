import { BACKGROUND_IMAGE } from "./../utils/constants";
import Header from "./Header";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="relative h-screen w-screen overflow-hidden overflow-y-auto">
      <Header />
      <div className="absolute">
        <img src={BACKGROUND_IMAGE} alt="bg-image" className="max-w-none" />
      </div>

      <LoginForm />
    </div>
  );
}
