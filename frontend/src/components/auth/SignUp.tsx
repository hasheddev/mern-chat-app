import { useState } from "react";

import "./styles/sign.css";
import { ErrorMessage, SignUpData } from "../../types";
import { registerUser } from "../../apiClient";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

const SignUp = () => {
    const [formData, setFormData] = useState<SignUpData>({
        email: "",
        password: "",
        comfirmPassword: "",
        firstName: "",
        lastName: "",
        userName: "",
    });

    const [error, setError] = useState<ErrorMessage>({message: ""});

    const navigate = useNavigate();

    const {setUser, isLoggedIn} = useUserContext();

    if (isLoggedIn) {
        navigate("/chat");
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prev) =>  ({...prev, [name]: value}));
    }

    
    const onSubmit = async (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== formData.comfirmPassword) {
            setError({message: "Password and comfirm password must be the same"});
        }
        const data = await registerUser(formData);
        if ("message" in data) {
            setError({message: data.message});
        } else {
            setUser(data);
            navigate("/chat");
        }
        
    }

  return (
    <div className="container">
        <p>Create Your Account</p>
        <form className="form" onSubmit={onSubmit}>         
            <label className="input-label" htmlFor="userName">User Name  <span>*</span></label>
            <input className="input" type="text" id="userName" placeholder="Enter your user name" value={formData.userName} onChange={onInputChange}
            name="userName" />

            <label className="input-label" htmlFor="mail">Email <span>*</span></label>
            <input className="input" type="email" id="mail" placeholder="Enter your email" value={formData.email} onChange={onInputChange}
            name="email"/>

            <label className="input-label" htmlFor="first">First Name</label>
            <input className="input" type="text" id="first" placeholder="Enter your first name" value={formData.firstName} onChange={onInputChange}
            name="firstName"/>

            <label className="input-label" htmlFor="last">Last Name</label>
            <input className="input" type="text" id="last" placeholder="Enter tour last name" value={formData.lastName} onChange={onInputChange}
            name="lastName"/>

            <label className="input-label" htmlFor="userpass">Password <span>*</span></label>
            <input className="input" type="password" id="userpass" placeholder="Enter your password" value={formData.password} onChange={onInputChange}
            name="password"/>
                    
            <label className="input-label" htmlFor="confirmpass">Confirm Password <span>*</span></label>
            <input className="input" type="password" id="confirmpass" placeholder="Comfirm your password" value={formData.comfirmPassword} onChange={onInputChange}
            name="comfirmPassword"/>

            <button className="input button">Sign Up</button>

            {error.message && <span className="span-small error">{error.message}</span>}
            <span className="span-small">
               Already Have an account? Get back to chatting
            </span>
        </form>
    </div>
  )
}

export default SignUp;
