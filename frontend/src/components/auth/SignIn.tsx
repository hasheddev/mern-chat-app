import React, { useState } from "react";

import "./styles/sign.css";
import { ErrorMessage } from "../../types";
import { useUserContext } from "../../contexts/UserContext";
import { signIn } from "../../apiClient";
import { useNavigate } from "react-router";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<ErrorMessage>({message: ""});

    const navigate = useNavigate();
    const {setUser, isLoggedIn} = useUserContext();

    if (isLoggedIn) {
        navigate("/chat");
    }

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const onPassWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onSubmit = async (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await signIn({email, password});
        if ("message" in data) {
            setError({message: data.message})
        } else {
            setUser(data);
            navigate("/chat");
        }
    }

  return (
    <div className="container">
      <p>Continue your conversation</p>
      <form className="form"  onSubmit={onSubmit}>         
            <label className="input-label" htmlFor="mail">Email</label>
            <input className="input" type="email" id="mail" placeholder="Email" value={email} onChange={onEmailChange} />

            <label className="input-label" htmlFor="pass">Password</label>
            <input className="input" type="password" id="pass" placeholder="password" value={password} onChange={onPassWordChange}/>

            <button className="input button">Login</button>
            {error.message && <span className="span-small error"> Error finding user</span>}
            <span className="span-small">
                No Account? Register to start chatting
            </span>
        </form>
    </div>
  )
}

export default SignIn;
