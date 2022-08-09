import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button";
import FormInput from "../form-input/form-input";
import './sign-up.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, {displayName});
            
            resetFields();
        }
        catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }
            else{
                console.log(err);
            }
           
        }
    }

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign Up with your email and password</span>

            <form onSubmit={handleSubmit}>
       
                <FormInput 
                    label="Display Name"
                    onChange={handleChange} 
                    type="text" 
                    required 
                    name="displayName" 
                    value={displayName}
                />

                <FormInput 
                    label="Email"
                    onChange={handleChange} 
                    type="email" 
                    required 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password"
                    onChange={handleChange} 
                    type="password" 
                    required 
                    name="password" 
                    value={password}
                />

                <FormInput 
                    label="Confirm Password"
                    onChange={handleChange} 
                    type="password" 
                    required 
                    name="confirmPassword" 
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp;