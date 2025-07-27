import Header from "./Header";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="relative h-screen w-screen overflow-hidden overflow-y-auto">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
          alt="bg-image"
          className="max-w-none"
        />
      </div>

      <LoginForm />
    </div>
  );
}
