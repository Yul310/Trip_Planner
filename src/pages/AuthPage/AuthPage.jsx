import { useState } from "react";
// import './AuthPage.css';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    //   <main>
    //   <h1>AuthPage</h1>
    //   <SignUpForm setUser={setUser} />
    //   <LoginForm setUser={setUser} />
    // </main>

    //testing so only signup or login show
    <>
      <main className="flex flex-col h-screen">
        <div
          className="bg-[#CFFCFF] px-24 flex mt-60 mb-[-235px] z-0 "
          id="diagonal"
        >
          <p>&nbsp;</p>
        </div>
        <div className="" id="rotate">
          <div className="bg-stone-800 px-10 flex mt-10" id="diagonal">
            <div className="text-[8.5rem] mb-[-29px]" id="revdiagonal">
              <Logo />
              {/* <div className="bg-[#7b7e63] px-10"></div>{" "} */}
            </div>
          </div>
        </div>
        <div className="mt-20 relative">
          {showLogin ? (
            <LoginForm setUser={setUser} />
          ) : (
            <SignUpForm setUser={setUser} />
          )}
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="mt-0 bg-[#1f1f1f] text-white font-medium py-2 px-4 rounded hover:ring hover:ring-orange-400"
          >
            {showLogin ? "SIGN UP" : "LOG IN"}
          </button>
        </div>
      </main>
    </>
  );
}
