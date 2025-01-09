import { useState } from "react";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import "../pages/styles/auth.css";

const Auth = () => {
    const [isSignIn, setIsSIgnIn] = useState(true);

    const onRegisterClick = () => {
        if (isSignIn) {
            setIsSIgnIn(false);
        }
    }

    const onSignInClick = () => {
       if (isSignIn === false) {
            setIsSIgnIn(true);
       }
    }

  return (
    <div>
        <div className="show-form">
            <button className={ isSignIn ? "show-button chosen": "show-button"} onClick={onSignInClick}>Sign In</button>

            <button className={ isSignIn ? "show-button": "show-button chosen"} onClick={onRegisterClick}>Register</button>
        </div>
        <div className="form">
            {isSignIn && <SignIn/>}
            {!isSignIn && <SignUp/>}
        </div>
    </div>
  )
}

export default Auth;
